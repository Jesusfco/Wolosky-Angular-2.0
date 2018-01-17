import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Storage } from '../storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('mail2') private mailRef: ElementRef;    
  // @ViewChild('password2') private passwordRef: ElementRef;    

  public ngAfterViewInit(): void {
    // this.data.email = localStorage.getItem('userEmail');
    
    // if(this.data.email == '' || this.data.email == null)      
      this.mailRef.nativeElement.focus();
    // this.passwordRef.nativeElement.focus();
  }

  data = {
    email: null,
    password: null
  };

  form = {
    email: 0,
    password: 0,
    validate: 0,
  };

  serverConection: boolean = false;

  constructor(
    private _http:  LoginService,
    private router: Router) { }
  
    ngOnInit() {
      
      

    }
    accesar() {
      this.restoreValidation();
      this.validateMail();
      this.validatePassword();
  
      if(this.form.validate == 1)  return;      
  
      this.serverConection = true;
      this._http.login(this.data).then(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userEmail', data.user.email);                    
          localStorage.setItem('userType', data.user.userTypeId); 
          
          this.router.navigate(['/users']);
          
        },
        error => {
          console.log(error);
          this.serverConection = false;
        }
      );
    }
    
    checkAuth() {
      this._http.checkAuth().then(
        data => console.log(data),
        error => console.log(error)
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
