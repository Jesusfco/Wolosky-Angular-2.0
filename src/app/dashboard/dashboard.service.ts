import { Injectable } from '@angular/core';
import { Url } from '../classes/url';
import { Http, Headers } from '@angular/http';
import "rxjs";
import { Observable, Subject } from "rxjs";

@Injectable()
export class DashboardService {

  private subject = new Subject<any>();  

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action: String, data: any) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);    
  }

  getResume(){
    return this._http.get(Url.getApiUrlToken("dashboard")  )    
    .map(data => data.json())
    ;
  }

}
