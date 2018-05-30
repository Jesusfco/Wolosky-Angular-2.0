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

  public dataOrder: Array<any> = [];

  constructor(private _http: ScheduleService) {

    this.setDataOrder();

    _http.getStudents().then(

      data => {

        for(let user of data.users) {

          let u = new User();
          u.id = parseInt(user.id);
          u.name = user.name;
          u.user_type_id = user.user_type_id;

          this.users.push(u);

        }

        // let count = 0;

        // for(let i = 0; i < 50000; i++){

        //   count++;
          
        //   if(data.schedules[i] == null){
        //     break;
        //   }

        // }

        // console.log(count);

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

  ngOnInit() {
  }

  organizePerDay() {

    // let monday: Array<any> = [];

    for(let day of this.dataOrder) {

      for(let s of this.schedules ) {

        if(s.day_id == day.day) { 


          let check_in = s.check_in.split(':');
          let check_out = s.check_out.split(':');
  
          let horario = {
            check_in: parseInt(check_in[0]),
            check_out: parseInt(check_out[0]),
          };
  
  
          let verified = true;

          for(let h of day.schedules) {
  
            if(h.check_in == horario.check_in || h.check_in == (horario.check_out - 1)){
  
              verified = false;
  
            }
  
          }
  
          if(verified) {
            let ho = {
              check_in: horario.check_in,
              users: []
            };
  
            day.schedules.push(ho);
          }

          for(let m of day.schedules){

            for(let check = horario.check_in; check < horario.check_out; check++){
  
              if(m.check_in == check){
  
                let user = {
                  user_name: s.user_name,
                  user_id: s.user_id
                };
    
                m.users.push(user);
  
                break;
    
              }
  
            }
  
            
            
          }

        }

      }

    }

    this.sortDataOrder();
  

  }

  setNames() {

    

    for(let i of this.schedules) {

      

      for(let u of this.users) {

        if(u.id == i.user_id) {
          i.user_name = u.name;
          // console.log(u.name);
          break;
        }

      }

    }

    // console.log(this.schedules[0]);

  }

  setDataOrder() {
    for(let i = 0; i < 6; i++){
      
      let data = {
        day: i + 1,
        schedules: []
      };

      this.dataOrder.push(data);
    }
  }

  sortDataOrder() {

    for(let day of this.dataOrder){

      day.schedules.sort((a, b) => {

        if(a.check_in < b.check_in) {
          return -1;
        } else if (a.check_in > b.check_in) {
          return 1;
        } else {
          return 0;
        }
      });

      for(let schedule of day.schedules) {
        
        schedule.users.sort((a, b) => {

          if(a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });

      }


    }

  }

}
