import { Component, OnInit , OnDestroy} from '@angular/core';
import { Receipt } from '../../classes/receipt';
import { Storage } from '../../storage';
import { Router, ActivatedRoute } from '@angular/router';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { ReceiptService } from '../receipt.service';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.css'],
  animations: [ Card, BackgroundCard]
})
export class EditReceiptComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  private observerRef: any;
  private request: boolean = false;
  private receipt: Receipt = new Receipt();
  private storage: Storage = new Storage();

  constructor(private _http: ReceiptService, private router: Router, private actRou: ActivatedRoute ) { 

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

  ngOnDestroy() {
    if(localStorage.getItem('receiptUpdateStatus') == undefined) return;
    localStorage.setItem('receiptUpdateStatus', '1');
  }

  getReceipt(){

    this.request = true;

    this._http.showReceipt(this.receipt).then(
      data => {

        this.receipt.user_id = data.user_id;
        this.receipt.creator_id = data.creator_id;
        this.receipt.amount = data.amount;
        this.receipt.date = data.date;
        this.receipt.event_id = data.event_id;
        this.receipt.type = data.type;
        this.receipt.month = data.month;
        this.receipt.payment_type = data.payment_type;
        this.receipt.created_at = data.created_at;
        this.receipt.updated_at = data.updated_at;
        

      }, error => console.log(error)

    ).then(

      () => this.request = false

    );
  }

  update(){

    this.request = true;    
    this._http.updateReceipt(this.receipt).then(
    
      data => {

        localStorage.removeItem('receiptUpdateStatus');
        this.closePop();

      }, error => console.log(error)

      ).then(

        () => this.request = false

      );
    
  }

  delete() {
    this.request = true;    
    this._http.deleteReceipt(this.receipt).then(
    
      data => {

        localStorage.removeItem('receiptUpdateStatus');
        this.closePop();

      }, error => console.log(error)

      ).then(

        () => this.request = false

      );
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/receipt']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }
}
