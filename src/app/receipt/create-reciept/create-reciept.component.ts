import { Component, OnInit,OnDestroy } from '@angular/core';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../receipt.service';
import { Storage } from '../../storage';
import { Receipt } from '../../classes/receipt';
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

  public payment: Receipt = new Receipt();
   

  public sugests: any = [];
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
    form: true,
  };
  
  public request: any = undefined;

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

    this.sendingData.monthly = true;
    this._http.getMonthlyPayment({id: localStorage.getItem('debtorId')}).then(

      data => {

        this.payment.monthly = parseFloat(data.amount);
        this.payment.user_id = data.user.id;
        this.payment.user_name = data.user.name;
        this.validateMonthlyPayment();

      }, error => console.log(error)

    ).then(

      () => this.sendingData.monthly = false

    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  ngOnDestroy(){

    if(localStorage.getItem('receiptStatus') == undefined) return;

    localStorage.removeItem('debtorId');
    localStorage.setItem('receiptStatus', '0');
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
        this._http.sugestUserReceipt({search: this.payment.user_name}).then(
          data => {
            this.sugests = data;
          }, error => console.log(error)
        ).then(
          () => this.sendingData.sugest = false
        );
      } 

    }, 350);
  }

  getMonthlyFrom(id){    
    
    this.payment.user_id = id;
    
    if(this.payment.type !== 1) return;

    this.sendingData.monthly = true;
    this.payment.monthlyAmount = 0;

    this._http.getMonthlyPayment({id: id}).then(
      data => {
        this.payment.monthly = parseInt(data.amount);
        this.validateMonthlyPayment();
      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData.monthly = false
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
    
    this.sendingData.request = true;

    if(this.payment.type == 1) {

      this._http.checkUnique(this.payment).then(
        data => {
          
          if(data == true) {
            alert('Este Usuario ya realizo el pago del mes actual');
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
      form: true,
    };

  }

  printReceipt(){
      window.print();
  }

  sendReceipt(){
    
    this._http.postNewReceipt(this.payment).then(
      data => {

        this.request = data;

        data.month = parseInt(data.month);
        data.id = parseInt(data.id);
        data.amount = parseFloat(data.amount);
        data.user_name = this.payment.user_name;        

        localStorage.setItem('newReceipt', JSON.stringify(data));
        localStorage.removeItem("receiptStatus");
        
        if(this.payment.payment_type == false) 
          this.storage.updateCash(data.amount);

        let not = {
          title: 'Recibo Creado',
          description: 'Datos Guardados en el Servidor',
          status: 200
        };

        localStorage.setItem('request', JSON.stringify(not))

      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData.request = false
    );
  }


}
