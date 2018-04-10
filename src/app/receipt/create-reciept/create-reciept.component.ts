import { Component, OnInit,OnDestroy } from '@angular/core';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../receipt.service';
import { Storage } from '../../storage';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-reciept',
  templateUrl: './create-reciept.component.html',
  styleUrls: ['./create-reciept.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CreateRecieptComponent implements OnInit {

  public months = [
    {value: 1, view: 'Enero'},
    {value: 2, view: 'Febrero'},
    {value: 3, view: 'Marzo'},
    {value: 4, view: 'Abril'},
    {value: 5, view: 'Mayo'},
    {value: 6, view: 'Junio'},
    {value: 7, view: 'Julio'},
    {value: 8, view: 'Agosto'},
    {value: 9, view: 'Septiembre'},
    {value: 10, view: 'Octubre'},
    {value: 11, view: 'Noviembre'},
    {value: 12, view: 'Diciembre'},
  ];

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public payment = {
    userId: null,
    userName: '',
    type: 1,
    amount: 500,
    monthly: 0,
    monthlyAmount: 0,
    month: undefined,
    days: 1,
    description: '',
    payment_type: false,
  };

  public sugests: any = [];
  public sendingData: boolean = false;
  public timer: number = 0;
  public desc: number = 50;
  public recharge: number = 100;

  public validation = {
    paymentDate: 0,
    description: 0,
    form: true,
  };

  public storage: Storage =  new Storage();

  constructor(private router: Router,
    private actRou: ActivatedRoute,
    private _http: ReceiptService) { 

      let d = new Date();
      this.payment.month = d.getMonth() + 1;

      this.checkDebtorLocalStorage();

    }

  checkDebtorLocalStorage(){
    if(localStorage.getItem('debtorId') == undefined) return;

    this._http.getMonthlyPayment({id: localStorage.getItem('debtorId')}).then(
      data => {
        this.payment.monthly = data.amount;
        this.payment.userId = data.user.id;
        this.payment.userName = data.user.name;
        this.validateMonthlyPayment();
      }, error => console.log(error)
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  ngOnDestroy(){
    if(localStorage.getItem('debtorId') == undefined) return;

    localStorage.removeItem('debtorId');
    localStorage.removeItem('receiptStatus');
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/receipt']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  searchSugest(){
    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){        
      
        this._http.sugestUserReceipt({search: this.payment.userName}).then(
          data => {
            this.sugests = data;
          }, error => console.log(error)
        );
      } 

    }, 350);
  }

  getMonthlyFrom(id){    
    
    this.payment.userId = id;
    
    if(this.payment.type !== 1) return;

    this.payment.monthlyAmount = 0;     

    this._http.getMonthlyPayment({id: id}).then(
      data => {
        this.payment.monthly = data.amount;
        this.validateMonthlyPayment();
      },
      error => console.log(error)
    );

  }

  validateDescription(){
    if(this.payment.description == ''){
      this.validation.description = 1;
      this.validation.form = false;
    }
  }

  validateMonthlyPayment(){
    let d = new Date();    
    console.log(d.getDate());

    if((d.getMonth() + 1) == this.payment.month){
      if(d.getDate() <= 3){
         this.payment.monthlyAmount = (this.payment.monthly - this.desc);
         this.validation.paymentDate = 1;
        }
        else if(d.getDate() >= 11){
          this.payment.monthlyAmount = (this.payment.monthly + this.recharge);
          this.validation.paymentDate = 2;
      } else {
        this.payment.monthlyAmount = this.payment.monthly;
      }

    }

    else if((d.getMonth() + 1) < this.payment.month){
      this.payment.monthlyAmount = (this.payment.monthly - this.desc);
      this.validation.paymentDate = 1;
    } else {
      this.payment.monthlyAmount = (this.payment.monthly + this.recharge);
      this.validation.paymentDate = 2;
    }
  }

  createReceipt(){
    
    this.restoreValidations();
    if(this.payment.type == 5) this.validateDescription();
    if(this.validation.form == false) return;
    
    this._http.postNewReceipt(this.payment).then(
      data => {
        console.log(data);
        this.closePop();
        if(this.payment.payment_type == false)
          this.storage.updateCash(data.amount);
      },
      error => console.log(error)
    );
  }

  restoreValidations(){
    
    this.validation = {
      paymentDate: this.validation.paymentDate,
      description: 0,
      form: true,
    };

  }


}
