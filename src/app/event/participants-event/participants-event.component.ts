import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { EventParticipant } from '../../classes/event-participant';
import { Event } from '../../classes/event';
import { not } from '@angular/compiler/src/output/output_ast';
import { Storage } from '../../classes/storage';
import { Url } from '../../classes/url';
import { Receipt } from '../../classes/receipt';

@Component({
  selector: 'app-participants-event',
  templateUrl: './participants-event.component.html',
  styleUrls: ['./participants-event.component.css']
})
export class ParticipantsEventComponent implements OnInit {

  @Input() event: Event;
  @Input() sendingData
  @Input() participantsBackUp: Array<EventParticipant>
  @Input() receipts: Array<Receipt>

  public search = {
    name: '',
    active: true,
    inactive: false,
    typeA: true,
    typeT: true,
    typeO: true,
    genderM: true,
    genderF: true,
    orderBy: true,
    status: false,
  }

  selected: EventParticipant = new EventParticipant()
  
  public participants: Array<EventParticipant> = [];

  public url1 = ''
  public url2 = ''

  constructor(private _http: EventService, private not: NotificationService) { 

    let storage = new Storage()
    let url = new Url()

    this.url1 = url.url + 'excel/event/participants/' + this.event + storage.getTokenUrl()
    this.url2 = url.url + 'excel/event/participantsInf/' + this.event + storage.getTokenUrl()
        
  }

  ngOnInit() {    
    this.sortByStatus()
  }
  
  searchParticipants() {}

  sortArray() {

    if(this.search.orderBy) {

      this.participantsBackUp.sort((a, b) => {

        if(a.user.name != undefined) a.user.name.toUpperCase();
        if(b.user.name != undefined) b.user.name.toUpperCase();
  
        if(a.user.name < b.user.name){
          return -1;
        } else if (a.user.name > b.user.name){
          return 1;
        } else if(a.user.name == ''){
          return 1;
        }else {
          return 0;
        }
      });

    } else {

      this.participantsBackUp.sort((a, b) => {

        if(a.user.name != undefined) a.user.name.toUpperCase();
        if(b.user.name != undefined) b.user.name.toUpperCase();
  
        if(a.user.name < b.user.name){
          return 1;
        } else if (a.user.name > b.user.name){
          return -1;
        } else if(a.user.name == ''){
          return -1;
        }else {
          return 0;
        }
      });

    }

    this.freshTable()

  }  

  changeSort() {
    this.search.orderBy = !this.search.orderBy
    this.sortArray()
  }

  changeSortStatus() {
    this.search.status = !this.search.status
    this.sortByStatus();
  }

  sortByStatus() {

    if(this.search.status)

    this.participantsBackUp.sort((a, b) => {
     
      if( a.status == null || a.status == undefined ||a.status < b.status)
        return -1
      else if (a.status > b.status)
        return 1
      
      else 
        return 0;
      
    });

    else

      this.participantsBackUp.sort((a, b) => {
      
        if( a.status == null || a.status == undefined || a.status < b.status)
          return 1
        else if (a.status > b.status)
          return -1        
        else 
          return 0
        
      });

    this.freshTable()

  }


  freshTable() {
    this.participants = [];
    for(let part of this.participantsBackUp) {
      this.participants.push(part);
    }
  }

  searchByName() {
    let participants = this.participantsBackUp;
    let busqueda = this.search.name;
    if(busqueda === undefined || busqueda == '') return participants;
    
    return participants.filter(function(participant){

      return (participant.user.name.includes(busqueda.toUpperCase()))
      
    });
  }

  searchParticipantsWriting() {
    this.participants = this.searchByName();
  }

  activeParticipant(participant: EventParticipant) {

    setTimeout(() => {
      
      this._http.createParticipant(participant).then(

        data => {

          let partcipantRecived = new EventParticipant()
          partcipantRecived.setValues(data)

          for(let part of this.participants) {
            if(part.user_id == partcipantRecived.user_id) {
              part.id = partcipantRecived.id
              break;
            }
          }          

        }, error => {

          error.message = 'No se pudo actualizar al participante ' + participant.user.name

          this.not.sendError(error)
          participant.status = !participant.status          

        }

      )

    }, 100)
    
  }

  editPrice(participant) {

    for(let part of this.participants) {
      part.edit_price = false;      
    }

    participant.edit_price = true;

    Object.assign(this.selected, participant)

    setTimeout(() => document.getElementById('focusModify').focus(), 50);

  }

  updatePrice(participant) {        

    if(this.selected.cost != participant.cost) {

      participant.cost = this.selected.cost

      this._http.createParticipant(participant).then(

        data => {

          let par = new EventParticipant()
          par.setValues(data)

          for(let part of this.participants) {

            if(part.user_id == par.user_id) {
              part.id = par.id
              part.created_at = par.created_at
              
              break;
            }
          }

          this.not.sendNotification('Participante Actualizado', 'El costo del participante ' + participant.user.name + ' ha sido actualizado', 1500)

        },

        error => {

          error.message = 'No se pudo actualizar al participante ' + participant.user.name
          this.not.sendError(error)          

        }
      )
    }
      
    participant.edit_price = false
  }

  finishModify(participant) {
    participant.edit_price = false;
  }

  countUsersInEvent() {
    let x = 0;
    for(let part of  this.participantsBackUp) {
      if(part.status)
        x++      
    }

    return x;
  }

  filterParticipants() {

    setTimeout(() => {

      this.freshTable()
    for(let i=0; i < this.participants.length; i++) {

      if(!this.search.active && this.participants[i].user.status == 1){

        this.participants.splice(i,1) 
        i--
        continue

      }

      else if(!this.search.inactive && this.participants[i].user.status > 1) {

        this.participants.splice(i,1) 
        i--
        continue

      }

      else if(!this.search.typeA && this.participants[i].user.user_type_id == 1) {

        this.participants.splice(i,1) 
        i--
        continue

      }

      else if(!this.search.typeO && this.participants[i].user.user_type_id > 4) {

        this.participants.splice(i,1) 
        i--
        continue
        
      }

      else if(!this.search.typeT && this.participants[i].user.user_type_id <= 4 && this.participants[i].user.user_type_id >= 2) {

        this.participants.splice(i,1) 
        i--
        continue
        
      }

      else if(!this.search.genderM && this.participants[i].user.gender == 1) {

        this.participants.splice(i,1) 
        i--
        continue
        
      }

      else if(!this.search.genderF && this.participants[i].user.gender == 2) {

        this.participants.splice(i,1) 
        i--        
        
      }        

    }

    }, 50);
    
  }

}

