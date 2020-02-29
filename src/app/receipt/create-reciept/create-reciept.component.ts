import { MyCarbon } from './../../utils/classes/my-carbon';
import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { Storage } from '../../classes/storage';
import { Receipt } from '../../classes/receipt';
import { User } from '../../classes/user';
import { Cash } from '../../classes/cash';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-reciept',
  templateUrl: './create-reciept.component.html',
  styleUrls: ['./create-reciept.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CreateRecieptComponent implements OnInit {

  months = MyCarbon.getMonthsArrayForOptions()

  window: number = 1;
  
  state = {
    background: 'initial',
    card: 'initial',
  };

  receipt: Receipt = new Receipt();
   
  sugests: Array<User> = [];
  sendingData: any = {
    request: false,
    sugest: false,
    monthly: false
  };
  
  desc: number = 50;
  recharge: number = 100;

  validation = {
    
    paymentDate: 0,
    uniquePaymentMonthly: 0,
    year: 0,
    description: 0,
    amount: 0,
    user_id: 0,    
    form: true,
  };
  
  request: any = undefined;

  
  auth: User = User.authUser()
  httpSugestSubscription

  dayDiscount = 3
  dayRecharge = 11
  constructor(private router: Router,
    private actRou: ActivatedRoute,
    private _http: ReceiptService,
    private notification: NotificationService) { 

      

      let d = new Date();
      this.receipt.month = d.getMonth() + 1;
      this.receipt.year = d.getFullYear();
      this.receipt.creator = this.auth


    }

  
  ngOnDestroy() {
    try {
      localStorage.removeItem('userToPay')
    } catch (error) {
      
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';

      var data = JSON.parse(localStorage.getItem('userToPay'))
      if(data == undefined) return
        var user: User = new User()
        user.setData(data)
        this.setMonthlyPayment(user)
    }, 100);

    
  }

 

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/receipt']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  searchSugest(key){

    if(key.keyCode >=37 && key.keyCode <= 40 || key.keyCode == 13) return;    

    setTimeout(() => {            
        
      if(this.httpSugestSubscription != null) {    
        if(!this.httpSugestSubscription.closed) {
          this.httpSugestSubscription.unsubscribe()    
          // this.sendingData--
        }                
      }

      this.sendingData.sugest = true;

      this.httpSugestSubscription = this._http
      .sugestUserReceipt({search: this.receipt.user.name}).subscribe(
        data => {

          this.sugests = [];

          for(let d of data) {

            let user = new User();
            user.setValues(d);
            this.sugests.push(user);

          }
            
        }, error => console.log(error),
        () => this.sendingData.sugest = false
      )

    }, 350);
  }

  setMonthlyPayment(user: User){

    this.receipt.user_id = user.id;            
    this.receipt.monthlyAmount = 0;
    this.receipt.monthly = user.monthly_payment.amount;
    this.receipt.user = user;
    
    this.validateMonthlyPayment();    

  }

  validateMonthlyPayment(){    

    let d = new Date();        
    this.validation.paymentDate = 0;

    // ------------ Agregar Descuento -----------
    // SI ES EL MISMO AÑO - O
    // MISMO AÑO MES ANTES - 0
    // MISMO AÑO - MISMO MES - ANTES DE LA FECHA
    if(d.getFullYear() < this.receipt.year ||     
      (d.getFullYear() == this.receipt.year && d.getMonth() + 1 < this.receipt.month) ||    
      (d.getFullYear() == this.receipt.year && d.getMonth() + 1 == this.receipt.month && d.getDate() <= this.dayDiscount)    
    ) {
        this.receipt.monthlyAmount = (this.receipt.monthly - this.desc);
        this.validation.paymentDate = 1;
        return;
    }

    //----------------- Cobrar Recargo --------------
    // MISMO AÑO - MES - DESPUES DEL 11
    else if(
      (d.getFullYear() == this.receipt.year && d.getMonth() + 1 == this.receipt.month && d.getDate() >= this.dayRecharge) ||
      (d.getFullYear() == this.receipt.year && d.getMonth() + 1 > this.receipt.month )
    ) {

        this.receipt.monthlyAmount = (this.receipt.monthly + this.recharge);
        this.validation.paymentDate = 2;

    } else         
        this.receipt.monthlyAmount = this.receipt.monthly;            
    
  }

  createReceipt(){
    
    this.restoreValidations();
    this.validateForm()

    if(this.validation.form == false) return;        

    if(this.receipt.type != 1) { 
      this.sendReceipt();
      return;
    }

    this.sendingData.request = true;

    this._http.checkUnique(this.receipt).then(
      data => {
        
        if(data == true) {
          this.validation.uniquePaymentMonthly = 1;
        } else if (data == false) {

          this.sendReceipt();

        }

      },

      error => this.notification.sendError(error)
      
    ).then(
      () => this.sendingData.request = false
    );

    
  }

  printReceipt() { window.print() }

  sendReceipt(){
    
    this._http.postNewReceipt(this.receipt).then(
      data => {

        this.receipt.id = data.id
        this.receipt.created_at = data.created_at
        this.receipt.amount = data.amount        

        this._http.sendData('new', this.receipt);
        
        if(this.receipt.payment_type == false) 
          Cash.addCash(data.amount);       

        this.notification.sendNotification('Recibo Creado', 'Datos guardados en el servidor', 5000);
        this.window++;

      },
      error => this.notification.sendError(error)
    ).then(
      () => this.sendingData.request = false
    );
  }

  changeType(){

  }

  restoreValidations(){
    
    this.validation = {    
      paymentDate: 0,
      uniquePaymentMonthly: 0,
      year: 0,
      description: 0,
      amount: 0,
      user_id: 0,    
      form: true,
    }

  }  

  validateForm() {
    this.validateAmount()
    this.validateUserSelected()
    this.validateDescription()
    this.validateYear()
  }

  validateUserSelected(){
    if(this.receipt.type >= 3) return;
    if(this.receipt.user_id >= 1) return;
    this.validation.user_id = 1
    this.validation.form = false
  }

  validateAmount(){
    if(this.receipt.type == 1) {

      if(this.receipt.monthlyAmount != null && this.receipt.monthlyAmount >= 0) return

      this.validation.amount = 1
      this.validation.form = false
      return  

    }

    if(this.receipt.amount > 0) return;
    this.validation.amount = 1
    this.validation.form = false
  }

  validateDescription() {
    if(this.receipt.type != 3) return;
    if(this.receipt.description.trim().length <= 4) {
      this.validation.form = false
      this.validation.description = 1
    }
  }

  validateYear(){ 
    if(this.receipt.year != null &&  this.receipt.year >= 2008) return;
    this.validation.year = 1
    this.validation.form = false
  }

}
