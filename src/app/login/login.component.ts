import { Focus } from './../utils/classes/focus';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Storage } from '../classes/storage';
import { User } from '../classes/user';
import { CashboxHistory } from '../classes/cashbox-history';
import { Product } from '../classes/product';
import { NotificationService } from '../notification/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  data = {
    email: null,
    password: null
  };

  form = {
    email: 0,
    password: 0,
    validate: 0,
  };

  storage: Storage = new Storage();
  
  serverConection: boolean = false;

  constructor(
    private _http:  LoginService,
    private router: Router,
    private notification: NotificationService) { }
  
    ngOnInit() {
      
      Focus.elementById('select')

    }
    accesar() {
      this.restoreValidation();
      this.validateMail();
      this.validatePassword();
      
      if(this.form.validate == 1){
        if(this.form.email == 1) Focus.elementById('select')
        else Focus.elementById('select2')
        return;
      }      
  
      this.serverConection = true;
      this._http.login(this.data).then(
        data => {
          localStorage.setItem('token', data.token);
          User.storageAuthUser(data.user)        
          Storage.storageCash(data.cash);
          CashboxHistory.storeLastHistory(data.cash_history_last)
          Product.storageInventory(data.products);                    
          this._http.sendData('auth', data.user)
          this.router.navigate(['/users']);
          
        },
        error => {
          
          this.serverConection = false;
        }
      );
    }
  
    validateMail(){
      this.form.email = 0;
      if(this.data.email == null || this.data.email == '') {
        this.form.email = 1;
        this.form.validate = 1;
      }    
    }
  
    validatePassword(){
      this.form.password = 0;
      if(this.data.password == null || this.data.password == '') {
        this.form.password = 1;
        this.form.validate = 1;
      }
    }

    restoreValidation(){

      this.form = {
        email: 0,
        password: 0,
        validate: 0
      };

    }

}
