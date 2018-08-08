import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';

@Injectable()
export class ScheduleService {

  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }
 
  getShcedules(userType) {
    return this._http.post(this.token.getUrl() + 'schedule/getStudents' + this.token.getTokenUrl(), userType )
            .map(data => data.json())
            .toPromise();
  }

}
