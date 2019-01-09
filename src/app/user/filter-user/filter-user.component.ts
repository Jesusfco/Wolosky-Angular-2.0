import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { Router } from '@angular/router';
import { Card, BackgroundCard } from '../../animations/card.animation';
import { Storage } from '../../classes/storage';
import { timeout } from 'rxjs/operator/timeout';

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

  validation = true;
  constructor(private router: Router) { }

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

  validateFilter() {

    setTimeout(() => {

      this.validation = true;

      if(!this.genderM && !this.genderF)
        this.validation = false;

      if(!this.active && !this.inactive)
        this.validation = false;

      if(!this.typeA && !this.typeO && !this.typeT)
        this.validation = false;

    },100);
    
  }

}
