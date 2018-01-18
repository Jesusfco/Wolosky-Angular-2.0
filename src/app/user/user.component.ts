import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<any> = [];
  
  searchWord: string = "";
  timer = {
    search: 0
  }

  public interval: any = 0;

  idShowUser: number = null;
  showUserView: boolean = false;

  constructor(private _http: UserService, private router: Router) { }

  ngOnInit() {

   this.search();
    
  }
  

  searchInput(){
    this.timer.search++;    

    setTimeout(() => {      
      this.timer.search--;      
    }, 300);

    setTimeout(() => {
      if(this.timer.search == 0){        
        this.search();
      } 
    }, 350);
  }

  search(){

    this._http.search(this.searchWord).then(
      data => {
        this.users = data;        
      },
      error =>  console.log(error)
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
    console.log('intervalo');
    if(localStorage.getItem('userCreationStatus') == undefined){
      this.search();
      clearInterval(this.interval);
    } else if(localStorage.getItem('userCreationStatus') == '0'){
      clearInterval(this.interval);
    }
  }

  

  

}
