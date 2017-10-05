import { Component, OnInit, Input } from '@angular/core';
import { Salary}  from '../../salary';

@Component({
  selector: 'app-new-salaries',
  templateUrl: './new-salaries.component.html',
  styleUrls: ['./new-salaries.component.css']
})
export class NewSalariesComponent implements OnInit {

  @Input() salary;
  @Input() salaryView;
  @Input() verificar;

  constructor() { }

  ngOnInit() {
  }

  verify(){
    this.verificar[0] = 0;

    if(this.salary.amount == null) this.verificar[0]++;
    if(this.salary.salaryTypeId == null) this.verificar[0]++;
    
    if(this.verificar[0] == 0) {
      
      this.salaryView = false;
      console.log(this.salary);

    }
    
  }
}
