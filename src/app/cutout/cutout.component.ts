import { Component, OnInit } from '@angular/core';
import { CutoutService } from './cutout.service';
import { Storage } from '../classes/storage';

@Component({
  selector: 'app-cutout',
  templateUrl: './cutout.component.html',
  styleUrls: ['./cutout.component.css']
})
export class CutoutComponent implements OnInit {

  public storage: Storage = new Storage();
  public cutout: any = {
    caja: 0,
    receipts: 0,
    inventory: 0,
  };

  public recibos = [];
  public showTable = false;
  public sendingData:boolean = false;

  public caja: number = 0;

  constructor(private _http: CutoutService) {

    this.cutout.caja = this.storage.getCash();
    this.caja = parseInt(this.storage.getCash());
    this.sendingData = true;

    _http.getCutout().then(
      data => {
        this.cutout.receipts = data.receipts;
        this.cutout.inventory = data.inventory;
        this.recibos = data.recibos;
      }
    ).then(
      () => this.sendingData = false
    );

  }

  ngOnInit() {
  }

  updateMoney(){

    this.sendingData = true;

    this._http.updateCash({cash: this.caja}).then(
      data => {
        this.storage.setCash(this.caja);
        this.cutout.caja = this.caja;
      },
      error => alert('no se pudo actualizar')
    ).then(
      () => this.sendingData = false
    );
    
  }

}
