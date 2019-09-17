import { NotificationService } from './../notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { WorkPaymentService } from '../services/work-payment.service';
import { Payment } from '../classes/payment';


@Component({
  selector: 'app-workers-payment',
  templateUrl: './workers-payment.component.html',
  styleUrls: ['./workers-payment.component.css']
})
export class WorkersPaymentComponent implements OnInit {

  public payments: Array<Payment> = [];
  public sendingData: number = 0;
  public outletOutput: any;
  search = {
    searchWord: '',
    items: 20,
    page: 1,
    total: 0,
  };

  constructor(private _http: WorkPaymentService, private notification: NotificationService) { 
    this.outletOutput = this._http.getData().subscribe(x => {
      
      if (x.action == 'new') {

        this.payments.unshift(x.data);

      } else if(x.action == "updatePayment")
        this.updatePayment(x.data);
        else if(x.action == 'deletePayment')
        this.deletePayment(x.data);
      
    });
  }

  ngOnInit() {
    this.setPayments();
  }

  setPayments() {
    this.sendingData++;
      this._http.getPayments(this.search).then(
        data => {

          for(let d of data.data) {
            let payment = new Payment();
            payment.setValues(d);
            this.payments.push(payment);
          }
          
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

  sendPayment(payment) {
    setTimeout(() => this._http.sendData({action: 'getPayment', data: payment}), 50);
    
  }

  updatePayment(payment: Payment) {

    let notification = {
      status: 200,
      title: 'Pago Actualizado',
      description: 'Los datos del pago han sido guardado correctamente',
      time: 2500
    };

    this.notification.sendData({action: 'notification', data: notification});
    
    for(let i = 0; i < this.payments.length; i++) {
      if(this.payments[i].id == payment.id) {        
        this.payments[i].setValues(payment);
        break;
      }
    }
  }

  deletePayment(payment) {
    
    let notification = {
      status: 200,
      title: 'Pago Eliminado',
      description: 'Los datos han sido eliminados permanentemente de la base de datos',
      time: 2500
    };

    this._http.sendData({action: 'notification', data: notification});
    
    let i = 0;
    for(let pay of this.payments) {
      if(pay.id == payment.id) {
        this.payments.splice(1, i);
        break;
      }
      i++;
    }

  }

}
