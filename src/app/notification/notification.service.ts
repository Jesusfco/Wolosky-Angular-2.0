import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  private subject = new Subject<any>();

  constructor() { }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(message: any) {
    this.subject.next(message);
  }
  
}
