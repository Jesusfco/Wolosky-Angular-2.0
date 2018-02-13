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
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
  animations: [ Card, BackgroundCard]
})
export class ShowUserComponent implements OnInit {

  public user: User = new User();

  public state = {
      background: 'initial',
      card: 'initial',
    };

  public observerRef: any;

  public credential = localStorage.getItem('userType');

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
    
  }

}
