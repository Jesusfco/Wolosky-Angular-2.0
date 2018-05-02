import { Component, OnInit } from '@angular/core';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { Expense } from '../../classes/expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css'],
  animations: [ Card, BackgroundCard]
})
export class UpdateExpenseComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public observerRef: any;
  public expense: Expense;

  public request: boolean = false;

  public validation: any = {
    form: true,
    name: undefined,
    amount: undefined,
  };

  constructor(private _http: ExpenseService,
    private router: Router,
    private actRou: ActivatedRoute) {

      this.expense = new Expense(undefined,undefined, "", "", 0, undefined, undefined);

      this.observerRef = actRou.params.subscribe(params => {
        this.expense.$id = params['id'];
        this.getExpense();
      });
     }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

  }

  getExpense(){
    this._http.showExpense(this.expense).then(
      
      data => {

        this.expense = new Expense(
              parseInt(data.id),
              data.creator_id,
              data.name,
              data.description,
              parseInt(data.amount),
              data.created_at,
              data.updated_at
            );

      },
      error => console.log(error)
    );
  }

  send(){
    this.validateForm();
    if(this.validation.form == false) return;

    this.request = true;

    this._http.updateExpense(this.expense).then(
      data => {
        this.closePop();
        localStorage.removeItem('expenseUpdateStatus');
      },


      error => console.log(error)
    ).then(

      () => this.request = false

    );
  }

  ngOnDestroy(){

    if(localStorage.getItem('expenseUpdateStatus') == undefined) return;
    localStorage.setItem('expenseUpdateStatus', '1');
    
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

  delete() {
    
    this.request = true;
    this._http.deleteExpense(this.expense).then(
      data => {
        this.router.navigate(['/expenses']);
        localStorage.removeItem('expenseUpdateStatus');
      },
      error => console.log(error)
    ).then(
      () => this.request = false
    );

  }
}
