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
          if(event.url == "/users") {
            this.principal = true
            this.users = []
            this.searchRequest()
          }
          else this.principal = false            
      }); 

  }

  ngOnInit() {   
  }

  ngOnDestroy() {
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
