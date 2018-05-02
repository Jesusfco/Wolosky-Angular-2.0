import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../../classes/expense';
import { ExpenseService } from '../expense.service';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Cash } from '../../classes/cash';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CreateExpenseComponent implements OnInit {

  public expense: Expense;
  public request: boolean = false;
  public cash: Cash = new Cash();

  public validation: any = {
    form: true,
    name: undefined,
    amount: undefined,
  };

  public state = {
    background: 'initial',
    card: 'initial',
  };

  constructor(private _http: ExpenseService, private router: Router) { 

    this.expense = new Expense(undefined,undefined, "", "", 0, undefined, undefined);
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  ngOnInit() {
  }

  ngOnDestroy(){

    if(localStorage.getItem('expenseCreateStatus') == undefined) return;
    localStorage.setItem('expenseCreateStatus', '1');
    
  }

  send(){
    this.validateForm();
    if(this.validation.form == false) return;

    this.request = true;

    this._http.createExpense(this.expense).then(
      data => {
        
        if(this.expense.updateCash)
          this.cash.substractCash(this.expense.$amount);

        this.router.navigate(['/expenses']);
        localStorage.removeItem('expenseCreateStatus');
      },


      error => console.log(error)
    ).then(

      () => this.request = false

    );
  }

  retoreseValidation(){

    this.validation = {
      form: true,
      name: undefined,
      amount: undefined,
    };

  }

  validateForm() {

    this.retoreseValidation();

    if(this.expense.$name.length <= 7){
      this.validation.form = false;
      this.validation.name = 1;
    }

    if(this.expense.$amount <= 0) {
      this.validation.form = false;
      this.validation.amount = 1;
    }
  }
  
  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/expenses']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }


}
