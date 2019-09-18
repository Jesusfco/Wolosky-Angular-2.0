import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { User } from '../../classes/user';
import { NotificationService } from '../../notification/notification.service';
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
  user: User = new User()

  record = {
    description: '',
    status: undefined,
    user_id: undefined
  };

  validation = {
    status: 0,
  }


  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.close();
    }

  }

  httpSubscription
  constructor(private _http: UserService,
    private router: Router,
    private location: Location,
    private actRou: ActivatedRoute,
    private notification: NotificationService) { 

      this.observerRef = actRou.parent.params.subscribe(params => {
        this.id = params['id'];
        this.record.user_id = this.id;
        this.getStatusData();
      });

      this.httpSubscription = this._http.getData().subscribe(x => {
        if(x.action == 'user')
          this.user.setValues(x.data)
      })
     
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  getStatusData(){
    this.sendingData = true;
    this._http.getStatus(this.id).then(
      data => {
        
        this.status = data.status;        
        this.record.status = data.user.status;

      }, error => this.notification.sendError(error)
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

          this.notification.sendNotification(
            'Status Actualizado',
            'Se ha cargado los datos correctamente', 5000
          )

          this._http.sendData('STATUS', this.record.status)
          
        },
        error => this.notification.sendError(error)

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
