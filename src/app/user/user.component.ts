import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router, NavigationEnd } from '@angular/router';
import {PageEvent} from '@angular/material';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  principal = true;

  users: Array<any> = [];
  search = {
    searchWord: '',
    items: 10,
    page: 1,
    total: 0,
  };

  public sendingData: Boolean = false;
  
  pageEvent: PageEvent;

  timer = 0;

  public interval: any = 0;

  idShowUser: number = null;
  showUserView: boolean = false;

  constructor(private _http: UserService, private router: Router) { 

    router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => { 
          console.log(event.url)
          if(event.url == "/users") this.principal = true
          else this.principal = false            
      }); 

  }

  ngOnInit() {

   this.searchRequest();
    
  }
  

  pageAction(data){
    
    this.search.items = data.pageSize;
    this.search.page = data.pageIndex + 1;
    this.searchRequest();
  }

  searchInput(){
    this.timer++;    

    setTimeout(() => {      
      this.timer--;      
    }, 300);

    setTimeout(() => {
      if(this.timer == 0){        
        this.searchRequest();
      } 
    }, 350);
  }

  searchRequest(){
    this.sendingData = true;

    this._http.search(this.search).then(
      data => {
        this.users = data.data;
        this.search.total = data.total;
      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData = false
    );
  }

  selectUser(id){
    this.idShowUser= id;
    this.showUserView = true;
  }

  redirectCreateUser(){
    this.router.navigate(['/users/create']);
    localStorage.setItem('userCreationStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic(), 1000);
  }

  intervalSaleLogic(){
  
    if(localStorage.getItem('userCreationStatus') == undefined){

      this.searchRequest();
      clearInterval(this.interval);

    } else if(localStorage.getItem('userCreationStatus') == '0'){

      clearInterval(this.interval);

    }
    
  }

  

  

}
