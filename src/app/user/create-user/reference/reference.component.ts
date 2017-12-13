import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Reference } from '../../reference';

@Component({
  selector: 'app-reference-create',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css'],
  animations: [
    trigger('principal', [
      
      state('initial', style({
        transform: 'translate3d(100%,0,0)',                
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',               
      })),      

      transition('initial <=> final' , animate('350ms ease-out')),
    ]),

    trigger('background', [
      
      state('initial', style({        
        opacity: 0
      })),

      state('final' ,style({       
        opacity: .7
      })),      

      transition('initial <=> final' , animate('180ms ease-out')),
    ])

  ]
})
export class ReferenceComponent implements OnInit {

  cardState: string = 'initial';
  backgroundState: string = 'initial';


  @Output() closeReferenceEvent = new EventEmitter();
  @Input() references;

  reference: Reference = new Reference();
  toUpdate: boolean =  false;
  referenceToModify: Reference;

  relationshipOptions = [
    {
      value: 1,
      view: 'Padres/Madre'
    },{
      value: 2,
      view: 'Hermano/a'
    },{
      value: 3,
      view: 'Familiar'
    },{
      value: 4,
      view: 'Otro'
    }
  ];

  validations: any = {
    validate: true,
    name: -1,
    type:-1,
    nuMail: -1,
  };

  arrayNumber = 1;


  constructor() { }

  ngOnInit() {

    setTimeout(() => {      
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

    this.countReferences();
    
  }

  countReferences(){

    for(let x = 0; x < Object.keys(this.references).length; x++){
      this.arrayNumber = this.references[x].id + 1;
    }

  }

  close(){

    this.cardState = 'initial';
    this.backgroundState = 'initial';

    setTimeout(() => {      
      this.closeReferenceEvent.emit();
    }, 350);

  }

  form(){

    this.restoreValidationValues2();    
    this.validateForm();

    if(this.validations.validate == true){

      this.reference.id =  this.arrayNumber;
      this.reference.setRelationshipView();
      this.references.push(this.reference);
      this.reference = new Reference();
      this.arrayNumber++;

    } 

  }

  validateForm(){
    this.validateName();
    this.validateType();
    this.validateMailNumber();
  }

  restoreValidationValues2(){

    this.validations = {
      validate: true,
      name: 0,
      type: 0,
      nuMail: 0,
    }

  }

  restoreValidationValues1(){

    this.validations = {
      validate: true,
      name: -1,
      type: -1,
      nuMail: -1,
    }

  }

  validateName(){

    if(this.reference.name == null || this.reference.name == ''){
      this.validations.name = 1;
      this.validations.validate = false;      
    }

  }

  validateType(){

    if(this.reference.relationship == null){
      this.validations.type = 1;
      this.validations.validate = false;
    }

  }

  validateMailNumber(){

    if(this.reference.phone == null && this.reference.email == null){
      this.validations.nuMail = 1;
      this.validations.validate = false;
    }
    else if(this.reference.phone == "" && this.reference.email == ""){
      this.validations.nuMail = 1;
      this.validations.validate = false;
    }
          
  }

  nameUpper(){
    if(this.reference.name != null) 
      this.reference.name = this.reference.name.toUpperCase();          
  }
  nameModifyUpper(){
    if(this.referenceToModify.name != null) 
      this.referenceToModify.name = this.referenceToModify.name.toUpperCase();
  }

  mailUpper(){
    if(this.reference.email != null)
      this.reference.email =  this.reference.email.toUpperCase();
  }
  mailModifyUpper(){
    if(this.referenceToModify.email != null)
      this.referenceToModify.email =  this.referenceToModify.email.toUpperCase();
  }

  deleteReference(ref){    
    this.references.splice(this.references.indexOf(ref), 1);
  }

  selectReference(ref){
    this.referenceToModify = ref;
    this.toUpdate = true;
  }

  update(){
    this.toUpdate = false;
    // let x = this.reference
  }
}
