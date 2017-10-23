import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('loaderImg', [
      
      state('initial', style({
        transform: 'translate3d(0,80%,0) scale(.7)',        
        opacity: 0
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',       
        opacity: 1
      })),      

      transition('initial <=> final' , animate('1000ms ease-out')),
    ]),

    trigger('loader', [
      
      state('initial', style({        
        opacity: 1
      })),

      state('final' ,style({
        display: 'none',       
        opacity: 0
      })),      

      transition('initial <=> final' , animate('500ms ease-out')),
    ])

  ]
})
export class AppComponent {

  stateLoaderImg: string = "initial";
  stateLoader: string = "initial";

  userSignin:boolean = false;
  localData: Storage = new Storage();

  constructor(private loginService: LoginService){}

  ngOnInit(){

    setTimeout(() => {
      
      this.loaderAnimationImg();        
    }, 100);

    if(this.localData.token == null || this.localData.token == ''){ 
      this.userSignin = false;
    }

    else {
      
      setTimeout(() => {
        this.userSignin = true;
        this.loaderAnimation();        
      }, 1000);

      // this.loginService.checkAuth().then(
      //   data => {          
          
      //     localStorage.setItem('userName', data.user.name);
      //     localStorage.setItem('userId', data.user.id);
      //     localStorage.setItem('userEmail', data.user.email);                    
      //     localStorage.setItem('userType', data.user.type);          
                    
      //     setTimeout(this.appView(),5000);
          
      //   },
      //   error =>  {
      //     console.log(error);
      //     this.userSignin = false;
      //   }
      // );

    }
  }

  appView(){
    this.userSignin = !this.userSignin;
  }

  loaderAnimationImg(){
    this.stateLoaderImg = (this.stateLoaderImg === 'initial' ? 'final' : 'initial');
  }
  loaderAnimation(){
    this.stateLoader = (this.stateLoader === 'initial' ? 'final' : 'initial');
  }
}
