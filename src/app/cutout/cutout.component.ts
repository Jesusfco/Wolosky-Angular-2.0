import { Component, OnInit } from '@angular/core';
import { CutoutService } from '../services/cutout.service';
import { Storage } from '../classes/storage';
import { Receipt } from '../classes/receipt';
import { Expense } from '../classes/expense';
import { Cash } from '../classes/cash';
import { NotificationService } from '../notification/notification.service';
import { CashboxHistory } from '../classes/cashbox-history';
import { User } from '../classes/user';

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
  cashbox2: Cash = Cash.getCashbox();
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

        data.history.created_at = data.history.created_at.date
        this.cashHistory.setData(data.history)
        this.cashHistory.creator = User.authUser()
        CashboxHistory.storeLastHistory(this.cashHistory)

        Cash.setCash(this.cashbox.amount)

        this.notificatio.sendNotification(
          'Dinero en caja actualizado',
          'El recorte de caja ha concluido con exito', 5000
        )

        this.cashbox2 = Cash.getCashbox()
        this.receipts = []        
        this.expenses = []
        this.cutout = {
          expenses: 0,
          receipts: 0
        }
      },
      error => this.notificatio.sendError(error)
    ).then(
      () => this.sendingData = false
    );
    
  }

}
