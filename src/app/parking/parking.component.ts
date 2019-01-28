import { ParkingService } from './parking.service';
import { Component, OnInit } from '@angular/core';
import { Parking } from '../classes/parking';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {

  parkings: Array<Parking> = []

  search = {
    to: null,
    from: null,
    name: null
  };

  constructor(private _http: ParkingService) { }

  ngOnInit() {
  }

  setParkings() {

  }

  searchInput(e) {

  }
}
