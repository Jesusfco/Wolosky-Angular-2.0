import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  @Input() event: Event;
  @Output() updateEventEmit = new EventEmitter();
  public event2: Event = new Event();
  constructor(private _http: EventService) {
    
   }

  ngOnInit() {
    Object.assign(this.event2, this.event);
  }

  updateEvent() {
    this.event2.updateValidation();
    if(!this.event2.validations.validated) return;
    this.updateEventEmit.emit(this.event2);
  }

}
