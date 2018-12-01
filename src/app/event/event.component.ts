import { Component, OnInit } from '@angular/core';
import { Event } from '../classes/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public events: Array<Event> = [];
  public sendingData: number = 0;
  public outletOutput: any;
  search = {
    searchWord: '',
    items: 20,
    page: 1,
    total: 0,
  };
  constructor() { }

  ngOnInit() {
  }

  pageAction(data){
      
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.setDataTable();

  }

  setDataTable(){
    
  }

}
