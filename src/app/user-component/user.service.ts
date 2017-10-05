import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

@Injectable()
export class UserService {    
  
  private urlPrincipal: string = 'http://localhost:8000/api/';

  constructor(private _http: Http) { }
  

  getUsers(){
      return this._http.get(this.urlPrincipal + 'user/getUser')
        .map( data => data.json())
        .toPromise();
  }

  createUser(informacion) {
    return this._http.post(this.urlPrincipal + 'user/createUser', informacion)
            .map(data => data.json())
            .toPromise();
  }

}
 