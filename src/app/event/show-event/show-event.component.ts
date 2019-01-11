import { Component, OnInit } from '@angular/core';
import { Event } from '../../classes/event';
import { EventService } from '../event.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  public event: Event = new Event();

  constructor(private _http: EventService, private notification: NotificationService) { 

    this._http.getData().subscribe(x => {            
      if (x.action == 'show') {
        this.event = x.data;        
      }       
    });
    
  }

  ngOnInit() {
  }

}
