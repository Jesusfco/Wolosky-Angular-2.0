import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { NotificationService } from '../../notification/notification.service';
import { User } from '../../classes/user';
import { MyCarbon } from '../../utils/classes/my-carbon';

@Component({
  selector: 'app-debtors-monthly',
  templateUrl: './debtors-monthly.component.html',
  styleUrls: ['./debtors-monthly.component.css']
})
export class DebtorsMonthlyComponent implements OnInit {

  principal = true
  sendingData = 0

  months = MyCarbon.getMonthsArrayForOptions()

  search = {
    month: MyCarbon.getMonth(),
    year: MyCarbon.getYear(),
    deptors: 1,
    name: ''
  }
  pendUsers: Array<User> = []
  regularUsers: Array<User> = []
  
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
  
      this._http.getReceiptAnalisis(this.search).then(
  
        data => {
          this.pendUsers = User.convertToArray(data.pendUsers)
          this.regularUsers = User.convertToArray(data.regularUsers)   
          console.log(data)                   
        },
  
        error => this.not.sendError(error),
  
      ).then(
  
        () => this.sendingData--,
  
      );
    
  }

}
