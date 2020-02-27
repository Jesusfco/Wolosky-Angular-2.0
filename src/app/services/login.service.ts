import { Url } from '../classes/url';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable, Subject } from "rxjs";
import { Storage } from '../classes/storage';

@Injectable()
export class LoginService {
  
  
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

    
    return this._http.post(Url.getApiUrlToken("login"), information)
            .map(data => data.json())
            .toPromise();
  }

  checkAuth() { 
    return this._http.get(Url.getApiUrlToken('login/check') )
    .map(data => data.json())
    .toPromise();
  }

  getProducts() { 
    return this._http.get(Url.getApiUrlToken('inventory/getProducts') )
    .map(data => data.json())
    .toPromise();
  }

  resetPassword(data) { 

    return this._http.post(Url.getApiUrlToken('resetPassword'), data)    
    .map(data => data.json())
    .toPromise();

  }

  validateResetToken(data){
    return this._http.post(Url.getApiUrlToken('validateResetToken'), data)  
    .map(data => data.json())  
    .toPromise();
  }

  setPassword(data){
    return this._http.post(Url.getApiUrlToken('setPassword'), data)    
    .map(data => data.json())
    .toPromise();
  }
}
