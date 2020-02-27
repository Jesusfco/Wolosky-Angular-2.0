import { Injectable } from '@angular/core';
import { Url } from '../classes/url';
import { Http, Headers } from '@angular/http';
import "rxjs";
import { Observable, Subject } from "rxjs";

@Injectable()
export class DashboardService {

  constructor(private _http: Http) { }

  getResume(){
    return this._http.get(Url.getApiUrlToken("dashboard")  )    
    .map(data => data.json())
    ;
  }

}
