import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

import { Url } from '../classes/url';
import { Storage } from '../classes/storage';
import { User } from '../classes/user';

@Injectable()
export class UserService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  private subject = new Subject<any>();
  
  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(message: any) {
    this.subject.next(message);
  }

 

  create(information) {
    return this._http.post(this.link.url + 'user' + this.token.getTokenUrl() , information)
            .map(data => data.json())
            .toPromise();
  }

  updateUser(user) {
    return this._http.post(this.link.url + 'user/edit/' + user.id + this.token.getTokenUrl() , user)
            .map(data => data.json())
            .toPromise();
  }

  updateSalary(salary) {
    return this._http.post(this.link.url + 'user/updateSalary' + this.token.getTokenUrl() , salary)
            .map(data => data.json())
            .toPromise();
  }

  search(data) {
    return this._http.post(this.link.url + 'userSearch' + this.token.getTokenUrl() + '&page=' + data.page, data)
            .map(data => data.json())
            .toPromise();
  }

  getUser(id){
    return this._http.get(this.link.url + 'user/' + id + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();
  }

  getSchedules(id){
    return this._http.get(this.link.url + 'user/schedules/' + id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  updateSchedule(id, schedules){
    return this._http.post(this.link.url + 'user/schedules/' + id + this.token.getTokenUrl(), schedules)
              .map(data => data.json())
              .toPromise();
  }

  updateMonthlyPayment(monthly) {
    return this._http.post(this.link.url + 'user/monthlyPayment' + this.token.getTokenUrl(), monthly)
              .map(data => data.json())
              .toPromise();
  }

  checkUniqueEmail(data){
    return this._http.post(this.link.url + 'user/uniqueEmail' + this.token.getTokenUrl(), {email: data})
      .map(data => data.json())
      .toPromise();
  }

  checkUniqueName(data){
    return this._http.post(this.link.url + 'user/uniqueName' + this.token.getTokenUrl(), {name: data})
      .map(data => data.json())
      .toPromise();
  }


  getStatus(id) {
    return this._http.get(this.link.url + 'user/status/' + id + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();
  }

  postStatus(record){
    return this._http.post(this.link.url + 'user/status' + this.token.getTokenUrl(), record)
            .map(data => data.json())
            .toPromise();
  }

  getAllMonthlyPrices(){
    return this._http.get(this.link.url + 'monthly-cost' + this.token.getTokenUrl())
                .map(data => data.json())
                .toPromise();
  }

  getMonthlyPayment(id){
    return this._http.get(this.link.url + 'monthlyPayment/' + id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  getSalary(id) {
    return this._http.get(this.link.url + 'salary/' + id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  getReferences(id) {
    return this._http.get(this.link.url + 'references/' + id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  postReference(reference) {
    return this._http.post(this.link.url + 'references/create' + this.token.getTokenUrl(), reference)
              .map(data => data.json())
              .toPromise();
  }

  updateReference(reference) {
    return this._http.post(this.link.url + 'references/update' + this.token.getTokenUrl(), reference)
              .map(data => data.json())
              .toPromise();
  }

  deleteReference(reference) {
    return this._http.delete(this.link.url + 'references/delete/' + reference.id + this.token.getTokenUrl(), reference)
              .map(data => data.json())
              .toPromise();
  }

  safeDeleteCheck(user){
    return this._http.post(this.link.url + 'user/safeDelete/' + user.id + this.token.getTokenUrl(), user)
            .map(data => data.json())
            .toPromise();
  }

  deleteUser(user){
    return this._http.delete(this.link.url + 'user/delete/' + user.id + this.token.getTokenUrl(), user)
            .map(data => data.json())
            .toPromise();
  }

  deleteSchedule(schedule) {
    return this._http.delete(this.link.url + 'user/schedules/delete/' + schedule.id + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();
  }

  saveUserImg(file: File, user: User) {

    const formData = new FormData();
    formData.append('image', file, file.name);
    formData.append('id', user.id.toString());

    return this._http.post(this.link.url + 'user/saveUserImg' + this.token.getTokenUrl(), formData)
            .map(data => data.json())
            .toPromise();
  }

  getUserImg(data){
    // data = "https://upload.wikimedia.org/wikipedia/commons/5/5f/Ramon_Maria_Narvaez.jpg"
    return this._http
        .get( data , { responseType: ResponseContentType.Blob })
        .map((res: Response) => res.blob())
  }

}
