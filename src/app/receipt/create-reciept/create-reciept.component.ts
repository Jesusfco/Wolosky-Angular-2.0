import { Component, OnInit } from '@angular/core';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceiptService } from '../receipt.service';

@Component({
  selector: 'app-create-reciept',
  templateUrl: './create-reciept.component.html',
  styleUrls: ['./create-reciept.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CreateRecieptComponent implements OnInit {

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

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public payment = {
    userName: '',
    type: 1,
    amount: 500,
    monthlyAmount: 0,
    month: undefined,
    days: 1,
  }

  constructor(private router: Router,
    private actRou: ActivatedRoute,
    private _http: ReceiptService) { }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/receipt']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

}
