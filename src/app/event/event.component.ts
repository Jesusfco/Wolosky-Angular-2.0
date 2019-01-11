import { EventService } from './event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../classes/event';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public events: Array<Event> = [];
  public sendingData: number = 0;
  public outletOutput: any;

  timer = 0;
  request = 0;
  search = {
    name: '',
    items: 20,
    page: 1,
    total: 0,
  };
  constructor(private _http: EventService, private notification: NotificationService) { 

    this.setDataTable();

    this._http.getData().subscribe(x => {      
      
      if (x.action == 'new') {
        this.newEvent(x.data);        
      } else if(x.action == "update")
        this.updateEvent(x.data);
        else if(x.action == 'delete')
        this.deleteEvent(x.data);
      
    });

  }

  ngOnInit() {
  }

  pageAction(data){
      
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.setDataTable();

  }

  setDataTable(){
    this.request++;
    this._http.search(this.search).then(
      data => {
        this.search.total = data.total;
        this.events = [];
        for(let event of data.data) {
          let e = new Event();
          e.setValues(event);
          this.events.push(e);
        }
      }, error => this.notification.sendError(error)
      ).then(
        () => this.sendingData--
      );
    
  }

  searchInput() {
    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      if(this.timer == 0){        
        this.setDataTable();
      } 
    }, 350);
  }

  send(event) {
    setTimeout(() =>this._http.sendData('show', event), 100);    
  }

  newEvent(event: Event) {    

    this.events.unshift(event);

    if(this.events.length >  this.search.items ) {

      this.events.pop();

    }

    this.search.total++;
  }

  updateEvent(event: Event){
    for(let i = 0; i < this.events.length; i++) {

      if(this.events[i].id == event.id) {
        this.events[i] = event;
        break;
      }

    }
  }

  deleteEvent(event: Event) {
    let i = 0;

    for(let e of this.events) {

      if(e.id == event.id) {

        this.events.splice(i, 1);        
        break;

      }

      i++;

    }

  }
  

}
