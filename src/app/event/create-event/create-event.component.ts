import { Notificaction } from './../../classes/notification';
import { EventService } from '../../services/event.service';
import { cardPop, backgroundOpacity } from './../../animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../classes/event';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class CreateEventComponent implements OnInit {

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode === 27) {
      this.closePop();
    }
  }

  public state = {
    background: 'initial',
    card: 'initial',
  }

  public event: Event = new Event();
  public sendingData: number = 0;  

  constructor(private _http: EventService, private router: Router, private notification: NotificationService) { }

  ngOnInit() {

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

  createEvent() {

    this.event.validateAll();
        
    if(!this.event.validations.validated) return;

    this.sendingData++;

    this._http.create(this.event).then(
      data => {

        this.event.setValues(data);
        this._http.sendData('new', this.event);
        this.closePop();        

      }, error => this.notification.sendError(error)
    ).then(
      () => this.sendingData--
    );

  }

}
