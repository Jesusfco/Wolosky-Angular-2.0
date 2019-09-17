import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Product } from '../classes/product';
import { Storage } from '../classes/storage';
import { FilterInventoryPipe } from '../pipes/filter-inventory.pipe';
import { PageEvent } from '@angular/material';
import { Url } from '../classes/url';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  
})
export class InventoryComponent implements OnInit {

  products = [];
  backProducts = [];
  searchProducts = [];
  search: string = '';
  createPro: boolean =  false;
  storage: Storage = new Storage();
  url: Url = new Url();

  lenghtArrayOptions: Array<number> = [ 10, 25, 50, 100, 200 ];
  pageOption: Array<number> = [];

  pageEvent: PageEvent;
  pageValue = 
    {pageIndex: 1, pageSize: 25, length: this.countProduct() };
  

  bucle: boolean = true;

  intervalUpdate: any;
  intervalCreate: any;

  constructor(private _http: InventoryService) { }

  ngOnInit() {
    this.backProducts = this.storage.getInventory();
    this.searchProducts = this.backProducts;
    
    for(let x = 0; x < 25; x ++){
      if(x == Object.keys(this.searchProducts).length) { break;}
      this.products.push(this.searchProducts[x]);
    }
    // setInterval(() => this.refreshInventoryFromlocalStore(), 1500);
  }

  testPage($event){
    
    this.pageEvent = $event;
    let page =  this.pageEvent.pageIndex;
    let items = this.pageEvent.pageSize;
    
    this.products = [];

    for(let x = 0; x < items; x ++){
      if(x + (page * items) == Object.keys(this.searchProducts).length) { break;}
      this.products.push(this.searchProducts[x + (page * items)]);
    }
    

  }

  countProduct(){
    if(this.products == undefined) { return 0;}
    else {

        return Object.keys(this.searchProducts).length;


    }
  }

  nextPage(){
    console.log('siguiente pagina');
  }

  newProduct(data){
      // console.log(data);
      this.backProducts.push(data);
      this.refreshTable();
  }

  update(data){
    for(let i = 0; i < Object.keys(this.backProducts).length; i++){
      if(this.backProducts[i].id == data.original.id){
        this.backProducts[i] = data.edited;
        break;
      }
    }

    this.refreshTable();

  }

  delete(id){
    for(let x = 0; x < Object.keys(this.products).length; x++){
      if(this.products[x].id == id){
        this.products.splice(x, 1);
          break;
      }
    }

    this.refreshTable();
  }

  refreshInventoryFromlocalStore(){
    if(this.bucle == true)
      this.products = this.storage.getInventory();
  }

  updateObservable(){
    localStorage.setItem('inventoryUpdateStatus', '1');
    this.intervalUpdate = setInterval(() => this.updateIntervalLogic(), 1000);
  }

  updateIntervalLogic(){
    if(localStorage.getItem('inventoryUpdateStatus') == undefined){
      
      this.update(JSON.parse(localStorage.getItem('productUpdated')));
      localStorage.removeItem('productUpdated');
      clearInterval(this.intervalUpdate);

    } else if(localStorage.getItem('inventoryUpdateStatus') == '0'){
      
      clearInterval(this.intervalUpdate);
      localStorage.removeItem('inventoryUpdateStatus');

    } else if(localStorage.getItem('inventoryUpdateStatus') == '2'){
      this.delete(parseInt(localStorage.getItem('productUpdated')));
      localStorage.removeItem('productUpdated');
      localStorage.removeItem('inventoryUpdateStatus');
      clearInterval(this.intervalUpdate);
    }

    
  }

  createObservable(){
    localStorage.setItem('inventoryCreateStatus', '1');
    this.intervalCreate = setInterval(() => this.createIntervalLogic(), 1000);
  }

  createIntervalLogic(){
    
    if(localStorage.getItem('inventoryCreateStatus') == undefined){
      this.newProduct(JSON.parse(localStorage.getItem('productCreated')));
      localStorage.removeItem('productCreated');
      clearInterval(this.intervalCreate);
      localStorage.removeItem('inventoryCreateStatus');
    } else if(localStorage.getItem('inventoryCreateStatus') == '0'){
      clearInterval(this.intervalCreate);
      localStorage.removeItem('inventoryCreateStatus');
    }

    
  }

  asssignValuesBackProducts(){

    this.products = [];

    if(this.pageEvent == undefined){
    
      for(let x = 0; x < 25; x ++){
        if(x == Object.keys(this.searchProducts).length) { break;}
        this.products.push(this.searchProducts[x]);
      }

    } else {
      
      for(let x = 0; x < this.pageEvent.pageSize; x ++){
        if(x + (this.pageEvent.pageIndex * this.pageEvent.pageSize) == Object.keys(this.searchProducts).length) { break;}
        this.products.push(this.searchProducts[x + (this.pageEvent.pageIndex * this.pageEvent.pageSize)]);
      }

    }
  }

  refreshTable(){   
    this.asssignValuesBackProducts();
    
  }

  searchWriting(){
    if(this.pageEvent != undefined){
      this.pageEvent.pageIndex = 0;
    }
    
    this.searchProducts = this.searchFilter();
    this.asssignValuesBackProducts();
  }

  searchFilter(){
    this.searchProducts = this.backProducts;
    let busqueda = this.search;
    if(this.search === undefined) return this.searchProducts;

    

    return this.searchProducts.filter(function(product){
      if(product.code != undefined && product.department != undefined)
      return (product.name.includes(busqueda.toUpperCase()) || product.code.includes(busqueda) || product.department.includes(busqueda.toUpperCase()));

      else if( product.code != undefined && product.department == undefined)
      return (product.name.includes(busqueda.toUpperCase()) || product.code.includes(busqueda));

      else if( product.code == undefined && product.department != undefined)
      return (product.name.includes(busqueda.toUpperCase()) || product.department.toUpperCase().includes(busqueda.toUpperCase()));

      else if( product.code == undefined && product.department == undefined)
      return (product.name.includes(busqueda.toUpperCase()));
    });
  }

  sortDepartment(){
    this.searchProducts.sort((a, b) => {

      if(a.department != undefined) a.department.toUpperCase();
      if(b.department != undefined) b.department.toUpperCase();

      if(a.department < b.department){
        return -1;
      } else if (a.department > b.department){
        return 1;
      } else if(a.department == ''){
        return 1;
      }else {
        return 0;
      }
    });

    this.refreshTable();
  }

  sortName(){
    this.searchProducts.sort((a, b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name){
        return 1;
      } else {
        return 0;
      }
    });
    this.refreshTable();
  }

  sortPrice(){
    this.searchProducts.sort((a, b) => {
      if(a.price < b.price){
        return -1;
      } else if (a.price > b.price){
        return 1;
      } else {
        return 0;
      }
    });

    this.refreshTable();
  }

  sortStock(){
    this.searchProducts.sort((a, b) => {
      if(a.stock < b.stock){
        return -1;
      } else if (a.stock > b.stock){
        return 1;
      } else {
        return 0;
      }
    });

    
    this.refreshTable();
  }

  sortCode(){
    this.searchProducts.sort((a, b) => {
      if(a.code < b.code){
        return -1;
      } else if (a.code > b.code){
        return 1;
      } else {
        return 0;
      }
    });
    this.refreshTable();
  }

}
