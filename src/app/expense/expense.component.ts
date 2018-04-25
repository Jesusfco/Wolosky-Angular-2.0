import { Component, OnInit } from '@angular/core';
import { Expense  } from '../expense';
import { PageEvent } from '@angular/material';
import { ExpenseService } from './expense.service';
import { Router } from '@angular/router';
import { ExpandSubscriber } from 'rxjs/operator/expand';
import { Storage } from '../storage';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  private expenses: Array<Expense> = [];
  private search: any  = {
    from: null,
    to: null,
    items: 20,
    page: 1,
    total: 0,
  };

  private request: boolean = false;
  private interval: any;
  private storage: Storage = new Storage();

  constructor(private _http: ExpenseService, private router: Router) {
      this.getDates();
      this.get();
   }

  ngOnInit() {
  }

  get() {
    
    this.request = true;

    this._http.getExpenses(this.search).then(

      data => {

        this.expenses = [];

        for(let x of data.data) {

          this.expenses.push( 
              new Expense (
                x.id, 
                x.creator_id, 
                x.name, 
                x.description, 
                x.amount, 
                x.created_at,
                x.updated_at
              )
          );

        } //end of for

        this.search.total = data.total;
        
      },
      
      error => console.log(error)
      
    ).then(

      () => this.request = false

    );
  }

  redirectCreate(){

    this.router.navigate(['/expenses/create']);
    localStorage.setItem('expenseCreateStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic(), 1000);

  }

  intervalSaleLogic(){
  
    if(localStorage.getItem('expenseCreateStatus') == undefined){

      this.get();
      clearInterval(this.interval);

    } else if(localStorage.getItem('expenseCreateStatus') == '0'){

      localStorage.removeItem('expenseCreateStatus');
      clearInterval(this.interval);

    }
    
  }

  updateStartObservable(){
    localStorage.setItem('expenseUpdateStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic2(), 1000);
  }

  intervalSaleLogic2(){
  
    if(localStorage.getItem('expenseUpdateStatus') == undefined){

      this.get();
      clearInterval(this.interval);

    } else if(localStorage.getItem('expenseUpdateStatus') == '0'){

      localStorage.removeItem('expenseUpdateStatus');
      clearInterval(this.interval);

    }
    
  }

  getDates(){
    let d = new Date();

    if(d.getMonth() <= 7){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-0" + (d.getMonth() + 2 ) + "-" + "01";
    } else if (d.getMonth() == 8){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    } else {
      this.search.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    }

  }

}
