import { Url } from '../classes/url';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable, Subject } from "rxjs";
import { Storage } from '../classes/storage';

@Injectable()
export class LoginService {

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

  login(information) {
    return this._http.post(this.link.url + 'login', information)
            .map(data => data.json())
            .toPromise();
  }

  checkAuth() { 
    return this._http.get(this.link.url + 'login/check' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  getProducts() { 
    return this._http.get(this.link.url + 'inventory/getProducts' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  resetPassword(data) { 

    return this._http.post(Url.getApiUrl() + 'resetPassword', data)    
    .map(data => data.json())
    .toPromise();

  }

  validateResetToken(data){
    return this._http.post(Url.getApiUrl() + 'validateResetToken', data)  
    .map(data => data.json())  
    .toPromise();
  }

  setPassword(data){
    return this._http.post(Url.getApiUrl() + 'setPassword', data)    
    .map(data => data.json())
    .toPromise();
  }
}
