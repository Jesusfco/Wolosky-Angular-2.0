import { Component, OnInit } from '@angular/core';
import { ReceiptService } from './receipt.service';
import { Router } from '@angular/router';
import { Storage } from '../classes/storage';
import { Receipt } from '../classes/receipt';

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
    name: null,
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
  public sendingData = {
    notifications: false,
    receipts: false,
  };

  public storage: Storage = new Storage();
  
  constructor(private _http: ReceiptService) {     

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
    let d = new Date();

    if (d.getMonth() <= 8) {

      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-";      

    } else {

      this.search.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-";      
      
    }

    if(this.storage.getUserType() >= 6) {

      this.search.to = this.search.from;
      this.search.from += '01';
      d.setMonth(d.getMonth() + 1);
      d.setDate(0);      
      this.search.to += d.getDate();

    } else {

      if(d.getDate() < 10) {

        this.search.from += "0" + d.getDate();        

      } else {

        this.search.from += d.getDate();
        
      }

      this.search.to = this.search.from;

    }

  }

  getNotifications(){

    this.sendingData.notifications = true;

    this._http.getReceiptAnalisis().then(

      data => {

        if(data.count > 0)                  
          this.notifications.on = true;

        this.notifications.debtorsMonthly = data.count;
        this.notifications.debtors = data.users;

      },

      error => localStorage.setItem('request', JSON.stringify(error)),

    ).then(

      () => this.sendingData.notifications = false,

    );
  }

  searchInput(key){

    if(key.keyCode >=37 && key.keyCode <= 40 || key.keyCode == 13) return;

    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){        
        this.sendingData.receipts = true;
        this._http.sugestUserReceipt({search: this.search.name}).then(
          data => {
            this.sugests = data;
          }, error => localStorage.setItem('request', JSON.stringify(error))
        ).then(
          () => this.sendingData.receipts = false,
        );
      } 

    }, 350);
  }

  searchReceiptId(id){
    this.search.id = id;
    this.getReceipts();
  }

  getReceipts(){
    
    this.sendingData.receipts = true;
    if(this.search.name == '')
      this.search.id = null;
    this._http.getReceipt(this.search).then(
      data => {

        this.receipts = [];

        for(let da of data.data) {

          let receipt = new Receipt();
          receipt.setData(da);
          this.receipts.push(receipt);

        }
        
        this.search.total = data.total;
      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData.receipts = false,
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
