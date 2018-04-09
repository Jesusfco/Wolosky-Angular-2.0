import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class SaleService {

  public link: Url = new Url();
  public storage: Storage = new Storage();

  constructor(private _http: Http) { }

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

  getSalesParameter(parameter){
    return this._http.post(this.link.url + 'sales' + this.storage.getTokenUrl(), parameter)
    .map(data => data.json())
    .toPromise();
  }

  showSale(id){
    return this._http.get(this.link.url + 'sales/'+ id + this.storage.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

}

  

