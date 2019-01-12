import { Component, OnInit, HostListener } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';
import { NotificationService } from '../../notification/notification.service';
import { Router } from '@angular/router';
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

  public view = 1;
  public event: Event = new Event();
  public state = {
    background: 'initial',
    card: 'initial',
  }

  public deleteReceipts = false;

  constructor(private _http: EventService, private notification: NotificationService, private router: Router) { 

    this._http.getData().subscribe(x => {            
      if (x.action == 'show') {
        this.event = x.data;        
      }       
    });

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

  editEventView(){
    if(this.view == 2) this.view = 1;
    else this.view = 1;
  }

  participantsEventView(){
    this.view = 3;
  }

  
  deleteEventView(){ this.view = 5; }

  receiptsEventView(){this.view = 4;}

  delete() {

  }

}
