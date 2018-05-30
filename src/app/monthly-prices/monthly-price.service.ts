import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';

@Injectable()
export class MonthlyPriceService {

  public link: Url = new Url();
  public token: Storage = new Storage();

  constructor(private _http: Http) { }

  getAll(){
    return this._http.get(this.link.url + 'monthly-cost' + this.token.getTokenUrl())
                .map(data => data.json())
                .toPromise();
  }

  create(monthlyCost){
    return this._http.post(this.link.url + 'monthly-cost/create' + this.token.getTokenUrl(), monthlyCost)
                .map(data => data.json())
                .toPromise();
  }

  update(monthlyCost){
    return this._http.post(this.link.url + 'monthly-cost/update' + this.token.getTokenUrl(), monthlyCost)
                .map(data => data.json())
                .toPromise();
  }

  delete(monthlyCost){
    return this._http.delete(this.link.url + 'monthly-cost/' + monthlyCost.id + this.token.getTokenUrl())
                .map(data => data.json())
                .toPromise();
  }

}
