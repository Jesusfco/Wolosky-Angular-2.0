import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { Router } from '@angular/router';
import { Card, BackgroundCard } from '../../animations/card.animation';
import { Storage } from '../../classes/storage';
import { timeout } from 'rxjs/operator/timeout';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.css'],
  animations: [ Card, BackgroundCard]
})
export class FilterUserComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public storage: Storage = new Storage();

  active = true;
  inactive;
  typeA = true;
  typeT = true;
  typeO = false;
  genderM = true;
  genderF = true;
  age1 = null;
  age2= null;
  hours1 = null;
  hours2 = null;


  validation = true;
  constructor(private router: Router, private _http: UserService) { 

    _http.getData().subscribe(x => {
      if(x.action == 'LAST_FILTER') {
        
        this.active = x.data.active
        this.inactive = x.data.inactive
        this.typeA = x.data.typeA
        this.typeT = x.data.typeT
        this.typeO = x.data.typeO
        this.genderM = x.data.genderM
        this.genderF = x.data.genderF
        this.age1 = x.data.age1
        this.age2 = x.data.age2
        this.hours1 = x.data.hours1
        this.hours2 = x.data.hours2
       
      }
    })

  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  

  closePop() {

    setTimeout(() => {

      this.router.navigate(['/users']);
        
    }, 450);

    setTimeout(() => {
      this.state.background = 'initial';
      this.state.card = 'initial';
    }, 100);
    
  }

  sendFilter() {
    this._http.sendData('FILTER', {
      active : this.active,
      inactive: this.inactive,
      typeA: this.typeA,
      typeT : this.typeT,
      typeO: this.typeO,
      genderM: this.genderM,
      genderF: this.genderF,
      age1: this.age1,
      age2: this.age2,
      hours1: this.hours1,
      hours2: this.hours2,
    })
  }

  validateFilter() {

    setTimeout(() => {

      this.validation = true;

      if(!this.genderM && !this.genderF)
        this.validation = false;

      if(!this.active && !this.inactive)
        this.validation = false;

      if(!this.typeA && !this.typeO && !this.typeT)
        this.validation = false;

      if((this.age1 != null && this.age2 == null) || (this.age1 == null && this.age2 != null) )
        this.validation = false;

      if((this.hours1 != null && this.hours2 == null) || (this.hours1 == null && this.hours2 != null))
        this.validation = false;

    },100);
    
  }

}
