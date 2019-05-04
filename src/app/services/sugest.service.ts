import { Url } from './../classes/url';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SugestService {

  private subject = new Subject<any>();

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action, data) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);
  }

  allUsers(data) {
    return this._http.post(Url.getApiUrlToken( 'sugests/students') , data)
                        .map(data => data.json())
                        .toPromise();
  }

}
