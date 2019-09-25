import { Component, OnInit } from '@angular/core';
import { Expense  } from '../classes/expense';
import { PageEvent } from '@angular/material';
import { ExpenseService } from '../services/expense.service';
import { Router, NavigationEnd } from '@angular/router';
//import { ExpandSubscriber } from 'rxjs/operator/expand';
import { Storage } from '../classes/storage';
import { MyCarbon } from '../utils/classes/my-carbon';
import { User } from '../classes/user';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public expenses: Array<Expense> = [];
  public search: any  = {
    from: null,
    to: null,
    items: 20,
    page: 1,
    total: 0,
  };

  public request: boolean = false;
  private interval: any;
  public storage: Storage = new Storage();

  public auth: User = User.authUser();

  constructor(
    private _http: ExpenseService, 
    private router: Router,
    private notification: NotificationService) {
      this.getDates();
      

      router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {           
        if(event.url == "/expenses") 
        this.get();
                  
    }); 
   }

  ngOnInit() {
  }

  get() {
    
    this.request = true;

    this._http.getExpenses(this.search).then(

      data => {

        this.expenses = Expense.convertToArray(data.data)        
        this.search.total = data.total;
        
      },
      
      error => this.notification.sendError(error)
      
    ).then(

      () => this.request = false

    );
  }

  pageAction(data){
    
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.get();
  }

  getDates(){
    if(this.auth.user_type_id >= 6) {
      this.search.from = MyCarbon.getFromToThisMonth().from
      this.search.to = MyCarbon.getFromToThisMonth().to
    }
    

    else {
      this.search.from = MyCarbon.todayDateInput()
      this.search.to = MyCarbon.todayDateInput()
    }
  }

}
