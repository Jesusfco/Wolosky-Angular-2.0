import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { User } from '../../classes/user';
import { MonthlyPrice } from '../../classes/monthly-price';
import { Receipt } from '../../classes/receipt';
import { Parking } from '../../classes/parking';
import { Product } from '../../classes/product';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {

  usersLastCreated: Array<User> = [];
  usersLastUpdated: Array<User> = [];
  debtors: Array<User> = [];
  receipts: Array<Receipt> = [];
  monthlyPrices: Array<MonthlyPrice> = [];
  parking: Array<Parking> = [];
  products:Array<Product> =[]

  selection = ''
  page = 2
  request
  sendingData = 0

  constructor(private _http: DashboardService, 
    private router: Router,
    private not: NotificationService) { 

    this._http.getData().subscribe(x => {      
      this.selection = x.action

      if (x.action == 'usersLastCreated') {
        this.usersLastCreated = User.convertToArray(x.data);        
      } else if(x.action == "usersLastUpdated")
        this.usersLastUpdated = User.convertToArray(x.data);        
      else if(x.action == 'receipts')
        this.receipts = x.data
      else if(x.action == 'parking')
        this.parking = x.data
      else if(x.action == 'debtors')
        this.debtors = x.data
      else if(x.action == 'inventory')
        this.products = x.data
      
    });

  }

  ngOnInit() {
  }

  killRequest() {
    if(this.request != null) {    
      if(!this.request.closed) {
        this.request.unsubscribe()    
        this.sendingData--
      }            
    }
  }

  pushData(selection, data) {

    for(let d of data) {

      if (selection == 'usersLastCreated') {
        let obj = new User()
        obj.setData(d)
        this.usersLastCreated.push(obj);        
      } else if(selection == "usersLastUpdated") {
      
        let obj = new User()
        obj.setData(d)
        this.usersLastUpdated.push(obj);             

      } else if(selection == 'receipts'){ 

        let obj = new Receipt()
        obj.setData(d)
        this.receipts.push(obj);              

      } else if(selection == 'parking') {

        let obj = new Parking()
        obj.setData(d)
        this.parking.push(obj);              

      } else if(selection == 'debtors') {

        let obj = new User()
        obj.setData(d)
        this.debtors.push(obj);             

      } else if(selection == 'inventory') {

        let obj = new Product()
        obj.setData(d)
        this.products.push(obj);             

      }        

    }
    
  }

  chargeMore() {

    this.killRequest()

    this.sendingData++; 
      this._http.chargeMore(this.selection, this.page).subscribe(
        data => {
            this.pushData(this.selection, data.data)
            this.page++
        }, error => this.not.sendError(error),
        () => this.sendingData--
      )
  }
}
