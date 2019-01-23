import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';
import { Receipt } from '../../classes/receipt';

@Component({
  selector: 'app-receipts-event',
  templateUrl: './receipts-event.component.html',
  styleUrls: ['./receipts-event.component.css']
})
export class ReceiptsEventComponent implements OnInit {
  
  @Input() receipts: Array<Receipt>
  
  constructor(private _http: EventService) { }

  ngOnInit() {
  }

}
