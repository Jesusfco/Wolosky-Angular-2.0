import { EventService } from './../event.service';
import { cardPop, backgroundOpacity } from './../../animations';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../classes/event';

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

  constructor(private _http: EventService, private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 10);

  }

  closePop() {

    setTimeout(() => {
      this.router.navigate(['../']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

}
