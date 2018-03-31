import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class ReceiptService {

  public link: Url = new Url();
  public token: Storage = new Storage();

  constructor(private _http: Http) { }

  getReceiptAnalisis(){
    return this._http.get(this.link.url + "receipt/analisis" + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  postNewReceipt(data){
    return this._http.post(this.link.url + "receipt" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  sugestUserReceipt(data){
    return this._http.post(this.link.url + "receipt/sugestUser" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

}
