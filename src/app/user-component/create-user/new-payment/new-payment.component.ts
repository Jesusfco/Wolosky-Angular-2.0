import { Component, OnInit, Input } from '@angular/core';
import { Payment } from '../../payment';
@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {

  @Input() payment;
  @Input() paymentView;
  @Input() verificar;

  

  constructor() { }

  ngOnInit() {
  }

  verify(){

    this.verificar[1] = 0; 

    if(this.payment.date == null) this.verificar[1]++;
    if(this.payment.date == "") this.verificar[1]++;
    
    if(this.payment.amount ==null) this.verificar[1]++;


    if(this.verificar[1] == 0) this.paymentView = false;
    
  }

}
