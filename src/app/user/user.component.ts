import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<any> = [];
  createView: boolean =  false;
  searchWord: string = "";
  timer = {
    search: 0
  }

  idShowUser: number = null;
  showUserView: boolean = false;

  constructor(private _http: UserService) { }

  ngOnInit() {

   this.search();
    
  }

  createViewShow(){
    this.createView = !this.createView;
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

  

}
