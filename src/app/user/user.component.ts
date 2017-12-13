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

    this._http.get().then(
      data => {
        this.users = data;
        console.log("Usuarios:");
        console.log(data);
      },
      error =>  console.log(error)
    );

    console.log(this.users);
  }

  createViewShow(){
    this.createView = !this.createView;
  }

}
