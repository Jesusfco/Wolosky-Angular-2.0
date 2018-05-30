import { Component, OnInit } from '@angular/core';
import { SaleDebt } from '../classes/sale-debt';
import { SaleDebtService } from './sale-debt.service';
import { Storage } from '../classes/storage';

@Component({
  selector: 'app-sale-debt',
  templateUrl: './sale-debt.component.html',
  styleUrls: ['./sale-debt.component.css']
})
export class SaleDebtComponent implements OnInit {

  public debtors: Array<SaleDebt> = [];
  public request: boolean = false;
  public storage: Storage = new Storage();
  public search: any  = {
    from: null,
    to: null,
    items: 20,
    page: 1,
    total: 0,
    name: "",
    id: null
  };
  public sugests = [];
  public timer = 0;

  constructor(private _http: SaleDebtService) { 
    this.getDates();
    this.get();

  }

  ngOnInit() {
  }

  get() {

    let form = false;
    for(let x of this.sugests){

      if(this.search.name == x.name) {
        this.search.id = x.id;
        form = true;
        break;
      }

    }
    if(form === false) { this.search.id = undefined; }

    this.request = true;
    this._http.getDebtors(this.search).then(
      data => {
        this.debtors = data.data;
        this.search.total = data.total;
      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request = false
    );

  }

  searchInput(key){

    if(key.keyCode >=37 && key.keyCode <= 40 || key.keyCode == 13) return;

    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){        
        this.request = true;
        this._http.sugestUsers({search: this.search.name}).then(
          data => {
            this.sugests = data;
          }, error => console.log(error)
        ).then(
          () => this.request = false,
        );
      } 

    }, 350);
  }

  searchReceiptId(id){
    this.search.id = id;
    this.get();
  }

  pageAction(data){
    
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.get();

  }

  getDates(){
    let d = new Date();

    if(d.getMonth() <= 7){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-0" + (d.getMonth() + 2 ) + "-" + "01";
    } else if (d.getMonth() == 8){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    } else {
      this.search.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + "01";
      this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    }

  }

  update(debt) {
    debt.updating = true;
    this._http.updateDebt(debt).then(
      data => {

        debt.status = data.status;

      },

      error => localStorage.setItem('request', JSON.stringify(error))

    ).then(

      () =>  debt.updating = false

    );
  }

  delete(debt) {

    debt.updating = true;

    this._http.deleteDebt(debt).then(
      data => {
        this.search.total -= 1;

        for(let i = 0; i < this.debtors.length; i++) {

          if(this.debtors[i].id == debt.id) {
            
            setTimeout(() => {
              this.debtors.splice(i, 1);
            }, 100);
            
            break;

          }

        }

      },

      error =>  localStorage.setItem('request', JSON.stringify(error))

    ).then(

      () =>  debt.updating = false

    );
  }

}
