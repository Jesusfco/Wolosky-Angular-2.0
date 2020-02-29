import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReceiptService } from '../../services/receipt.service';
import { NotificationService } from '../../notification/notification.service';
import { User } from '../../classes/user';
import { MyCarbon } from '../../utils/classes/my-carbon';
import { Storage } from '../../classes/storage';
import { Url } from '../../classes/url';

@Component({
  selector: 'app-debtors-monthly',
  templateUrl: './debtors-monthly.component.html',
  styleUrls: ['./debtors-monthly.component.css']
})
export class DebtorsMonthlyComponent implements OnInit {

  principal = true
  sendingData = 0
  public url: Url = new Url();

  months = MyCarbon.getMonthsArrayForOptions()

  search = {
    month: MyCarbon.getMonth(),
    year: MyCarbon.getYear(),
    deptors: 1,
    name: ''
  }
  pendUsers: Array<User> = []
  pendUsersBack: Array<User> = []
  regularUsers: Array<User> = []
  regularUsersBack: Array<User> = []
  
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
          this.pendUsersBack = User.convertToArray(data.pendUsers)
          this.regularUsersBack = User.convertToArray(data.regularUsers)   
          this.pendUsers = User.convertToArray(data.pendUsers)
          this.regularUsers = User.convertToArray(data.regularUsers)   
          this.search.name = '';                             
        },
  
        error => this.not.sendError(error),
  
      ).then(
  
        () => this.sendingData--,
  
      );
    
  }

  searchWriting(){
    if(this.search.deptors == 1)
      this.pendUsers = this.searchNameDeptors();
    else
      this.regularUsers = this.searchNameDeptors();
  }

  searchNameDeptors(){
        
    this.pendUsers = this.pendUsersBack;
    let busqueda = this.search.name.toUpperCase().trim();

    if(this.search === undefined) return this.pendUsers;    

    return this.pendUsers.filter(function(user){      
      return user.name.toUpperCase().includes( busqueda );      
    });
  }

  searchNameRegular(){
        
    this.regularUsers = this.regularUsersBack;
    let busqueda = this.search.name.toUpperCase().trim();

    if(this.search.name === undefined) return this.regularUsers;    

    return this.regularUsers.filter(function(user){      
      return user.name.toUpperCase().includes( busqueda );      
    });
  }

  pay(user){
    localStorage.setItem('userToPay', JSON.stringify(user))
    this.router.navigate(['/receipt/create'])
    // setTimeout(() => , 50)
    
  }
}
