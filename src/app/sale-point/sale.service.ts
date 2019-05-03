import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable, Subject } from "rxjs";

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';

@Injectable()
export class SaleService {

  public link: Url = new Url();
  public storage: Storage = new Storage();

  private subject = new Subject<any>();
  
  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action, data) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);
  }

  postSale(sale) {
    return this._http.post(this.link.url + 'sale' + this.storage.getTokenUrl(), sale)
    .map(data => data.json())
    .toPromise();
  }

  outServiceSales(sale) {
    return this._http.post(this.link.url + 'sale/outService' + this.storage.getTokenUrl(), sale)
    .map(data => data.json())
    .toPromise();
  }

  getSales(){
    return this._http.get(this.link.url + 'sales' + this.storage.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  getSalesParameter(data){
    return this._http.post(this.link.url + 'sales' + this.storage.getTokenUrl(), data)
    .map(data => data.json())
    .toPromise();
  }

  showSale(id){
    return this._http.get(this.link.url + 'sales/'+ id + this.storage.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  debtSale(data) {
    return this._http.post(this.link.url + 'saleDebt' + this.storage.getTokenUrl(), data)
                  .map(data => data.json())
                  .toPromise();
  }

  getSugestMaster(keyword) {
    return this._http.post(this.link.url + 'sales/sugestDebt' + this.storage.getTokenUrl(), keyword)
                        .map(data => data.json())
                        .toPromise();
  }

}

  

