import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '../classes/storage';

import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WorkPaymentService {

  public token: Storage = new Storage();
  private subject = new Subject<any>();  

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(message: any) {
    this.subject.next(message);
  }

 

  getPayments(object) {
    return this._http.post(this.token.getUrl() + 'workers-payment' + this.token.getTokenUrl(), object )
            .map(data => data.json())
            .toPromise();
  }

  updatePayment(data) {
    return this._http.post(this.token.getUrl() + 'workers-payment/update' + this.token.getTokenUrl(), data )
            .map(data => data.json())
            .toPromise();
  }
  getPayment(data) {
    return this._http.get(this.token.getUrl() + 'workers-payment/show/' + data.id + this.token.getTokenUrl() )
            .map(data => data.json())
            .toPromise();
  }

  getDataToProcess(period) {
    return this._http.post(this.token.getUrl() + 'workers-payment/dataToProcess' + this.token.getTokenUrl(), period )
            .map(data => data.json())
            .toPromise();
  }

  storePayment(payment){
    return this._http.post(this.token.getUrl() + 'workers-payment/storePayment' + this.token.getTokenUrl(), payment )
            .map(data => data.json())
            .toPromise();
  }

  deletePayment(data) {
    return this._http.get(this.token.getUrl() + 'workers-payment/delete/' + data.id + this.token.getTokenUrl() )
            .map(data => data.json())
            .toPromise();
  }
  
}
