import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { Schedule } from '../classes/schedule';
import { User } from '../classes/user';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public sche: any;

  public schedules: Array<Schedule> = [];
  public users: Array<User> = [];
  public filter: number = 1;

  public dataOrder: Array<any> = [];

  constructor(private _http: ScheduleService) {

    this.setDataOrder();

    this.getSchel();

   }

  ngOnInit() {
  }

  getSchel() {


    this._http.getShcedules({type: this.filter}).then(

      data => {

        this.users = [];
        this.schedules = [];
        this.setDataOrder();

        for(let user of data.users) {

          let u = new User();
          u.id = parseInt(user.id);
          u.name = user.name;
          u.user_type_id = user.user_type_id;

          this.users.push(u);

        }

        for(let i = 0; i < data.schedules.length; i++) {

          if(data.schedules[i] == null) continue;

          let s = new Schedule();
          s.user_id = parseInt(data.schedules[i].user_id);
          s.check_in = data.schedules[i].check_in;
          s.check_out = data.schedules[i].check_out;
          s.day_id = parseInt(data.schedules[i].day_id);

          this.schedules.push(s);

        }

        this.setNames();
        this.organizePerDay();        
        
      },

      error => localStorage.setItem('request', JSON.stringify(error))
    );

  }

  organizePerDay() {

    for(let day of this.dataOrder) {

      for(let s of this.schedules ) {

        if(s.day_id != day.day) continue;

        let check_in = s.check_in.split(':');
        let check_out = s.check_out.split(':');

        let horario = {
          check_in: parseInt(check_in[0]),
          check_out: parseInt(check_out[0]),
        };

        //Asignamos horarios en los que se asiste de acuerdo a los horarios obtenidos AGRUPACION
        

        let arrayPosibleHorario = [];

        for(let i = 0; (i + horario.check_in) < horario.check_out; i++ ) { 

          arrayPosibleHorario.push(i + horario.check_in);

        } 

        for(let i = 0; i < arrayPosibleHorario.length; i++) {
        
          let verified = true;

          for(let object of day.schedules) {

            if(object.check_in == arrayPosibleHorario[i]) {

              verified = false;
  
            }  

          }
          
          if(verified) {
        
            let ho = {
              check_in: arrayPosibleHorario[i],
              users: []
            };
  
            day.schedules.push(ho);
  
          }

        }

        

        

      }

    }

    this.setNameVisualSchedule();
    this.sortDataOrder();

    console.log(this.dataOrder);
  

  }

  setNameVisualSchedule() {

    for(let day of this.dataOrder) {

      for(let s of this.schedules ) {

        if(s.day_id == day.day) {


          let check_in = s.check_in.split(':');
          let check_out = s.check_out.split(':');
  
          let horario = {
            check_in: parseInt(check_in[0]),
            check_out: parseInt(check_out[0]),
          };

          for(let schedule of day.schedules) {

            for(let check = horario.check_in; check <= horario.check_out; check++) {
      
              if(schedule.check_in == check){
      
                let user = {
                  user_name: s.user_name,
                  user_id: s.user_id
                };

                schedule.users.push(user);

              }

            }

          }

        } 

      }  

    }

  }

  setNames() {

    for(let i of this.schedules) {

      for(let u of this.users) {

        if(u.id == i.user_id) {

          i.user_name = u.name;
          break;

        }

      }

    }

  }

  setDataOrder() {

    this.dataOrder = [];

    for(let i = 0; i < 6; i++) {
      
      let data = {
        day: i + 1,
        schedules: []
      };

      this.dataOrder.push(data);
    }

  }

  sortDataOrder() {

    for(let i = 0; i < this.dataOrder.length; i++){

      this.dataOrder[i].schedules.sort((a, b) => {

        if(a.check_in < b.check_in) {
          return -1;
        } else if (a.check_in > b.check_in) {
          return 1;
        } else {
          return 0;
        }
      });

      for(let y = 0; y < this.dataOrder[i].schedules.length; y++) {
        
        this.dataOrder[i].schedules[y].users.sort((a, b) => {

          if(a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
            return 1;
          } else {
            return 0;
          }
        });

      }


    }

  }

}
