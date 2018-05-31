import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { cardPop, backgroundOpacity} from '../../animations';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../../classes/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class DeleteUserComponent implements OnInit {

  public state = {
    background: 'initial',
    card: 'initial',
  };

  public request: Boolean = false;
  public user: User = new User();
  public safe: any = null;

  public userDataObserver: any;

  constructor(private _http: UserService, private router: Router, private location: Location) {

    this.setUserDataOberver();

   }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

  }

  closePop(){    
    setTimeout(() => {
      // this.router.navigate(['../']);
      this.location.back();
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  setUserDataOberver() {
    this.userDataObserver = setInterval(() => this.userDataObserverLogic(), 1000);
  }

  userDataObserverLogic() {
    if(localStorage.getItem('userData') == undefined) { return; }

    this.user = JSON.parse(localStorage.getItem('userData'));
    this.getSecureDeleteData();
    clearInterval(this.userDataObserver);

  }

  getSecureDeleteData() {
    this.request = true;
    this._http.safeDeleteCheck(this.user).then(
      data => {

       this.safe = data;
      }
    ).then(

      () => this.request = false

    );
  }

  changeStatus() {

    let record = {
      description: 'Eliminado por el sistema',
      status: 3,
      user_id: this.user.id
    };

    this.request = true;

    this._http.postStatus(record).then(
      data => {

        let noti = {
          status: 200,
          title: 'Usuario dado de baja',
          description: 'Se ha cargado los datos correctamente'
        };

        localStorage.setItem('request', JSON.stringify(noti));

        this.closePop();
        
      },
      error => localStorage.setItem('request', JSON.stringify(error))

    ).then(

      () => this.request = false

    );
  }

  deleteUser() {
    this.request = true;
    this._http.deleteUser(this.user).then(
      data => {

        let noti = {
          status: 200,
          title: 'Usuario Eliminado',
          description: 'Datos Actualizados en el Servidor'
        };

        setTimeout(() => {
          this.router.navigate(['users']);
        }, 450);
        
        this.state.background = 'initial';
        this.state.card = 'initial';
        

        localStorage.setItem('request', JSON.stringify(noti));

      }, error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request = false
    )
  }

}
