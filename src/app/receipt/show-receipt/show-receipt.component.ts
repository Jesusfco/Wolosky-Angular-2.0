import { MyCarbon } from './../../utils/classes/my-carbon';
import { Card, BackgroundCard } from './../../animations/card.animation';
import { Component, OnInit } from '@angular/core';
import { Receipt } from '../../classes/receipt';
import { Storage } from '../../classes/storage';
import { ReceiptService } from '../../services/receipt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';
import { CashboxHistory } from '../../classes/cashbox-history';

@Component({
  selector: 'app-show-receipt',
  templateUrl: './show-receipt.component.html',
  styleUrls: ['./show-receipt.component.css'],
  animations: [ Card, BackgroundCard]
})
export class ShowReceiptComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public months = MyCarbon.getMonthsArrayForOptions();

  public window = 1;
  private observerRef: any;
  public request: boolean = false;
  public receipt: Receipt = new Receipt();
  public storage: Storage = new Storage();

  constructor(private _http: ReceiptService, 
    private router: Router, 
    private actRou: ActivatedRoute,
    private notificationService: NotificationService ) { 

    this.observerRef = actRou.params.subscribe(params => {
      this.receipt.id = params['id'];
      this.getReceipt();
    });

  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }  

  editWindow() {
    this.window = 1
  }

  printReceipt(){  
    window.print();      
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/receipt']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  delete() {
    this.request = true;    
    this._http.deleteReceipt(this.receipt).then(
    
      data => {

        this._http.sendData('delete', this.receipt);
        CashboxHistory.decrementIfInLastCash(this.receipt)
        this.notificationService.sendNotification('Recibo Eliminado', 'Los datos han sido actualizado correctamente', 2500);
        this.closePop();

      }, error => this.notificationService.sendData(error)

      ).then(

        () => this.request = false

      );
  }

  getReceipt(){

    this.request = true;

    this._http.showReceipt(this.receipt).then(
      data => this.receipt.setData(data), 
      error => this.notificationService.sendData(error)

    ).then(

      () => this.request = false

    );
  }

  deleteWindow() {
    if(this.window == 2)
      this.window = 1
    else this.window = 2;
   
  }
}
