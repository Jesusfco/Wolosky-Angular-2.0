import { Component, OnInit } from '@angular/core';
import { Record } from '../../classes/record';
import { RecordService } from '../../services/record.service';
import { NotificationService } from '../../notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent implements OnInit {

  record: Record = new Record();
  sendingData = 0
  subcription
  constructor( 
    private _http: RecordService,
    private not: NotificationService,
    private router: Router) {

      this.subcription = _http.getData().subscribe(x => {
        if(x.action == 'show')
          this.record.setValues(x.data)
      })
     }

  ngOnInit() {
  }

  update() {
    this.sendingData++
    this._http.update(this.record).subscribe(
      data => {
        this.not.sendNot2('Asistencia Actualizada', 'Datos cargados correctamente')
        this._http.sendData('update', this.record)
      }, error => this.not.sendError(error),
      () => this.sendingData--
    )
  }
  close() {
    this.router.navigate(['../']);
  }

}
