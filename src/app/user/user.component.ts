import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
    //FILTRADO
    active : true,
    inactive: true,
    typeA: true,
    typeT : true,
    typeO: true,
    genderM: true,
    genderF: true,
    age1: null,
    age2: null,
    hours1: null,
    hours2: null,
  };

  sendingData = 0;
  request
  
  pageEvent: PageEvent;

  timer = 0;

  public interval: any = 0;

  idShowUser: number = null;
  showUserView: boolean = false;

  constructor(private _http: UserService, private router: Router) { 

    router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => {           
          if(event.url == "/users" || event.url == "/users/filter") {
            this.principal = true            
            this.searchRequest()
          }
          else this.principal = false            
      }); 

      _http.getData().subscribe(x => {
        if(x.action == 'FILTER') {

          this.search.active = x.data.active
          this.search.inactive = x.data.inactive
          this.search.typeA = x.data.typeA
          this.search.typeT = x.data.typeT
          this.search.typeO = x.data.typeO
          this.search.genderM = x.data.genderM
          this.search.genderF = x.data.genderF
          this.search.age1 = x.data.age1
          this.search.age2 = x.data.age2
          this.search.hours1 = x.data.hours1
          this.search.hours2 = x.data.hours2
         
        }
      })

  }

  ngOnInit() {   
  }

  sendFilter(){
    this._http.sendData('LAST_FILTER', this.search)
  }

  ngOnDestroy() {
    if(this.request != null)
      if(!this.request.closed) 
        this.request.unsubscribe()    
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
    if(this.request != null) {    
      if(!this.request.closed) {
        this.request.unsubscribe()    
        this.sendingData--
      }            
    }

    this.sendingData ++;

    this.request = this._http.search(this.search).subscribe(
      data => {
        this.users = data.data;
        this.search.total = data.total;
      },
      error => localStorage.setItem('request', JSON.stringify(error)),
      () => this.sendingData --  
    )
  }

  selectUser(id){
    this.idShowUser= id;
    this.showUserView = true;
  }

}
