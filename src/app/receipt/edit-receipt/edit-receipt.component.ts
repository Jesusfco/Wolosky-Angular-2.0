import { Component, OnInit , OnDestroy, Input} from '@angular/core';
import { Receipt } from '../../classes/receipt';
import { Storage } from '../../classes/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { ReceiptService } from '../../services/receipt.service';
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

  @Input() receiptEdit: Receipt
  
  public request: boolean = false;
  
  public receipt: Receipt = new Receipt();
  

  constructor(private _http: ReceiptService, 
    
    private notificationService: NotificationService ) { 

    
  }

  ngOnInit() {
    
    Object.assign(this.receipt, this.receiptEdit)
    
  }  

  

  

  update(){

    this.request = true;    
    this._http.updateReceipt(this.receipt).then(
    
      data => {

        this.notificationService.sendNotification('Recibo Actualizado', 'Los datos han sido actualizado correctamente', 2500);
        this._http.sendData('update', this.receipt);
        

      }, error => this.notificationService.sendData(error)

      ).then(

        () => this.request = false

      );
    
  }

 
 
}
