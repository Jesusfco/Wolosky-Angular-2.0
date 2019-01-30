import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parking } from '../../classes/parking';
import { ParkingService } from '../parking.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.component.html',
  styleUrls: ['./edit-parking.component.css']
})
export class EditParkingComponent implements OnInit {

  @Input() parking2: Parking;
  @Output() updateEventEmit = new EventEmitter();
  
  parking: Parking =  new Parking()

  constructor(
    private _http: ParkingService,    
    private not: NotificationService
  ) { }

  ngOnInit() {

    Object.assign(this.parking, this.parking2)

  }

  update() {

    if(!this.parking.validationForCreate()) return

    
    this._http.updateParking(this.parking).then(
      data => {

        this.parking.created_at = data.created_at
        this.updateEventEmit.emit(this.parking)
        this.not.sendNotification('Recibo Actualizado', 'El recibo a sido actualizado en la base de datos', 2500)
      }, error => this.not.sendError(error)
    )
  }
}
