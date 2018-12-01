import { Component, OnInit , OnDestroy} from '@angular/core';
import { Receipt } from '../../classes/receipt';
import { Storage } from '../../classes/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { ReceiptService } from '../receipt.service';
import { NotificationService } from '../../notification/notification.service';

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

  public months = [
    {value: 1, view: 'Enero'},
    {value: 2, view: 'Febrero'},
    {value: 3, view: 'Marzo'},
    {value: 4, view: 'Abril'},
    {value: 5, view: 'Mayo'},
    {value: 6, view: 'Junio'},
    {value: 7, view: 'Julio'},
    {value: 8, view: 'Agosto'},
    {value: 9, view: 'Septiembre'},
    {value: 10, view: 'Octubre'},
    {value: 11, view: 'Noviembre'},
    {value: 12, view: 'Diciembre'},
  ];

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

  windowChange() {
    if(this.window == 1) {
      this.window = 2;
    } else {
      this.window = 1;
    }
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

  update(){

    this.request = true;    
    this._http.updateReceipt(this.receipt).then(
    
      data => {

        this.notificationService.sendNotification('Recibo Actualizado', 'Los datos han sido actualizado correctamente', 2500);
        this._http.sendData('update', this.receipt);
        this.closePop();

      }, error => this.notificationService.sendData(error)

      ).then(

        () => this.request = false

      );
    
  }

  delete() {
    this.request = true;    
    this._http.deleteReceipt(this.receipt).then(
    
      data => {

        this._http.sendData('delete', this.receipt);
        this.notificationService.sendNotification('Recibo Eliminado', 'Los datos han sido actualizado correctamente', 2500);
        this.closePop();

      }, error => this.notificationService.sendData(error)

      ).then(

        () => this.request = false

      );
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
}
