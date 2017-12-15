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
    return this._http.post(this.link.url + 'user', information)
            .map(data => data.json())
            .toPromise();
  }

  get() {
    return this._http.get(this.link.url + 'user')
            .map(data => data.json())
            .toPromise();
  }

  checkUniqueEmail(data){
    return this._http.post(this.link.url + 'user/uniqueEmail', {email: data})
      .map(data => data.json())
      .toPromise();
  }

  checkUniqueName(data){
    return this._http.post(this.link.url + 'user/uniqueName', {name: data})
      .map(data => data.json())
      .toPromise();
  }

}
