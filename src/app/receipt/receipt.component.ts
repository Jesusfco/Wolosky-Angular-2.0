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

  public sendingData = {
    notifications: false,
    receipts: false,
  };

  public storage: Storage = new Storage();
  
  constructor(private _http: ReceiptService) { 
    this.getNotifications();
    this.getDates();
    this.getReceipts();
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

    if(d.getMonth() <= 7){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-0" + (d.getMonth() + 2 ) + "-" + "01";
    } else if (d.getMonth() == 8){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    } else {
      this.search.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    }
  }

  debtorPay(id){ 

    localStorage.setItem('debtorId', id);
    this.redirectCreateUser();
    
  }

  redirectCreateUser(){
    
    localStorage.setItem('receiptStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic(), 1000);

  }

  intervalSaleLogic(){
    
    if(localStorage.getItem('receiptStatus') == undefined){
      
      this.getNewReceipt();
      clearInterval(this.interval);
      
    } else if(localStorage.getItem('receiptStatus') == '0'){
      localStorage.removeItem('receiptStatus');
      clearInterval(this.interval);
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
        this.receipts = data.data;
        this.search.total = data.total;
      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData.receipts = false,
    );
  }

  // ACTUALIZAR RECIBO
  updateStartObservable() {
    localStorage.setItem('receiptStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic2(), 1000);
  }


  //INTERVALO PARA ACTUALIZACION
  intervalSaleLogic2(){
    
    if(localStorage.getItem('receiptStatus') == undefined){
      
      this.getNotifications();
      this.getReceipts();
      clearInterval(this.interval);
      
    } else if(localStorage.getItem('receiptStatus') == '0'){
      localStorage.removeItem('receiptStatus');
      clearInterval(this.interval);
    }
  }

  getNewReceipt() {

    let newReceipt: Receipt = JSON.parse(localStorage.getItem('newReceipt'));

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

    localStorage.removeItem('newReceipt');

  }

}
