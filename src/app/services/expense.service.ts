import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable, Subject } from "rxjs";

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';


@Injectable()
export class ExpenseService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }
 
  private subject = new Subject<any>();  
  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action: String, data: any) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);    
  }

  getExpenses(search) {
    return this._http.post(this.link.url + 'expenses' + this.token.getTokenUrl() , search)
            .map(data => data.json())
            .toPromise();
  }

  createExpense(expense) {
    return this._http.post(this.link.url + 'expenses/create' + this.token.getTokenUrl() , expense)
            .map(data => data.json())
            .toPromise();
  }

  showExpense(expense) {
    return this._http.get(this.link.url + 'expenses/' + expense.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  updateExpense(expense) {
    return this._http.post(this.link.url + 'expenses/update' + this.token.getTokenUrl() , expense)
            .map(data => data.json())
            .toPromise();
  }

  deleteExpense(expense) {
    return this._http.delete(this.link.url + 'expenses/' + expense.id + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();
  }

}
