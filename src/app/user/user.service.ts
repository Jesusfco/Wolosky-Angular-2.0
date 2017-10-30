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

  getUser(){
      
    return [{
        name: 'Jesus Fco Cortes',
        type: 5,
        phone: '9611221222',
        sexo: 1,      
      
      },{
        name: 'Diana Toledo Chida',
        type: 5,
        phone: '9611113543',
        sexo: 2,      
      }
      ];
    
  }

  create(information) {
    return this._http.post(this.link.url + 'user', information)
            .map(data => data.json())
            .toPromise();
  }

  // get() {
  //   return this._http.post(this.link.url + 'user')
  //           .map(data => data.json())
  //           .toPromise();
  // }

}
