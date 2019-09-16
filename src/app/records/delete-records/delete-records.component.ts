import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-delete-records',
  templateUrl: './delete-records.component.html',
  styleUrls: ['./delete-records.component.css']
})
export class DeleteRecordsComponent implements OnInit {

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

  sendingData = 0

  constructor(private _http: RecordService, 
    private notification: NotificationService) { }

  ngOnInit() {
  }

  submit() {

    this.restoreValidations()
    this.validate()

    if(!this.validations.validate) return;

    this.sendingData++

    this._http.deleteRecords(this.search).then(
      data => this.notification.sendNotification('Se eliminaron las asistencias', 'La operación ha sido concluida con exito', 5000),
      error => this.notification.sendData(error),      
    ).then( () => this.sendingData--)

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
