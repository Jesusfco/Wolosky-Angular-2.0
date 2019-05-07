import { Focus } from './../../utils/classes/focus';
import { NotificationService } from './../../notification/notification.service';
import { LoginService } from './../login.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../classes/user';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.sass']
})
export class RecoverComponent implements OnInit {

  user: User = new User();
  code = ''
  request = 0
  div = 1
  badCode = false
  attemps = 0
  badPassword = false

  constructor(private _http: LoginService, private router: Router, private not: NotificationService) { }

  ngOnInit() {
    Focus.elementById('select')
  }

  validateToken() {

    this.request++
    this._http.validateResetToken({token: this.code}).then(
    data => {
                
        
        if(data) {
          this.div++
          Focus.elementById('select')
        } else {
          this.attemps++
          this.badCode = true
          if(this.attemps >= 3) {
            this.div = 0
          }
        }                
        

      }, error => {
        this.not.sendError(error)
      }
    ).then(() => this.request--);    

  }

  resetPassword() {
    if(this.user.password.length < 5) {
      this.badPassword
      return
    }

    this.request++
    this._http.setPassword({token: this.code, password: this.user.password}).then(
    data => {
          this.div++                
      }, error => {
        this.not.sendError(error)
      }
    ).then(() => this.request--);    

  }

}
