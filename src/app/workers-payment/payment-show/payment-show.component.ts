import { Payment } from './../../classes/payment';
import { backgroundOpacity, cardPop } from './../../animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkPaymentService } from '../../services/work-payment.service';

@Component({
  selector: 'app-payment-show',
  templateUrl: './payment-show.component.html',
  styleUrls: ['./payment-show.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class PaymentShowComponent implements OnInit {

  public observerRef: any;
  public payment: Payment = new Payment();
  public observerHttp: any;
  public sendingData: number = 0;
  public window = 1;
  state = {
    background: 'initial',
    card: 'initial',
  };
  constructor(private router: Router, private actRou: ActivatedRoute, private _http: WorkPaymentService ) {    

    this.observerRef = actRou.params.subscribe(params => {
      this.payment.id = params['id'];
    });

    this.observerHttp = this._http.getData().subscribe(x => {      
      if (x.action == 'getPayment') {
        this.payment.setValues(x.data);
      }
    });

   }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 80);

    setTimeout(() => {
      if(this.payment.date_from == null) {
        this.getPayment();
      }
    }, 150);

  }

  windowChange() {
    if(this.window == 1) {
      this.window = 2;      
    } else {
      this.window = 1;
    }
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/pago-trabajadores']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
  }

  getPayment() {

    this.sendingData++;

    this._http.getPayment(this.payment).then(

      data => this.payment.setValues(data),
      error => this._http.sendData({action: 'notification', data: error})

    ).then(

      () => this.sendingData--

    );

  }

  payEmploy() {
    this.payment.status = 2;
    this.updatePaymentData();
  }

  updatePaymentData() {
    if(this.sendingData > 0) return;

    this.sendingData++;
    this._http.updatePayment(this.payment).then(
      data => {

        this._http.sendData({action: 'updatePayment', data: this.payment});        

      },
      error => this._http.sendData({action: 'notification', data: error})

    ).then(() => this.sendingData--);
  }

  deletePay() {
    if(this.sendingData > 0) return;
    
    this.sendingData++;
    this._http.deletePayment(this.payment).then(
      data => {

        this._http.sendData({action: 'deletePayment', data: this.payment});
        this.closePop();

      },
      error => this._http.sendData({action: 'notification', data: error})

    ).then(() => this.sendingData--);
  }

}
