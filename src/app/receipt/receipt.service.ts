import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class ReceiptService {

  public link: Url = new Url();
  public token: Storage = new Storage();

  constructor(private _http: Http) { }

  getReceiptAnalisis(){
    return this._http.get(this.link.url + "receipt/analisis" + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  postNewReceipt(data){
    return this._http.post(this.link.url + "receipt" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  sugestUserReceipt(data){
    return this._http.post(this.link.url + "receipt/sugestUser" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  getMonthlyPayment(data){
    return this._http.post(this.link.url + "receipt/getMonthlyPayment" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  getReceipt(data){
    return this._http.post(this.link.url + "receipt/get" + this.token.getTokenUrl() + '&page=' + data.page, data)
              .map(data => data.json()) 
              .toPromise();
  }

  showReceipt(receipt) {
    return this._http.get(this.link.url + "receipt/show/" + receipt.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  updateReceipt(receipt) {
    return this._http.post(this.link.url + "receipt/update"  + this.token.getTokenUrl(), receipt)
            .map(data => data.json())
            .toPromise();
  }

  deleteReceipt(receipt){
    return this._http.delete(this.link.url + "receipt/delete/" + receipt.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

}
