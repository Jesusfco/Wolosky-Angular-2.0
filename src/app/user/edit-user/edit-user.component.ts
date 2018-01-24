import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  user2: User = new User();

  state = {
    background: 'initial',
    card: 'initial',
  };

  observerRef: any;
  sendingData: boolean = false;

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
      data => {
        this.user.setValues(data);
        this.user2.setValues(data);
      },
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

  sendProccess(){
    this.sendingData = true;
    this._http.updateUser(this.user).then(
      data =>{
        console.log(data);
        this.sendingData = false;
      },
      error => {
        console.log(error);
        this.sendingData = false;
      }
    );
  }

  nameWriting(){
    this.user.nameUppercase();
    
  }

  mailWriting(){
    // console.log(this.user);
    this.user.mailUpper();
    this.uniqueEmailWriting();
  }

  uniqueEmailWriting(){
    this.user.timer.email++;

    setTimeout(() => {
      this.user.timer.email--;
    }, 900);

    setTimeout(() => {
      if(this.user.timer.email == 0){
        if(this.user.email.length > 7 && this.user2.email != this.user.email){ 
          this.uniqueEmail();
        } else {
          this.user.validations.email = 0;
        }
      }
    }, 950);

  }

  uniqueEmail(){
    this._http.checkUniqueEmail(this.user.email).then(
      data => {
        if(data == false){
          this.user.validations.email = 2;
          this.user.validations.validate = false;
        }  
        else { this.user.validations.email = -1; }
      },
      error => console.log(error)
    )
  }

  uniqueNameWriting(){
    this.user.timer.name++;

        setTimeout(() => {
          this.user.timer.name--;

        }, 900);

        setTimeout(() => {
          if(this.user.timer.name == 0){
            if(this.user.name.length > 5 && this.user.name != this.user2.name) {
              this.uniqueName();
            } else {
              this.user.validations.name = 0;
            }
          } 
        }, 950);

  }

  uniqueName(){
    this._http.checkUniqueName(this.user.name).then(
      data => {
        if(data == false){
          this.user.validations.name = 2;
          this.user.validations.validate = false;
        } 
        else {this.user.validations.name = -1;}
        // if(this.sendingData == true)
        // this.sendNewUser();
      },
      error => {
        console.log(error);
        // if(this.sendingData == true)
        // this.sendNewUser();
      }
    );
  }

}
