import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { Router } from '@angular/router';
import { Card, BackgroundCard } from '../../animations/card.animation';
import { Storage } from '../../classes/storage';

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
  typeO;
  genderM = true;
  genderF = true;

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

}
