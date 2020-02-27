import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-debtors-monthly',
  templateUrl: './debtors-monthly.component.html',
  styleUrls: ['./debtors-monthly.component.css']
})
export class DebtorsMonthlyComponent implements OnInit {

  principal = true
  sendingData = 0

  

  public notifications = {
    on: false,
    viewDebtors: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
    debtors: undefined,
  };
  constructor(
    private router: Router, 
    private _http: ReceiptService,
    private not: NotificationService
  ) { 

    router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {           
        if(event.url == "/receipt/deudores") 
          this.principal = true                                  
        else 
        this.principal = false
    })

    this.getDebtors();

  }

  ngOnInit() {
  }

  getDebtors() {
    
      this.sendingData++;
  
      this._http.getReceiptAnalisis({data: 1}).then(
  
        data => {
  
          if(data.count > 0)                              
  
          this.notifications.debtorsMonthly = data.count;
          this.notifications.debtors = data.users;
  
        },
  
        error => this.not.sendError(error),
  
      ).then(
  
        () => this.sendingData--,
  
      );
    
  }

}
