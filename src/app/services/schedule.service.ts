import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs";
import { Observable, Subject } from "rxjs";

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';

@Injectable()
export class ScheduleService {

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
  
  getSchedules(data) {
    return this._http.post(this.token.getUrl() + 'schedule/getStudents' + this.token.getTokenUrl(), data )
            .map(data => data.json())            
  }

}
