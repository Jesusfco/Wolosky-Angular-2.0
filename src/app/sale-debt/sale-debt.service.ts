import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from '../url';
import { Storage } from '../storage';

@Injectable()
export class SaleDebtService {

  public link: Url = new Url();
  public storage: Storage = new Storage();

  constructor(private _http: Http) { }

  getDebtors(search) {
    return this._http.post(this.link.url + 'debtors' + this.storage.getTokenUrl(), search)
              .map(data => data.json())
              .toPromise();
  }

  sugestUsers(word){
    return this._http.post(this.link.url + "debtors/sugest" + this.storage.getTokenUrl(), word)
              .map(data => data.json())
              .toPromise();
  }

}
