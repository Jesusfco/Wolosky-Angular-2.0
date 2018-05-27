import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public showNotifications: boolean = false;
  public notifications = [];
  
  public interval: any;

  constructor(private router: Router) {

    this.interval = setInterval(() => this.checkStorage(), 1000);

   }

  ngOnInit() {
  }

  checkStorage(){

    let request = localStorage.getItem('request');
    localStorage.removeItem('request');

    if(request == undefined) return;

    let message = {
      title: null,
      description: null,
      type: 1,
      id: null
    };

    let x = JSON.parse(request);

    // console.log(x);

    if(x.status < 250 && x.status >= 200){

        if(x.title != undefined){

          message.title = x.title;
          message.description = x.description;
          message.type = 1;

        }

        else {

          message.title = "¡Exito!";
          message.description = "Datos cargados correctamente";
          message.type = 1;

        }

    }

    else {

      if(x.status == 0){

        message.title = "Error de Conexión";
        message.description = "No se ha establecido conexion al servidor";
        message.type = 2;

        let lecture = localStorage.getItem('out_conection');
        let count;

        if(lecture != undefined) {

          count = parseInt(lecture);
          count++;
          localStorage.setItem('out_conection', count.toString() );

        } else {

          localStorage.setItem('out_conection', '1');
          count = 0;

        }

        if(count > 1) message.type = 0;

      } else if(x.status == 400) {
          let login = parseInt(localStorage.getItem('login'));

          if(login == -1) return;

          message.title = "Token Invalido";
          message.description = "Iniciar de nuevo sesión";
          message.type = 2;

          localStorage.setItem('login', '0');

          this.router.navigate(['/login']);

      } else if (x.status == 401) {

        let login = parseInt(localStorage.getItem('login'));

        if(login == -1) return;
        
        message.title = "Token Expirado";
        message.description = "Iniciar de nuevo sesión";
        message.type = 2;

        this.router.navigate(['/login']);

        localStorage.setItem('login', '0');

      }


      else {

        message.title = "Error: " + x.status;
        message.description = x.statusText;
        message.type = 2;

      }

    }
    
    if(message.type == 0) return;
    this.checkLimitAlerts();

    message.id = Math.floor((Math.random() * 10000) + 1);

    this.notifications.push(message);

    this.removeClasses(message.id);

    //Notificacion permanece si es falla de conexion
    if(message.type == 2){
      if(x.status == 0) {        
        return;
      }
    }

    // setTimeout(() => {

      setTimeout(() => {
    //     if(this.notifications.length > 0) 

    //     for(let i = 0; i < this.notifications.length; i++) {
    //       if(this.notifications[i].id == message.id){
    //         this.notifications.splice(i, 1);
              // this.setPositionNotification();
    //         break;
    
    //       }
    //     }
        
        
      }, 700);

    //   this.addClasses(message.id);

    // }, 10000);

  }

  close(id){

    let indice = null;

    for(let i = 0; i < this.notifications.length; i++) {

      if(this.notifications[i].id == id){
        
        indice = i;
        this.closeAndSetTransform(i);

      }
    }

    setTimeout(() => {
          
          this.notifications.splice(indice, 1); 
          

    }, 700);
    
  }

  addClasses(id){

    setTimeout(() => {
      this.setPositionNotification();
      document.getElementById('not' + id).classList.add('translate');

    }, 10);

    setTimeout(() => {
    
      // document.getElementById('not' + id).classList.add('smaller');

    }, 150);
  }

  removeClasses(id){

    setTimeout(() => {
      this.setPositionNotification();
      // document.getElementById('not' + id).classList.remove('smaller');

    }, 10);

    setTimeout(() => {
    
      document.getElementById('not' + id).classList.remove('translate');

    }, 150);

  }

  checkLimitAlerts(){
    if(this.notifications.length > 5){
       this.addClasses(this.notifications[5].id);

       
       setTimeout(() => {
    
        this.notifications.splice(0, 1);
  
      }, 500);
    }
  }

  setPositionNotification() {

    let leng = this.notifications.length - 1;

    let margin = 25;
    let heightCount = 0;

    for(let i = leng; i >= 0; i--) {

      document.getElementById('not' + this.notifications[i].id).style.transform = "translateY(-" + heightCount +"px)";

      heightCount += document.getElementById('not' + this.notifications[i].id).offsetHeight + margin;

    }

  }

  closeAndSetTransform(x) {

    let leng = this.notifications.length - 1;

    
    let margin = 25;
    let heightCount = 0;

    for(let i = leng; i >= 0; i--) {

      if(x == i) {

        document.getElementById('not' + this.notifications[i].id).style.transform = "translate( 150%, -" + heightCount +"px)";

      } else {

        document.getElementById('not' + this.notifications[i].id).style.transform = "translate(0, -" + heightCount +"px)";
        heightCount += document.getElementById('not' + this.notifications[i].id).offsetHeight + margin;
      }


    }

  }

}
