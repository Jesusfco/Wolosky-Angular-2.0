import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class UserService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }
 

  create(information) {
    return this._http.post(this.link.url + 'user' + this.token.getTokenUrl() , information)
            .map(data => data.json())
            .toPromise();
  }

  updateUser(user) {
    return this._http.post(this.link.url + 'user/' + user.id + this.token.getTokenUrl() , user)
            .map(data => data.json())
            .toPromise();
  }

  search(data) {
    return this._http.post(this.link.url + 'userSearch' + this.token.getTokenUrl(), {search: data})
            .map(data => data.json())
            .toPromise();
  }

  getUser(id){
    return this._http.get(this.link.url + 'user/' + id + this.token.getTokenUrl())
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

}
