import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-receipts-event',
  templateUrl: './receipts-event.component.html',
  styleUrls: ['./receipts-event.component.css']
})
export class ReceiptsEventComponent implements OnInit {

  @Input() event: Event;
  
  constructor(private _http: EventService) { }

  ngOnInit() {
  }

}
