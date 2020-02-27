import { NotificationService } from './../../notification/notification.service';
import { BackgroundCard, Card } from './../../animations/card.animation';
import { Component, OnInit } from '@angular/core';
import { Parking } from '../../classes/parking';
import { ParkingService } from '../../services/parking.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.css'],
  animations: [ Card, BackgroundCard]
})
export class NewParkingComponent implements OnInit {

  parking: Parking = new Parking()
  search = ''
  timer = 0
  sendingData = 0
  sugests: Array<User> = []

  public state = {
    background: 'initial',
    card: 'initial',
  };

  constructor(
    private _http: ParkingService,
    private router: Router,
    private not: NotificationService) { 

      this.parking.setActualDate()
      this.parking.check_in = this.parking.getActualTime()
  }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/parking']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  createReceipt() {

    if(!this.parking.validationForCreate()) return

    this.sendingData++

    this._http.createParking(this.parking).then(
    
      data => {
        this.parking.setData(data)
        this._http.sendData('new', this.parking)
        this.closePop()

      }, error => this.not.sendError(error)

    ).then(() => this.sendingData--)

  }

  selectUserSugest(user) {
    this.parking.user_id = user.id
    this.parking.user = user
  }

  searchSugest(key) {

      if(key.keyCode >=37 && key.keyCode <= 40 || key.keyCode == 13) return;
  
      this.timer++;    
  
      setTimeout(() => {      
        this.timer--;      
      }, 300);
  
      setTimeout(() => {
        
        if(this.timer == 0){
          this.sendingData++;
          this._http.sugestUsers({name: this.search}).then(
            data => {
  
              this.sugests = [];
  
              for(let d of data) {
  
                let user = new User();
                user.setValues(d);
                this.sugests.push(user);
  
              }
               
            }, error => console.log(error)
          ).then(
            () => this.sendingData--
          );
        } 
  
      }, 350);
  }

} 
  

