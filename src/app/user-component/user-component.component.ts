import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
// import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';




@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  users: Array<any> = [];  
  
  constructor(private _httpService: UserService) {
    this._httpService.getUsers().then(
      data => { 

        this.users = data;
        console.log("Esto son los usuarios");
        console.log(this.users);
      
      },
      error => console.log(error),
    );
  }

    ngOnInit() {
      
    }


    delete(user: User) {

    }
    
}