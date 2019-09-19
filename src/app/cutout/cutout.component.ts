import { Component, OnInit } from '@angular/core';
import { CutoutService } from '../services/cutout.service';
import { Storage } from '../classes/storage';
import { Receipt } from '../classes/receipt';
import { Expense } from '../classes/expense';
import { Cash } from '../classes/cash';
import { NotificationService } from '../notification/notification.service';
import { CashboxHistory } from '../classes/cashbox-history';

@Component({
  selector: 'app-cutout',
  templateUrl: './cutout.component.html',
  styleUrls: ['./cutout.component.css']
})
export class CutoutComponent implements OnInit {

  public storage: Storage = new Storage();
  public cutout: any = {
    expenses: 0,
    receipts: 0,    
  };

  receipts: Array<Receipt> = [];
  expenses: Array<Expense> = [];
  showTable1 = false;
  showTable2 = false;
  sendingData: boolean = false;

  cashbox: Cash = Cash.getCashbox();
  cashHistory: CashboxHistory = new CashboxHistory()

  constructor(
    private _http: CutoutService, 
    private notificatio: NotificationService
  ) {    
    
    this.sendingData = true;

    _http.getCutout().then(
      data => {
        if(data == false) return;
        this.receipts = Receipt.convertToArray(data.receipts);
        this.expenses = Expense.convertToArray(data.expenses);
        this.cutout.expenses = data.expenses_total
        this.cutout.receipts = data.receipts_total 
        this.cashHistory.setData(data.last_cut)       
      }
    ).then(
      () => this.sendingData = false
    );

  }

  ngOnInit() {
  }

  updateMoney(){

    this.sendingData = true;

    this._http.updateCash({cash: this.cashbox.amount}).then(
      data => {
        
      },
      error => alert('no se pudo actualizar')
    ).then(
      () => this.sendingData = false
    );
    
  }

}
