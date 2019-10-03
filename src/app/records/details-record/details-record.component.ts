import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { Record } from '../../classes/record';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-details-record',
  templateUrl: './details-record.component.html',
  styleUrls: ['./details-record.component.css']
})
export class DetailsRecordComponent implements OnInit {

  sendingData = 0
  record: Record = new Record()

  credential = User.authUser().user_type_id
  window = 1
  observerRef
  subcription
  constructor(
    private _http: RecordService,
    private actRou: ActivatedRoute,
    private not: NotificationService,
    private router: Router
  ) {
    this.observerRef = actRou.params.subscribe(params => {      
      this.record.id = params['id'];
      this.getRecord();
    });

    this.subcription = _http.getData().subscribe(x => {
      if(x.action == 'update')
        this.record.setValues(x.data)
    })

    router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => {           
          if(event.url == "/asistencias/ver/" + this.record.id ) this.window = 1                                  
          else this.window = 0            
      }); 
   }

  ngOnInit() {
  }

  getRecord() {

    this.sendingData++
    this._http.show(this.record).then(
      data => {
        this.record.setValues(data)
        this.sendRecord()
      },
      error => this.not.sendError(error),            
    ).then(() => this.sendingData-- )
    
  }

  sendRecord() {
    this._http.sendData('show', this.record)
  }
  delete() {
    this.window = 2
  }

  deleteConfirm(){
    this.sendingData++
    this._http.delete(this.record).subscribe(
      data => {
        this.not.sendNot2('Asistencia Elimina', 'Accion realizada con exito')
        this.close()
      },
      error => this.not.sendError(error),
      () => this.sendingData--
    )
  }

  close(){
    this.router.navigate(['/asistencias']);
  }

}
