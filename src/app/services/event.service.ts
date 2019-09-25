import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Url } from '../classes/url';
import { Storage } from '../classes/storage';
import { Subject } from 'rxjs';

@Injectable()
export class EventService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  private subject = new Subject<any>();  

  constructor(private _http: Http) { }
  
  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action: String, data: any) {
    const message = {action: action, data: data};
    setTimeout(() => this.subject.next(message), 50);    
  }

  search(data) {
    return this._http.post(this.link.url + 'events' + this.token.getTokenUrl() + '&page=' + data.page, data)
            .map(data => data.json())
            .toPromise();
  }

  create(data){
    return this._http.post(this.link.url + "event" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  update(data){
    return this._http.post(this.link.url + "event/update" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  delete(data){
    return this._http.post(this.link.url + "event/delete" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  show(data){
    return this._http.get(this.link.url + "event/show/" + data.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  getParticipants(data){
    return this._http.get(this.link.url + "event/participants/" + data.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  createParticipant(data){
    return this._http.post(this.link.url + "event/createParticipant" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  createParticipants(data){
    return this._http.post(this.link.url + "event/createParticipants" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  deleteParticipant(data) {
    return this._http.post(this.link.url + "event/deleteParticipant" + this.token.getTokenUrl(), data)
    .map(data => data.json())
    .toPromise();
  }

  createReceipt(receipt) {
    return this._http.post(this.link.url + "event/createReceipt" + this.token.getTokenUrl(), receipt)
    .map(data => data.json())
    .toPromise();
  }

}
