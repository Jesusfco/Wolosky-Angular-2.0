import { Component, OnInit } from '@angular/core';
import { MyCarbon } from '../../utils/classes/my-carbon';
import { Url } from '../../classes/url';

@Component({
  selector: 'app-export-records',
  templateUrl: './export-records.component.html',
  styleUrls: ['./export-records.component.css']
})
export class ExportRecordsComponent implements OnInit {
  
  section = 1
  public search = {
    type: 1,
    from: '',
    to: '',
    name: '',    
  };

  validations = {
    from: 0,
    to: 0,
    validate: true
  }
  

  constructor() { 
    this.search.from = MyCarbon.getFromToThisMonth().from
    this.search.to = MyCarbon.getFromToThisMonth().to
  }

  ngOnInit() {
  }

  submit() {

    this.restoreValidations()
    this.validate()

    if(!this.validations.validate) return;

    this.section = 2

  }

  validate() {
    if(this.search.from == ''){ 
      this.validations.validate = false
      this.validations.from = 1
    }

    if(this.search.to == ''){ 
      this.validations.validate = false
      this.validations.to = 1
    }
  }

  restoreValidations() {
    this.validations = {
      from: 0,
      to: 0,
      validate: true
    }
  }

}
