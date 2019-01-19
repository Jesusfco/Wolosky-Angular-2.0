import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { EventParticipant } from '../../classes/event-participant';
import { Event } from '../../classes/event';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-participants-event',
  templateUrl: './participants-event.component.html',
  styleUrls: ['./participants-event.component.css']
})
export class ParticipantsEventComponent implements OnInit {

  @Input() event: Event;

  sendingData = 0

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
  }

  public participantsBackUp: Array<EventParticipant> = [];
  public participants: Array<EventParticipant> = [];

  constructor(private _http: EventService, private not: NotificationService) { 
        
  }

  ngOnInit() {
    this.setParticipants()
  }

  setParticipants() {

    this._http.getParticipants(this.event).then(

      data => {

        if(data.users != undefined)
          this.setParticipantsArray(data.users)        

        if(data.participants) 
          this.setParticipantsActive(data.participants)

        this.freshTable();

      },

      error => this.not.sendError(error)

    ).then( () => this.sendingData++ )

  }

  setParticipantsArray(users) {

    this.participantsBackUp = []

    for(let user of users) {

      let participant = new EventParticipant();

      participant.user = user;
      participant.user_id = user.id;
      participant.event_id = this.event.id;
      participant.cost = this.event.cost;
      participant.active = false;
      this.participantsBackUp.push(participant);

    }

  }

  setParticipantsActive(parts) {

    for(let participant of parts) {

      for(let part of this.participantsBackUp) {

        if(part.user_id == participant.user_id) {

          part.setValues(participant)
          
          break;

        }

      }

    }

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

      participant.checkActive()    

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
          participant.active = !participant.active
          participant.checkActive()

        }

      )

    }, 100)
    
  }

}

