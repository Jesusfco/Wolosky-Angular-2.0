import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '../classes/storage';

import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecordService {

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

  getRecords(object) {
    return this._http.post(this.token.getUrl() + 'records' + this.token.getTokenUrl(), object )
            .map(data => data.json());
  }

  show(object) {
    return this._http.get(this.token.getUrl() + 'record/show/' + object.id + this.token.getTokenUrl() )
            .map(data => data.json()).toPromise();
  }

  update(object) {
    return this._http.post(this.token.getUrl() + 'record/update/' + object.id + this.token.getTokenUrl(), object )
            .map(data => data.json());
  }

  delete(object) {
    return this._http.get(this.token.getUrl() + 'record/delete/' + object.id + this.token.getTokenUrl() )
            .map(data => data.json());
  }

  deleteRecords(object) {
    return this._http.post(this.token.getUrl() + 'records/delete' + this.token.getTokenUrl(), object )
            .map(data => data.json()).toPromise();
  }

}
