import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { User } from '../../classes/user';
import { MonthlyPrice } from '../../classes/monthly-price';
import { Receipt } from '../../classes/receipt';
import { Parking } from '../../classes/parking';
import { Product } from '../../classes/product';
import { Router } from '@angular/router';

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

  constructor(private _http: DashboardService, 
    private router: Router) { 

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
}
