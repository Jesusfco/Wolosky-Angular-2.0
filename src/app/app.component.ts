import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';
import { Router } from '@angular/router';

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
  
  localData: Storage = new Storage();

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  ngOnInit(){

    setTimeout(() => {      
      this.loaderAnimationImg();        
    }, 100);

    if(this.localData.token == null || this.localData.token == ''){ 
      this.router.navigate(['/login']);

      setTimeout(() => {
        
        this.loaderAnimation();        
      }, 1000);

      // console.log('aqui');
    } else {
      
      setTimeout(() => {
        
        this.loaderAnimation();        
      }, 1000);

      this.loginService.checkAuth().then(
        data => {                    
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userEmail', data.user.email);                    
          localStorage.setItem('userType', data.user.userTypeId);     
              
          if(this.router.url == '/') this.router.navigate(['/users']);
              
        },
        error =>  {
          localStorage.setItem('token', '');
          console.log(error);
          this.router.navigate(['/login']);
        }
      );

    }
  }
  

  loaderAnimationImg(){
    this.stateLoaderImg = (this.stateLoaderImg === 'initial' ? 'final' : 'initial');
  }
  loaderAnimation(){
    this.stateLoader = (this.stateLoader === 'initial' ? 'final' : 'initial');
  }
}
