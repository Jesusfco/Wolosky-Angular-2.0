import { User } from './classes/user';
import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { LoginService } from './services/login.service';
import { Storage } from './classes/storage';
import { Router } from '@angular/router';
import { LogoPop, BackgroundLogo } from './animations/initial.animation';
import { Product } from './classes/product';
import { CashboxHistory } from './classes/cashbox-history';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [LogoPop, BackgroundLogo]
})
export class AppComponent {

  stateLoaderImg: string = "initial";
  stateLoader: string = "initial";
  public webCharger = 0;
  
  localData: Storage = new Storage();
  
  loginObserverInterval: any;

  constructor(
    private _http: LoginService,
    private router: Router
  ){}

  ngOnInit(){

    this.webChargerLogic();

    if(this.webCharger == 0) {

      //ANIMACION
      setTimeout(() => {  
        this.loaderAnimationImg();
        
        setTimeout(() => {

          this.loaderAnimation();

        }, 1000);

      }, 100);
    }
    

    if(this.localData.getToken() != undefined ){ 
        // console.log(this.localData.getToken());
        this.checkLogin();
        return;
      }

    this.router.navigate(['/login']);

  }

  checkLogin(){
    this._http.checkAuth().then(
      data => {

        User.storageAuthUser(data.user)        
        Storage.storageCash(data.cash);
        CashboxHistory.storeLastHistory(data.cash_history_last)
        Product.storageInventory(data.products);
        
        this._http.sendData('auth', data.user)
        
        if(this.router.url == '/login') {          
          this.router.navigate(['/users']);
        }

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

  

  setloginObserverInterval(){
    this.loginObserverInterval = setInterval(() => this.loginObserverLogic(), 1000);
  }

  loginObserverLogic() {
    
    let login = parseInt(localStorage.getItem('login'));

    if(login == -1 || login == 2) return;

    if(login == 0) {
      // this.clearAllIntervalApplication();
      localStorage.setItem('login', '-1');
    }

    else if(login == 1) {
      // this.restoreAllIntervalApplication();
      localStorage.setItem('login', '2');
    }

  }

  webChargerLogic() {
    if(localStorage.getItem('webCharger') == undefined) {

      localStorage.setItem('webCharger', '10');

    } else if (parseInt(localStorage.getItem('webCharger')) == 0) {

      localStorage.setItem('webCharger', '10');

    } else {
      
      let x = parseInt(localStorage.getItem('webCharger'));
      x = x - 1;
      this.webCharger = x;

      localStorage.setItem('webCharger', x.toString());
    }
  }

}
