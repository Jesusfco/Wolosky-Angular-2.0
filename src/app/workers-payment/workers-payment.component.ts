import { Component, OnInit } from '@angular/core';
import { WorkPaymentService } from './work-payment.service';
import { Payment } from '../classes/payment';


@Component({
  selector: 'app-workers-payment',
  templateUrl: './workers-payment.component.html',
  styleUrls: ['./workers-payment.component.css']
})
export class WorkersPaymentComponent implements OnInit {

  public payments: Array<Payment> = [];
  public sendingData: number = 0;
  search = {
    searchWord: '',
    items: 20,
    page: 1,
    total: 0,
  };

  constructor(private _http: WorkPaymentService) { }

  ngOnInit() {
    this.setPayments();
  }

  setPayments() {
    this.sendingData++;
      this._http.getPayments(this.search).then(
        data => {
          this.payments = data.data;
          this.search.total = data.total;
        }, 
        error => localStorage.setItem('request', JSON.stringify(error))
        
      ).then(
        () => this.sendingData--
      );
  }

  pageAction(data){
      
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.setPayments();
  }


}
