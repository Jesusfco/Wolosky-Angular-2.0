import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity} from '../../animations';
import { WorkPaymentService } from '../work-payment.service';
import { Record } from '../../classes/record';
import { User } from '../../classes/user';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class PaymentCreateComponent implements OnInit {

  public sendingData: number = 0;
  public window = 1;
  public userSelect = 0;
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

  public periodOptions = [
    {from: null, to: null, value: 0},
    {from: null, to: null, value: 1},
  ];

  public records: Array<Record> = [];
  public users: Array<User> = [];
  public period = {
    month: null,
    option: 1,
    from: null,
    to: null,
  };

  public state = {
    background: 'initial',
    card: 'initial',
  }

  constructor(private _http: WorkPaymentService, private router: Router) { }

  ngOnInit() {
    
    let d = new Date();    
    this.period.month = d.getMonth() + 1;
    this.setPeriodsOption();

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 10);
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/pago-trabajadores']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  setPeriodsOption() {
    let d = new Date();
    this.periodOptions[0].from = d.getFullYear() + '-' + (this.period.month) + '-01';
    this.periodOptions[0].to = d.getFullYear() + '-' + (this.period.month) + '-15';

    let next = new Date(d.getFullYear(), this.period.month, 0);
    this.periodOptions[1].from = d.getFullYear() + '-' + (this.period.month) + '-16';
    this.periodOptions[1].to = d.getFullYear() + '-' + this.period.month + '-' + next.getDate();
    
  }

  setDataToProcess() {
    
    this.period.from = this.periodOptions[this.period.option].from;
    this.period.to = this.periodOptions[this.period.option].to;

    this.sendingData++;

    this._http.getDataToProcess(this.period).then(
      data => {
        this.window = 2;
        this.users = [];
        this.records = [];
        for(let record of data.records) {
          let object = new Record();
          object.setValues(record);
          this.records.push(object);
        }

        for(let user of data.users) {
          let object = new User();
          object.setValues(user);
          this.users.push(object);
        }

        console.log(this.users);

      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData--
    );


  }

}
