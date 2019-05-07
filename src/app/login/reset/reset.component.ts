import { Focus } from './../../utils/classes/focus';
import { NotificationService } from './../../notification/notification.service';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../classes/user';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {

  user: User = new User();
  request = 0
  sended = 0

  validate =  0

  constructor(private _http: LoginService, private router: Router, private not: NotificationService) { }

  ngOnInit() {
    Focus.elementById('select')
  }

  login() {
    this.validate = 0

    if(this.user.email.trim().length  == 0) {
      this.validate = 1
      return;
    }

    if(this.sended >=2) return

    this.request++
    this.sended++
    this._http.resetPassword(this.user).then(
    data => {
        if(data == true)  {
          this.not.sendNotification('Correo Enviado', 'Entre a su correo a para continuar con el procedimiento de recuperación', 7000)        
          this.router.navigate(['/restablecer-contraseña']);
        } else {
          this.validate = 2
        }
        
      }, error => {
        this.not.sendError(error)
      }
    ).then(() => this.request--);    

  }
  
}
  


