import { Component, OnInit, Input } from '@angular/core';
import {MdSelectModule} from '@angular/material';
import { User } from '../user';
import { Schedule } from '../schedule';
import { Payment } from '../payment';
import { Salary } from '../salary';
import { UserService } from '../user.service';
import { Horario } from '../horario';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUser: boolean = false;
  day: number;
  month: number;
  year: number;

  schedules: Array<Horario> = [];
  scheduleView: boolean = false;

  payment: Payment = new Payment;
  paymentView: boolean;

  salary: Salary = new Salary();
  salaryView: boolean;

  verificar:Array<number> = [null,null,null];

  user = new User();

  postDataUser: Array<any> = [];

  months = [
    {value: '1', viewValue: 'Enero'},
    {value: '2', viewValue: 'Febrero'},
    {value: '3', viewValue: 'Marzo'},
    {value: '4', viewValue: 'Abril'},
    {value: '5', viewValue: 'Mayo'},
    {value: '6', viewValue: 'Junio'},
    {value: '7', viewValue: 'Julio'},
    {value: '8', viewValue: 'Agosto'},
    {value: '9', viewValue: 'Septiembre'},
    {value: '10', viewValue: 'Octubre'},
    {value: '11', viewValue: 'Noviembre'},
    {value: '12', viewValue: 'Diciembre'},

  ];

  constructor(private _httpService: UserService) {

    this.generateArraySchedules();
    

   }

  ngOnInit() {
  }

  sendRequest(){
    this.birthdayFormat();
    
    this.postDataUser[0] = this.user;
    this.postDataUser[1] = this.schedules;
    this.postDataUser[2] = this.payment;
    this.postDataUser[3] = this.salary;
    
        console.log(this.postDataUser);
    
        
    
        this._httpService.createUser(this.postDataUser).then(
            data => console.log(data)
        );
  }

  form(){
    this.birthdayFormat();

    this.postDataUser[0] = this.user;
    this.postDataUser[1] = this.schedules;
    this.postDataUser[2] = this.payment;
    this.postDataUser[3] = this.salary;

    console.log(this.postDataUser);

    

    this._httpService.createUser(this.postDataUser).then(
        data => console.log(data),
        error => console.log(error)
    );

    
  }

  birthdayFormat(){
    this.user.birthday = this.year + "-" + this.month + "-" + this.day;
  }

  verificacion(){
    console.log(this.verificar);
  }

  generateArraySchedules(){

    for(let x = 0; x < 6; x++){

      this.schedules[x] = new Horario();

      this.schedules[x].horario = [];

      this.schedules[x].horario[0] = new Schedule();
      this.schedules[x].active = false;

      if(x == 0 ) {this.schedules[x].dayView = "Lunes"}
      else if(x == 1 ) {this.schedules[x].dayView = "Martes"}
      else if(x == 2 ) {this.schedules[x].dayView = "Miercoles"}
      else if(x == 3 ) {this.schedules[x].dayView = "Jueves"}
      else if(x == 4 ) {this.schedules[x].dayView = "Viernes"}
      else if(x == 5 ) {this.schedules[x].dayView = "Sabado"}

    }

    console.log(this.schedules);

    
    
  } //Fin functin Gerate Array Schedules

}
