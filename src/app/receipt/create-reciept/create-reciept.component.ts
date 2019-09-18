import { MyCarbon } from './../../utils/classes/my-carbon';
import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { Storage } from '../../classes/storage';
import { Receipt } from '../../classes/receipt';
import { User } from '../../classes/user';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-reciept',
  templateUrl: './create-reciept.component.html',
  styleUrls: ['./create-reciept.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CreateRecieptComponent implements OnInit {

  public months = MyCarbon.getMonthsArrayForOptions()

  public window: number = 1;
  
  public state = {
    background: 'initial',
    card: 'initial',
  };

  public payment: Receipt = new Receipt();
   

  public sugests: Array<User> = [];
  public sendingData: any = {
    request: false,
    sugest: false,
    monthly: false
  };
  public timer: number = 0;
  public desc: number = 50;
  public recharge: number = 100;

  public validation = {
    
    paymentDate: 0,
    description: 0,
    amount: 0,
    uniquePaymentMonthly: 0,
    form: true,
  };
  
  public request: any = undefined;

  public storage: Storage =  new Storage();
  auth: User = User.authUser()

  constructor(private router: Router,
    private actRou: ActivatedRoute,
    private _http: ReceiptService,
    private notification: NotificationService) { 

      let d = new Date();
      this.payment.month = d.getMonth() + 1;
      this.payment.year = d.getFullYear();
      this.payment.creator = this.auth


    }

  

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
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

    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){
        this.sendingData.sugest = true;
        this._http.sugestUserReceipt({search: this.payment.user.name}).then(
          data => {

            this.sugests = [];

            for(let d of data) {

              let user = new User();
              user.setValues(d);
              this.sugests.push(user);

            }
             
          }, error => console.log(error)
        ).then(
          () => this.sendingData.sugest = false
        );
      } 

    }, 350);
  }

  setMonthlyPayment(user: User){

    this.payment.user_id = user.id;            
    this.payment.monthlyAmount = 0;
    this.payment.monthly = user.monthly_payment.amount;
    this.payment.user = user;
    
    this.validateMonthlyPayment();    

  }

  validateMonthlyPayment(){    

    let d = new Date();        
    this.validation.paymentDate = 0;

    // si el año es mayor al actual
    if(d.getFullYear() < this.payment.year) {
        this.payment.monthlyAmount = (this.payment.monthly - this.desc);
        this.validation.paymentDate = 1;
        return;
    }

    //DENTRO DEL MISMO MES
    if((d.getMonth() + 1) == this.payment.month){      

      if(d.getDate() <= 3){
         this.payment.monthlyAmount = (this.payment.monthly - this.desc);
         this.validation.paymentDate = 1;
        }

        else if(d.getDate() >= 11) {

          this.payment.monthlyAmount = (this.payment.monthly + this.recharge);
          this.validation.paymentDate = 2;

      } else {        
        
        this.payment.monthlyAmount = this.payment.monthly;
        
      }

    }

    else if((d.getMonth() + 1) < this.payment.month) {
      this.payment.monthlyAmount = (this.payment.monthly - this.desc);
      this.validation.paymentDate = 1;
    } else {
      this.payment.monthlyAmount = (this.payment.monthly + this.recharge);
      this.validation.paymentDate = 2;
    }
  }

  createReceipt(){
    
    this.restoreValidations();
    if(this.payment.type == 6) this.validateDescription();
    if(this.validation.form == false) return;
    
    this.sendingData.request = true;

    if(this.payment.type == 1) {

      this._http.checkUnique(this.payment).then(
        data => {
          
          if(data == true) {
            this.validation.uniquePaymentMonthly = 1;
          } else if (data == false) {

            this.sendReceipt();

          }

        },

        error => localStorage.setItem('request', JSON.stringify(error))
        
      ).then(
        () => this.sendingData.request = false
      );

    } else {
      this.sendReceipt();
    }
  }

  restoreValidations(){
    
    this.validation = {
      paymentDate: this.validation.paymentDate,
      description: 0,
      amount: 0,
      form: true,
      uniquePaymentMonthly: 0,
    };

  }

  validateDescription() {
    if(this.payment.description.trim().length == 5) {
      this.validation.form = false
      this.validation.description = 1
    }
  }
  printReceipt(){
      window.print();
  }

  sendReceipt(){
    
    this._http.postNewReceipt(this.payment).then(
      data => {

        this.payment.id = data.id
        this.payment.created_at = data.created_at
        this.payment.amount = data.amount        

        this._http.sendData('new', this.payment);
        
        if(this.payment.payment_type == false) 
          this.storage.updateCash(data.amount);        

        this.notification.sendNotification('Recibo Creado', 'Datos guardados en el servidor', 5000);
        this.window++;

      },
      error => this.notification.sendError(error)
    ).then(
      () => this.sendingData.request = false
    );
  }


}
