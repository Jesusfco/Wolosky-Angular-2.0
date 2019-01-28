import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Storage } from '../classes/storage';
import { Parking } from '../classes/parking';

@Injectable()
export class ParkingService {

  public token: Storage = new Storage();
  private subject = new Subject<any>();  

  constructor(private _http: Http) { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action: String, data: any) {
    let message = {
      action: action,
      data: data
    };
    this.subject.next(message);
  }

  getParkings(data){
    return this._http.post(this.token.url + "parkings" + this.token.getTokenUrl(), data)
              .map(data => data.json())
              .toPromise();
  }

  showParking(parking: Parking) {
    return this._http.get(this.token.url + "parkings/show/"+ parking.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  createParking(parking: Parking){
    return this._http.post(this.token.url + "parkings/create" + this.token.getTokenUrl(), parking)
              .map(data => data.json())
              .toPromise();
  }

  updateParking(parking: Parking){
    return this._http.post(this.token.url + "parkings/update/"+ parking.id + this.token.getTokenUrl(), parking)
              .map(data => data.json())
              .toPromise();
  }

  deleteParking(parking: Parking) {
    return this._http.get(this.token.url + "parkings/delete/"+ parking.id + this.token.getTokenUrl())
              .map(data => data.json())
              .toPromise();
  }

  
}
