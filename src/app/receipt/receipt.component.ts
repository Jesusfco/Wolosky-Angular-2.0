import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReceiptService } from '../services/receipt.service';
import { Router, NavigationEnd } from '@angular/router';
import { Storage } from '../classes/storage';
import { Receipt } from '../classes/receipt';
import { MyCarbon } from '../utils/classes/my-carbon';
import { NotificationService } from '../notification/notification.service';
import { User } from '../classes/user';

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
  credential = User.authUser().user_type_id
  public storage: Storage = new Storage();
  httpSugestSubscription: any;
  
  principal = true

  constructor(
    private _http: ReceiptService, 
    private not: NotificationService,
    private router: Router) {     

    // this.getNotifications();    

    router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => {           
          if(event.url == "/receipt" || event.url == "/receipt/create") 
            this.principal = true                                  
          else this.principal = false            
      });

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
    this.getDates();
    this.getReceipts();
    if(!User.isUserSended()) return    
    this.search.name = User.getUserSended().name
    User.cleanUserSended()
    this.getReceipts()
    
  }

  ngOnDestroy() {
    this.killRequest()  
  }
  
  killRequest() {
    if(this.request != null)
      if(!this.request.closed) 
        this.request.unsubscribe()
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
