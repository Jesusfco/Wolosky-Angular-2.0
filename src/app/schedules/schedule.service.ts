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
 
  getSchedules(data) {
    return this._http.post(this.token.getUrl() + 'schedule/getStudents' + this.token.getTokenUrl(), data )
            .map(data => data.json())            
  }

}
