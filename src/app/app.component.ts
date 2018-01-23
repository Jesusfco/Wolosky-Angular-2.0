import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './login/login.service';
import { Storage } from './storage';
import { Router } from '@angular/router';
import { LogoPop, BackgroundLogo } from './animations/initial.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [LogoPop, BackgroundLogo]
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

    //INICIA LA ANIMACION DE ENTRADA
    setTimeout(() => {  
      this.loaderAnimationImg();
      //APAGA LA ANIMACION
      setTimeout(() => {
        this.loaderAnimation();
      }, 1000);

      if(this.localData.getToken() != undefined ){ 
        // console.log(this.localData.getToken());
        this.checkLogin();
        return;
      }

      
    }, 100);

    this.router.navigate(['/login']);

  }

  checkLogin(){
    this.loginService.checkAuth().then(
      data => {

        this.localData.storageUserData(data.user);
        
        if(this.router.url == '/login') 
          this.router.navigate(['/users']);
      },
      error =>  {
        localStorage.removeItem('token');
        console.log(error);

      }
    );
  }

  loaderAnimationImg(){
    this.stateLoaderImg = (this.stateLoaderImg === 'initial' ? 'final' : 'initial');
  }
  loaderAnimation(){
    this.stateLoader = (this.stateLoader === 'initial' ? 'final' : 'initial');
  }
}
