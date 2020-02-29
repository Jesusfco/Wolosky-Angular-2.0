  import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { User } from '../classes/user';
import { Receipt } from '../classes/receipt';
import { Parking } from '../classes/parking';
import { MonthlyPrice } from '../classes/monthly-price';
import { NotificationService } from '../notification/notification.service';
import { Router } from '@angular/router';

import { Product } from '../classes/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sendLastCreated(){
    this._http.sendData('usersLastCreated', this.usersLastCreated)
    this.goDetails()
  }
  sendLastUpdated(){
    this._http.sendData('usersLastUpdated', this.usersLastUpdated)
    this.goDetails()
  }
  sendReceipts(){
    this._http.sendData('receipts', this.receipts)
    this.goDetails()
  }
  sendParking(){
    this._http.sendData('parking', this.parking)
    this.goDetails()
  }
  sendInventory() {
    this._http.sendData('inventory', this.inventory)
    this.goDetails()
  }
  sendDeptors() {
    this._http.sendData('debtors', this.deptors)
    this.goDetails()
  }
  usersLastCreated: Array<User> = [];
  usersLastUpdated: Array<User> = [];
  deptors: Array<User> = [];
  receipts: Array<Receipt> = [];
  monthlyPrices: Array<MonthlyPrice> = [];
  parking: Array<Parking> = [];
  inventory: Array<Product> = [];

  request = null
  sendingData = 0

  constructor(private _http: DashboardService, 
    private not: NotificationService,
    private router: Router) {
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

  
  goDetails() {
    this.router.navigate(['/dashboard/detalles'])
  }

}
