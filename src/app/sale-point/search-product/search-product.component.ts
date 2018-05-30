import { Component, OnInit, HostListener } from '@angular/core';
import { Product } from '../../classes/product';
import { cardPop, backgroundOpacity} from '../../animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SearchProductComponent implements OnInit {

  public search: String = '';
  public sugests: Array<any> = [];
  public inventory: Array<Product> = [];
  public product: Product = null;

  public state = {
    background: 'initial',
    card: 'initial',
  };

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.closePop();
    }

  }

  constructor(private router: Router) {
    this.inventory = JSON.parse(localStorage.getItem('inventory'));
   }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
      document.getElementById('searchProductInput').focus();
    }, 5);

  }

  getSugest(event) {
    
    if(event == 38 || event == 40 || event == 13) return;

    if(this.search == null || this.search == '') {
      this.sugests = [];
      return;
    } else {

      let search = this.search;

      this.sugests = this.inventory.filter(function(product){

        return (product.name.includes(search.toUpperCase()));

      });
    }
    


  }

  identifyProduct() {

    if(this.search == '' || this.search == null) { return; }

    this.search = this.search.replace(/\s+$/, '');

    // this.restoreFormValue();

    this.sugests = [];

    for(let x of this.inventory){

      if(x.code == this.search || x.name.toUpperCase() == this.search.toUpperCase()){

        this.product = x;

        // this.restoreSearch();

        break;
      }
    }
    // this.sale.storageLocalSale();

  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['/sale-point']);
    }, 450);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

}
