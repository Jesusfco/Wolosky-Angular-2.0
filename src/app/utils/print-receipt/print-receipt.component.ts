
import { Receipt } from './../../classes/receipt';
import { Component, OnInit, Input } from '@angular/core';
import { Sale } from '../../classes/sale';


@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.sass']
})
export class PrintReceiptComponent implements OnInit {

  @Input() receipt: Receipt;
  @Input() sale: Sale;
  @Input() type: number;

  constructor() { }

  ngOnInit() {
  }

}
