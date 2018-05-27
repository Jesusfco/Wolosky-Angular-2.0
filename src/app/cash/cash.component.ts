import { Component, OnInit } from '@angular/core';
import { BackgroundCard, Card } from '../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';
// import { ReceiptService } from '../receipt.service';
import { Storage } from '../storage';
import { CashService } from './cash.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CashComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public sendingData: boolean = false;
  public caja: number;
  public storage: Storage = new Storage();

  constructor(private router: Router,
              private _http: CashService) { 
    this.caja = parseFloat(this.storage.getCash());
  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

    setTimeout(() => {
    
      document.getElementById('inputMoney').focus();

    }, 400);
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  updateMoney(){

    this.sendingData = true;

    this._http.updateCash({cash: this.caja}).then(
      data => {
        this.storage.setCash(this.caja);

        let noti = {
          status: 200,
          title: 'Dinero en Caja',
          description: 'Se ha actualizado el dinero en la base de datos'
        };

        localStorage.setItem('request', JSON.stringify(noti));
      },
      error => {
        localStorage.setItem('request', JSON.stringify(error));
      }
    ).then(
      () => this.sendingData = false
    );
    
  }

  detectEsc(x){
    if(x.keyCode == 27) {
      this.closePop();
    }
  }

}
