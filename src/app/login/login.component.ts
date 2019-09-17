import { Focus } from './../utils/classes/focus';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Storage } from '../classes/storage';


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
    private router: Router) { }
  
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
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userEmail', data.user.email);                    
          localStorage.setItem('userType', data.user.user_type_id);
          
          localStorage.setItem('userCash', data.cash);

          this._http.getProducts().then(
            product => {
                this.storage.storageInventory(product);
            },
            error => localStorage.setItem('request', JSON.stringify(error))
          );
          
          this.router.navigate(['/users']);
          
        },
        error => {
          localStorage.setItem('request', JSON.stringify(error));
          this.serverConection = false;
        }
      );
    }
    
    checkAuth() {
      this._http.checkAuth().then(
        data => console.log(data),
        error => localStorage.setItem('request', JSON.stringify(error))
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
