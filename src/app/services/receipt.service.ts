import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';
import { Action } from 'rxjs/scheduler/Action';

@Injectable()
export class ReceiptService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  private subject = new Subject<any>();  

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action: String, data: any) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);    
  }

  getReceiptAnalisis(data){
    return this._http.post(Url.getApiUrlToken("receipt/getDebtorsAnalisis") , data)
              .map(data => data.json())
              .toPromise();
  }

  postNewReceipt(data){
    return this._http.post(Url.getApiUrlToken("receipt"), data)
              .map(data => data.json())
              .toPromise();
  }

  sugestUserReceipt(data){
    return this._http.post(Url.getApiUrlToken("receipt/sugestUser") , data)
              .map(data => data.json());
  }

  getMonthlyPayment(data){
    return this._http.post(Url.getApiUrlToken("receipt/getMonthlyPayment"), data)
              .map(data => data.json())
              .toPromise();
  }

  getReceipts(data){
    return this._http.post(Url.getApiUrlTokenWithVariables("receipt/get",'&page=' + data.page), data)
              .map(data => data.json())               
  }

  showReceipt(receipt) {
    return this._http.get(Url.getApiUrlToken("receipt/show/" + receipt.id ))
              .map(data => data.json())
              .toPromise();
  }

  updateReceipt(receipt) {
    return this._http.post(Url.getApiUrlToken("receipt/update" ), receipt)
            .map(data => data.json())
            .toPromise();
  }

  deleteReceipt(receipt){
    return this._http.delete(Url.getApiUrlToken("receipt/delete/" + receipt.id ))
              .map(data => data.json())
              .toPromise();
  }

  checkUnique(receipt) {
    return this._http.post(Url.getApiUrlToken("receipt/checkUnique" ), receipt)
              .map(data => data.json())
              .toPromise();
  }

}
