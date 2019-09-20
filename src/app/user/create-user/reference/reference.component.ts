import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Reference } from '../../../classes/reference';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-reference-create',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css'],  
})
export class ReferenceComponent implements OnInit {
  
  user: User = new User()

  public reference: Reference = new Reference();
  public referenceToModify: Reference = new Reference();

  public relationshipOptions = Reference.getRelationshipOptions();

  arrayNumber = 1;
  outletOutput

  @HostListener('document:keyup', ['$event']) sss($event) {    
    if($event.keyCode == 27) 
        this.close();    
  }
  constructor(
    private _http: UserService,
    private router: Router) {

      this.outletOutput = this._http.getData().subscribe(x => {      
        if (x.action == 'user')   
          this.user.setValues(x.data) 
      })

     }

  ngOnInit() {  

    this.countReferences();
    
  }

  ngOnDestroy(){
    this.outletOutput.unsubscribe()
  }

  countReferences(){

    for(let x = 0; x < Object.keys(this.user.references).length; x++){
      this.arrayNumber = this.user.references[x].id + 1;
    }

  }

  close(){ this.router.navigate(['/users/create']) }

  form(){


    if(this.reference.validate()) {
      
      this.reference.id =  this.arrayNumber;      

      this.reference.references = [];
      this.reference.validations = null;

      this.user.references.push(this.reference);

      this.reference = new Reference();
      this.reference.references = this.user.references;

      this.arrayNumber++;
      
      this._http.sendData('REFERENCES', this.user.references)

    }
    


  }

  deleteReference(ref){    
    this.user.references.splice(this.user.references.indexOf(ref), 1);
    this._http.sendData('REFERENCES', this.user.references)
  }

  selectReference(ref){

    this.referenceToModify = new Reference();
    
    let data = JSON.parse(JSON.stringify(ref));

    this.referenceToModify.setValuesFromData(data);
    // Object.assign(this.referenceToModify, ref);  
    
    this.referenceToModify.references = this.user.references;
    this.referenceToModify.beforeUpdate = ref;
    this.referenceToModify.updating = true;

  }

  update(){
    
    if (this.referenceToModify.validate()) { 
          this.freshReferences();
    }
    
  }

  freshReferences() {

    for(let i = 0; i < this.user.references.length; i++) {

      if(this.user.references[i].id == this.referenceToModify.id) {

        this.referenceToModify.references = [];
        this.referenceToModify.validations = null;

        this.user.references[i] = this.referenceToModify;
        this.referenceToModify = new Reference();
        this.referenceToModify.references = this.user.references;

        break;

      }

    }

    this._http.sendData('REFERENCES', this.user.references)

  }

}
