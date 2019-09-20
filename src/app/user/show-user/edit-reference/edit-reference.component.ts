import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../classes/user';
import { Reference } from '../../../classes/reference';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';
import { Storage } from '../../../classes/storage';
import { NotificationService } from '../../../notification/notification.service';


@Component({
  selector: 'app-edit-reference',
  templateUrl: './edit-reference.component.html',
  styleUrls: ['./edit-reference.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class EditReferenceComponent implements OnInit {

  public cardState: String = 'initial';
  public backgroundState: String = 'initial';
  public sendingData: Boolean = false;
  public references: Array<Reference> = [];
  public user: User = new User();
  public storage: Storage = new Storage();

  public referenceDataObserver: any;
  public userDataObserver: any;

  public reference: Reference = new Reference();  
  public referenceToModify: Reference = new Reference();

  public relationshipOptions = Reference.getRelationshipOptions();
  outletOutput: any;

  constructor(private _http: UserService,
              private router: Router,
              private location: Location,
              private actRou: ActivatedRoute,
              private notification: NotificationService) 
  { 
    
    this.outletOutput = this._http.getData().subscribe(x => {      
      if (x.action == 'user')   
        this.user.setValues(x.data) 
    })
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.outletOutput.unsubscribe()
  }

  close(){ this.router.navigate(['../']) }  

  form(){

    if(this.reference.validate()) {

      this.sendingData = true;

      this.reference.references = [];
      this.reference.validations = null;
      
      this._http.postReference(this.reference).then(

        data => {

          let r = new Reference();
          r.setValuesFromData(data);
          
          this.references.push(r);

          this.reference = new Reference();
          this.reference.references = this.references;
          
          this.notification.sendNotification('Referencia Guardada', 'Datos guardados en el servidor', 5000)
          this._http.sendData('REFERENCES', this.references)
        } ,

        error => this.notification.sendError(error)

      ).then(
        () => this.sendingData = false
      );
      
      

    }

  } 


  delete(ref){    

    this.sendingData = true;

      this._http.deleteReference(ref).then(

        data => {

          this.references.splice(this.references.indexOf(ref), 1);

          this.notification.sendNotification('Referencia Eliminada', 'Datos guardados en el servidor', 5000)
          this._http.sendData('REFERENCES', this.references)

        } ,

        error => this.notification.sendError(error)

      ).then(
        () => this.sendingData = false
      );

    
  }

  selectReference(ref){

    // this.referenceToModify.setData(ref);

    this.referenceToModify = new Reference();

    let data = JSON.parse(JSON.stringify(ref));

    this.referenceToModify.setValuesFromData(data);
    // Object.assign(this.referenceToModify, ref);  
    
    this.referenceToModify.references = this.references;
    this.referenceToModify.beforeUpdate = ref;
    this.referenceToModify.updating = true;

  }

  update(){

    if (this.referenceToModify.validate()) { 
      
      this.sendingData = true;

      this._http.updateReference(this.referenceToModify).then(

        data => {

          this.freshReferences();

          this.notification.sendNotification('Referencia Actualizada', 'Datos guardados en el servidor', 5000)
          this._http.sendData('REFERENCES', this.references)

        } ,

        error => this.notification.sendError(error)

      ).then(
        () => this.sendingData = false
      );


    }

    
  }

  freshReferences() {

    for(let i = 0; i < this.references.length; i++) {

      if(this.references[i].id == this.referenceToModify.id) {

        this.referenceToModify.references = [];
        this.referenceToModify.validations = null;

        this.references[i] = this.referenceToModify;
        this.referenceToModify = new Reference();
        this.referenceToModify.references = this.references;

        break;

      }

    }

  }

}
