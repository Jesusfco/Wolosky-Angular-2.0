import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '../classes/storage';

import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecordService {

  public token: Storage = new Storage();
  private subject = new Subject<any>();  

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(message: any) {
    this.subject.next(message);
  }

  getRecords(object) {
    return this._http.post(this.token.getUrl() + 'records' + this.token.getTokenUrl(), object )
            .map(data => data.json())
            .toPromise();
  }

}
