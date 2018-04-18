import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class CutoutService {

  public link: Url = new Url();
  public token: Storage = new Storage();

  constructor(private _http: Http) { }

  updateCash(data){
    return this._http.post(this.link.url + 'cash' + this.token.getTokenUrl(), data)
                .map(data => data.json())
                .toPromise();
  }

  getCutout(){
    return this._http.get(this.link.url + 'cutout' + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }
}
