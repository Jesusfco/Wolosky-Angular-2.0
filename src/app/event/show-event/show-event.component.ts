import { Component, OnInit, HostListener } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';
import { NotificationService } from '../../notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { cardPop, backgroundOpacity } from './../../animations';
import { Url } from '../../classes/url';
import { Storage } from '../../classes/storage';
import { EventParticipant } from '../../classes/event-participant';
import { User } from '../../classes/user';
import { Receipt } from '../../classes/receipt';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class ShowEventComponent implements OnInit {

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode === 27) {
      this.closePop();
    }
  }

  event: Event = new Event();
  participantsBackUp: Array<EventParticipant> = [];
  users: Array<User>
  receipts: Array<Receipt>
  storage: Storage = new Storage()

  url1
  url2
  url3
  public sendingData: number = 0;
  public view = 1;  

  public state = {
    background: 'initial',
    card: 'initial',
  }

  public deleteReceipts = false;

  constructor(private _http: EventService, 
    private notification: NotificationService, 
    private router: Router, 
    private actRou: ActivatedRoute) { 

    actRou.params.subscribe(params => {
      this.event.id = params['id'];        
    });

    this._http.getData().subscribe(x => {            
      if (x.action == 'show') {
        this.event = x.data;        
      }       
    });    

  }

  ngOnInit() { 

    this._http.sendData('get', this.event.id);
    
    this.setEvent();    

    let storage = new Storage()
    let url = new Url()

    this.url1 = url.url + 'excel/event/participants/' + this.event.id + storage.getTokenUrl()
    this.url2 = url.url + 'excel/event/participantsInf/' + this.event.id + storage.getTokenUrl()
    this.url3 = url.url + 'excel/event/receipts/' + this.event.id + storage.getTokenUrl()
    
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 10);

  }

  closePop() {

    setTimeout(() => {
      this.router.navigate(['events']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  setEvent() {

    this.sendingData++;

    this._http.show(this.event).then(

      data => {
        this.event.setValues(data.event) 

        this.users = []
        for(let user of data.users) {
          let object = new User()
          object.setValues(user)
          this.users.push(object)
        }

        this.setParticipantsArray()
        if(data.event.participants != undefined)
          this.setParticipantsActive(data.event.participants)

        this.receipts = []
        for(let rec of data.receipts) {
          let object = new Receipt()
          object.setData(rec)
          object.assignUserFromArrayUser(this.users)
          this.receipts.push(object)
        }


      },
      error => this.notification.sendError(error)

    ).then(() => this.sendingData--);

  }

  setParticipantsArray() {

    this.participantsBackUp = []

    for(let user of this.users) {

      let participant = new EventParticipant();

      participant.user = user;
      participant.user_id = user.id;
      participant.event_id = this.event.id;
      participant.cost = this.event.cost;
      participant.status = false;
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

  editEventView(){
    if(this.view == 2) this.view = 1;
    else this.view = 2;
  }

  participantsEventView(){
    this.view = 3;
  }

  
  deleteEventView(){ this.view = 5; }

  receiptsEventView(){this.view = 4;}
  createReceiptEventView() {this.view = 6}

  delete() {
    let data = {
      id: this.event.id,
      receipts: this.deleteReceipts
    };

    this.sendingData++;

    this._http.delete(data).then(
      data => {
        this._http.sendData('delete', this.event);
        this.notification.sendNotification('Evento Eliminado', 'Los datos del eventos fueron eliminados de la base de datos', 3000);
        this.closePop();
      },
      error => this.notification.sendError(error)
    ).then(() => this.sendingData--);
  }

  update(event) {
       
    this.sendingData++;

    let respaldo: Event = new Event(); 

    Object.assign(respaldo, this.event);

    this.event = event;

    this.view = 1;

    this._http.update(event).then(

      data => {

        this.event.setValues(data)
        this._http.sendData('update', this.event)
        this.notification.sendNotification('Evento Actualizado Correctamente', 'Los datos han sido actualizados en la base de datos', 3000);

      }, error => {
        this.notification.sendError(error)
        this.event = respaldo
      }

    ).then(() => this.sendingData--);

  }

}
