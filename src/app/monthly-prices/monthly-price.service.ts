import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MonthlyPriceService {
  
  private subject = new Subject<any>();
  
  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action, data) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);
  }

  getAll(){
    return this._http.get(Url.getApiUrlToken('monthly-cost'))
                .map(data => data.json())
                .toPromise();
  }

  show(object){
    return this._http.get(Url.getApiUrlToken('monthly-cost/show/' + object.id) )
                .map(data => data.json())
                .toPromise();
  }

  create(object){
    return this._http.post(Url.getApiUrlToken('monthly-cost/create'), object)
                .map(data => data.json())
                .toPromise();
  }

  update(object){
    return this._http.post(Url.getApiUrlToken('monthly-cost/update'), object)
                .map(data => data.json())
                .toPromise();
  }

  delete(object){
    return this._http.delete(Url.getApiUrlToken('monthly-cost/' + object.id))
                .map(data => data.json())
                .toPromise();
  }

  getStudentsSchedules() {    
    return this._http.get(Url.getApiUrlToken('monthly-cost/studentSchedules') )
      .map(data => data.json())
      .toPromise();
  }

  updateStudentsMonthly(array) {
    return this._http.post(Url.getApiUrlToken('monthly-cost/updateMonthlyPayment'), {array: array})
        .map(data => data.json())
        .toPromise();
  }

}
