import { NotificationService } from './../notification/notification.service';
import { ParkingService } from '../services/parking.service';
import { Component, OnInit } from '@angular/core';
import { Parking } from '../classes/parking';
import { Storage } from '../classes/storage';
import { MyCarbon } from '../utils/classes/my-carbon';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {

  parkings: Array<Parking> = []
  sendingData = 0
  search = {
    to: null,
    from: null,
    name: null,
    id: null
  }

  storage: Storage = new Storage()

  constructor(private _http: ParkingService, private not: NotificationService) { 
    
    _http.getData().subscribe(x => {      
      
      if (x.action == 'new') {
        this.new(x.data);        
      } else if(x.action == "update")
        this.update(x.data);
        else if(x.action == 'delete')
        this.delete(x.data);
      
    });

  }

  ngOnInit() {
    this.getDates()
    this.setParkings()
  }

  setParkings() {

    this.sendingData++

    this._http.getParkings(this.search).then(
       
      data => {
      
        this.parkings = []

        for(let parking of data) {

          let object = new Parking()
          object.setValues(parking);
          this.parkings.push(object)

        }

      }, error => this.not.sendError(error)

    ).then(() => this.sendingData--)

  }

  getDates() {

    this.search.from = MyCarbon.getFromToThisMonth().from
    this.search.to = MyCarbon.getFromToThisMonth().to

  }

  new(parking: Parking) {
    this.parkings.unshift(parking)
  }

  update(parking: Parking) {

    for(let park of this.parkings) {
      if(parking.id == park.id){
        park = parking
        break
      }
    }

  }

  delete(parking: Parking) {
    for(let i = 0; i < this.parkings.length; i++) {
      if(parking.id == this.parkings[i].id){
        this.parkings.splice(i,1)
        break
      }
    }
  }
}
