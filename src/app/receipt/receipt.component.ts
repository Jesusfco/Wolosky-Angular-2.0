import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../services/receipt.service';
import { Router } from '@angular/router';
import { Storage } from '../classes/storage';
import { Receipt } from '../classes/receipt';
import { MyCarbon } from '../utils/classes/my-carbon';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public notificacionts = {
    on: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
  }

  public search = {
    from: "",
    to: "",
    name: '',
    id: null,
    items: 25,
    page: 1,
    total: 0,
  };

  public notifications = {
    on: false,
    viewDebtors: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
    debtors: undefined,
  };

  public receipts: Array<Receipt> = [];
  public sugests = [];
  public timer = 0;
  public interval: any = 0;

  public outletOutput: any;
  

  request
  sendingData = 0

  public storage: Storage = new Storage();
  httpSugestSubscription: any;
  
  constructor(
    private _http: ReceiptService, 
    private not: NotificationService) {     

    this.getNotifications();
    this.getDates();
    this.getReceipts();

    

    this.outletOutput = this._http.getData().subscribe(x => {      
      
      if (x.action == 'new') {
        this.newReceipt(x.data);        
      } else if(x.action == "update")
        this.update(x.data);
        else if(x.action == 'delete')
        this.delete(x.data);
      
    });
    
  }

  ngOnInit() {
  }

  pageAction(data){
    
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.getReceipts();
  }

  getDates(){
    this.search.from = MyCarbon.getFromToThisMonth().from
    this.search.to = MyCarbon.getFromToThisMonth().to
    
  }

  getNotifications(){

    this.sendingData++;

    this._http.getReceiptAnalisis().then(

      data => {

        if(data.count > 0)                  
          this.notifications.on = true;

        this.notifications.debtorsMonthly = data.count;
        this.notifications.debtors = data.users;

      },

      error => this.not.sendError(error),

    ).then(

      () => this.sendingData--,

    );
  }

  searchInput(key){

    if(key.keyCode >= 37 && key.keyCode <= 40 || key.keyCode == 13) return;    

    setTimeout(() => {
              
      if(this.httpSugestSubscription != null) {    
        if(!this.httpSugestSubscription.closed) {
          this.httpSugestSubscription.unsubscribe()    
          this.sendingData--
        }                
      }

      this.sendingData++;

      this.httpSugestSubscription = this._http.sugestUserReceipt({search: this.search.name}).subscribe(
          data => {
            this.sugests = data;
          }, error => this.not,
          () => this.sendingData--
        )

      }, 350);
  }

  searchReceiptId(id){
    this.search.id = id;
    this.getReceipts();
  }

  getReceipts(){
    
    if(this.request != null) {    
      if(!this.request.closed) {
        this.request.unsubscribe()    
        this.sendingData--
      }
      
      
    }

    this.sendingData++;    
      
    this.request = this._http.getReceipts(this.search).subscribe(
      data => {

        this.receipts = Receipt.convertToArray(data.data)
        
        this.search.total = data.total;
      },
      error =>  this.not.sendError(error),
      () => this.sendingData--
    );
  }  

  debtorPay(deb) {

  }

  newReceipt(data) {

    let newReceipt: Receipt = data;

    this.receipts.unshift(newReceipt);

    let d = new Date();

    let month = d.getMonth() + 1;

    if(month == newReceipt.month &&  newReceipt.type == 1){

      for(let i = 0; i < this.notifications.debtors.length; i++) {

        if( this.notifications.debtors[i].id == newReceipt.user_id){

          this.notifications.debtors.splice(i, 1);
          this.notifications.debtorsMonthly--;
          break;

        }

      }

    }

    if(this.receipts.length >  this.search.items ) {

      this.receipts.pop();

    }

    this.search.total++;

    

  }

  update(data: Receipt) {
    
    for(let i = 0; i < this.receipts.length; i++) {

      if(this.receipts[i].id == data.id) {
        this.receipts[i] = data;
        break;
      }

    }

  }

  delete(data: Receipt) {

    
    let i = 0;

    for(let receipt of this.receipts) {

      if(receipt.id == data.id) {

        this.receipts.splice(i, 1);        
        break;

      }

      i++;

    }
  }

}
