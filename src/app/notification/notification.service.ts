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

  sendNotification(title: String, description: String, time: Number) {

    let message = {
      title: title,
      description: description,
      time: time,
      status: 200,
    };

    
    let notification = {
      action: 'notification',
      data: message
    };

    this.subject.next(notification);
  }

  sendError(message:any) {
    
    let data = {
      action: 'notification',
      data: message
    };

    this.subject.next(data);
  }
  
}
