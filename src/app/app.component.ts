import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userSignin:boolean = false;
  localData: Storage = new Storage();

  constructor(private loginService: LoginService){}

  ngOnInit(){
    if(this.localData.token == null || this.localData.token == '') this.userSignin = false;

    else {
      
      this.loginService.checkAuth().then(
        data => {          
          
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userEmail', data.user.email);                    
          localStorage.setItem('userType', data.user.type);          
                    
          setTimeout(this.appView(),5000);
          
        },
        error =>  {
          console.log(error);
          this.userSignin = false;
        }
      );

    }
  }

  appView(){
    this.userSignin = !this.userSignin;
  }
}
