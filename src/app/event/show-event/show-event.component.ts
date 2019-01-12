import { Component, OnInit, HostListener } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';
import { NotificationService } from '../../notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { cardPop, backgroundOpacity } from './../../animations';

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

  public sendingData: number = 0;
  public view = 1;
  public event: Event = new Event();
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

    this._http.sendData('get', this.event.id);

    setTimeout(() => {
      if(this.event.name == null)
        this.setEvent();
    },250);

  }

  ngOnInit() { setTimeout(() => {
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

      data => this.event.setValues(data),
      error => this.notification.sendError(error)

    ).then(() => this.sendingData--);

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
