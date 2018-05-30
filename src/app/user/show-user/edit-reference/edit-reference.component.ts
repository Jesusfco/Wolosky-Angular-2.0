import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../../classes/user';
import { Reference } from '../../../classes/reference';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';
import { Storage } from '../../../classes/storage';


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

  public relationshipOptions = this.reference.setRelationshipOptions();

  constructor(private _http: UserService,
              private router: Router,
              private location: Location,
              private actRou: ActivatedRoute) { 

                this.storage = new Storage();
                this.setReferenceDataObserver();
                this.setUserObserverData();

              }

  ngOnInit() {
  }

  setReferenceDataObserver() {
    this.referenceDataObserver = setInterval(() => this.referenceDataObserverLogic(), 500);
  }

  referenceDataObserverLogic() {

    if(localStorage.getItem('userReferences') == undefined) return;

    this.references = JSON.parse(localStorage.getItem('userReferences'));
    this.reference.references = this.references;

    clearInterval(this.referenceDataObserver);

  }

  setUserObserverData() {
    this.userDataObserver = setInterval(() => this.userDataObserverLogic(), 500);
  }

  userDataObserverLogic() {
    if(localStorage.getItem('userData') == undefined) return;

    this.user = JSON.parse(localStorage.getItem('userData'));
    this.reference.user_id = this.user.id;
    clearInterval(this.referenceDataObserver);
  }


  
  close(){

    this.cardState = 'initial';
    this.backgroundState = 'initial';    

    setTimeout(() => {
      this.location.back();
    }, 400);
    
  }

  refreshReferenceStorage() {
    localStorage.setItem('userReferences', JSON.stringify(this.references));
    localStorage.setItem('userReferencesUpdates', '1');
  }

  

  form(){

    if(this.reference.validate()) {

      this.sendingData = true;

      this._http.postReference(this.reference).then(

        data => {

          let r = new Reference();
          r.setValuesFromData(data);
          
          this.references.push(r);

          this.reference = new Reference();
          this.reference.references = this.references;

          let not = {
            status: 200,
            title: 'Referencia Guardada',
            description: 'Datos Guardados en el servidor'
          };

          localStorage.setItem('request', JSON.stringify(not));

          this.refreshReferenceStorage();

        } ,

        error => localStorage.setItem('request', JSON.stringify(error))

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

          let not = {
            status: 200,
            title: 'Referencia Eliminada',
            description: 'Datos Cargados en el servidor'
          };

          localStorage.setItem('request', JSON.stringify(not));
          this.refreshReferenceStorage();

        } ,

        error => localStorage.setItem('request', JSON.stringify(error))

      ).then(
        () => this.sendingData = false
      );

    
  }

  selectReference(ref){

    // this.referenceToModify.setData(ref);
    Object.assign(this.referenceToModify, ref);  
    
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

          let not = {
            status: 200,
            title: 'Referencia Actualizada',
            description: 'Datos Cargados en el servidor'
          };

          localStorage.setItem('request', JSON.stringify(not));
          this.refreshReferenceStorage();

        } ,

        error => localStorage.setItem('request', JSON.stringify(error))

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
