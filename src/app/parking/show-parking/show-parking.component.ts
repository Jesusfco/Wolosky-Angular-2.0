import { BackgroundCard, Card } from './../../animations/card.animation';
import { NotificationService } from './../../notification/notification.service';
import { ParkingService } from '../../services/parking.service';
import { Component, OnInit } from '@angular/core';
import { Parking } from '../../classes/parking';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-parking',
  templateUrl: './show-parking.component.html',
  styleUrls: ['./show-parking.component.css'],
  animations: [ Card, BackgroundCard]
})
export class ShowParkingComponent implements OnInit {

  parking: Parking =  new Parking()
  sendingData = 0
  window = 1

  public state = {
    background: 'initial',
    card: 'initial',
  };

  constructor(private _http: ParkingService,
    private not: NotificationService,
    private router: Router, 
    private actRou: ActivatedRoute) { 

      actRou.params.subscribe(params => {
        this.parking.id = params['id'];
        this.getParking();
      });
      

    }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }  

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/parking']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  getParking() {

    this.sendingData++

    this._http.showParking(this.parking).then(

      data => this.parking.setData(data),

      error =>  this.not.sendError(error)

    ).then(() => this.sendingData-- )

  }

  delete() {
    this.sendingData++
    this._http.deleteParking(this.parking).then(
      data => {
        this._http.sendData('delete', this.parking)
        this.not.sendNotification('Recibo Eliminado', 'El recibo ha sido eliminado correctamente, no podra ser recuperado', 3000)
        this.closePop()
      }, error => this.not.sendError(error)
    ).then(() => this.sendingData-- )
  }

  update(parking) {
    this.parking = parking
    this._http.sendData('update', this.parking)
  }

}
