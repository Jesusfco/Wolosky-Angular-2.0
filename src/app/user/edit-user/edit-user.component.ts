import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../user';
import { UserService } from '../user.service';
import { Schedule } from '../schedule';
import { Reference } from '../reference';
import { Salary } from '../salary';
import { MonthlyPayment } from '../../monthly-payment';
import { BackgroundCard, Card } from '../../animations/card.animation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  animations: [ Card, BackgroundCard]
})
export class EditUserComponent implements OnInit {

  user: User = new User();

  state = {
    background: 'initial',
    card: 'initial',
  };

  observerRef: any;

  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) {

      this.observerRef = actRou.params.subscribe(params => {
        this.user.id = params['id'];
        this.getUserData();
      });
     }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

  }

  getUserData(){
    this._http.getUser(this.user.id).then(
      data => this.user = data,
      error => console.log(error)
    );
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }Init() {
  }

}
