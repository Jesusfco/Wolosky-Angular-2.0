import { Component, OnInit } from '@angular/core';
import { ReceiptService } from './receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public notificacionts = {
    on: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
  }

  public search = {
    searchWord: null
  };

  public notifications = {
    on: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
    debtors: undefined,
  }

  constructor(private _http: ReceiptService ) { 
    this._http.getReceiptAnalisis().then(
      data => {

        if(data.count > 0)                  
          this.notifications.on = true

        this.notifications.debtorsMonthly = data.count;
        this.notifications.debtors = data.users;        

      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

}
