import { Component, OnInit } from '@angular/core';
import { ReceiptService } from './receipt.service';
import { Router } from '@angular/router';

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
    id: null
  };

  public notifications = {
    on: false,
    viewDebtors: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
    debtors: undefined,
  };

  public receipts: any = [];
  public sugests = [];
  public timer = 0;
  public interval: any = 0;

  constructor(private _http: ReceiptService, private router: Router) { 
    this.getNotifications();
    this.getDates();
    console.log(this.search);
  }

  ngOnInit() {
  }

  getDates(){
    let d = new Date();
      this.search.from = "01/0" + (d.getMonth() + 1 ) + "/" + d.getFullYear() ;
      this.search.to = "01/0" + (d.getMonth() + 2 ) + "/" + d.getFullYear() ;
  }

  debtorPay(id){
    localStorage.setItem('debtorId', id);
    this.redirectCreateUser();
  }

  redirectCreateUser(){
    this.router.navigate(['/receipt/create']);
    localStorage.setItem('receiptStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic(), 1000);
  }

  intervalSaleLogic(){
    
    if(localStorage.getItem('receiptStatus') == undefined){
      this.getNotifications();
      clearInterval(this.interval);
    } else if(localStorage.getItem('receiptStatus') == '0'){
      clearInterval(this.interval);
    }
  }

  getNotifications(){
    this._http.getReceiptAnalisis().then(
      data => {

        if(data.count > 0)                  
          this.notifications.on = true

        this.notifications.debtorsMonthly = data.count;
        this.notifications.debtors = data.users;        

      },
      error => console.log(error)
    );
  }

  searchInput(){
    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){        
      
        this._http.sugestUserReceipt({search: this.search.name}).then(
          data => {
            this.sugests = data;
          }, error => console.log(error)
        );
      } 

    }, 350);
  }

  searchReceiptId(id){
    this.search.id = id;
    this.getReceipts();
  }

  getReceipts(){
    this._http.getReceiptAnalisis().then(
      data => {

      }
    )
  }

}
