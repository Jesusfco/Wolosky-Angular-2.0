import { Component, OnInit } from '@angular/core';
import { ReceiptService } from './receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public notificacionts = {
    on: false,
    debtorsMonthly: 0,
    debtorsInscription: 0,
  }

  constructor(private _http: ReceiptService ) { 
    console.log(this._http.getReceiptAnalisis());
  }

  ngOnInit() {
  }

}
