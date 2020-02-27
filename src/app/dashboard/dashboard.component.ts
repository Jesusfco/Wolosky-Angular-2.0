  import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { User } from '../classes/user';
import { Receipt } from '../classes/receipt';
import { Parking } from '../classes/parking';
import { MonthlyPrice } from '../classes/monthly-price';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersLastCreated: Array<User> = [];
  usersLastUpdated: Array<User> = [];
  receipts: Array<Receipt> = [];
  monthlyPrices: Array<MonthlyPrice> = [];
  parking: Array<Parking> = [];

  request = null
  sendingData = 0

  constructor(private _http: DashboardService, private not: NotificationService) {
    this.getResumeData();
  }

  ngOnInit() {
  }

  getResumeData() {

    if(this.request != null) {    
      if(!this.request.closed) {
        this.request.unsubscribe()    
        this.sendingData--
      }
      
      
    }

    this.sendingData++;    
      
    this.request = this._http.getResume().subscribe(
    data => {
      this.usersLastCreated = User.convertToArray(data.usersLastCreated)
      this.usersLastUpdated = User.convertToArray(data.usersLastUpdated)
      this.receipts = Receipt.convertToArray(data.receipts)
      this.monthlyPrices = MonthlyPrice.convertToArray(data.monthlyPrices)
      this.parking = Parking.convertToArray(data.parking)
    }, error => this.not.sendError(error),
    () => this.sendingData--

    
    )

  }

}
