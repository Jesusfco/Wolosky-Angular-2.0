import { RecordService } from '../services/record.service';
import { Component, OnInit } from '@angular/core';
import { Record } from '../classes/record';
import { NotificationService } from '../notification/notification.service';
import { MyCarbon } from '../utils/classes/my-carbon';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public records: Array<Record> = [];
  public sendingData: number = 0;
  public outletOutput: any;
  public search = {
    from: '',
    to: '',
    name: '',
    items: 20,
    page: 1,
    total: 0,
  };

  request

  constructor(private _http: RecordService, 
    private notification: NotificationService,
    private router: Router) {

    this.getDates();

    router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => {           
          if(event.url == "/asistencias") 
            this.setRecords()
                    
      }); 
   }

  ngOnInit() {        
  }

  pageAction(data) {
      
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.setRecords();
  }

 setRecords() {

  if(this.request != null) {    
    if(!this.request.closed) {
      this.request.unsubscribe()    
      this.sendingData--
    }
    
    
  }
  this.sendingData++;

  
  this.request = this._http.getRecords(this.search).subscribe(
    data => {

      this.records = [];
      this.search.total = data.total;

      for(let d of data.data) {        
        let record = new Record();
        record.setValues(d);
        this.records.push(record);
      }
    }, 
    
    error => this.notification.sendData(error),
    () => this.sendingData--                
  );

 }

 getDates(){
  
    this.search.from = MyCarbon.getFromToThisMonth().from
    this.search.to = MyCarbon.getFromToThisMonth().to
  
 }
}
