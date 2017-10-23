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

  constructor(private _http: UserService) { }

  ngOnInit() {

    this.users = this._http.getUser();

    console.log(this.users);
  }

  createViewShow(){
    this.createView = !this.createView;
  }

}
