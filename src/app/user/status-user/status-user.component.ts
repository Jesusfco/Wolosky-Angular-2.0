import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
@Component({
  selector: 'app-status-user',
  templateUrl: './status-user.component.html',
  styleUrls: ['./status-user.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class StatusUserComponent implements OnInit {
  cardState: string = 'initial';
  backgroundState: string = 'initial';

  id: number;
  observerRef: any;
  sendingData: boolean = false;

  status: any = [];
  user: any = {
    name: ''
  };

  record = {
    description: '',
    status: undefined,
    user_id: undefined
  };

  validation = {
    status: 0,
  }

  constructor(private _http: UserService,
    private router: Router,
    private location: Location,
    private actRou: ActivatedRoute) { 

      this.observerRef = actRou.params.subscribe(params => {
        this.id = params['id'];
        this.record.user_id = this.id;
        this.getStatusData();
      });

  }

  ngOnInit() {
  }

  getStatusData(){
    this.sendingData = true;
    this._http.getStatus(this.id).then(
      data => {
        this.status = data.status;
        this.user = data.user;
        this.record.status = data.user.status;
      }, error => console.log(error)
    ).then(
      () => this.sendingData = false
    );
  }

  submitForm(){
    this.validateStatus();
    if(this.validation.status == 1)
      return;
      this.sendingData = true;

      this._http.postStatus(this.record).then(
        data => {
          this.user.status = data.status;
          this.status.unshift(data);
          this.record.description = '';
        },
        error => alert('Error de conexion')
      ).then(
        () => this.sendingData = false
      );



  }

  validateStatus(){
    if(this.record.status == this.user.status){
      this.validation.status = 1;
      
    }
    else { 
      this.validation.status = 0;

    }

  }

  close(){
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    // this.createView = false;

    setTimeout(() => {
      this.location.back();
    }, 400);
  }

}
