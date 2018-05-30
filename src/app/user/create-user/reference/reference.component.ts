import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Reference } from '../../../classes/reference';

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
  referenceToModify: Reference = new Reference();

  public relationshipOptions = this.reference.setRelationshipOptions();

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


    if(this.reference.validate()) {
      
      this.reference.id =  this.arrayNumber;

      this.reference.setRelationshipView();
      this.references.push(this.reference);

      this.reference = new Reference();
      this.reference.references = this.references;

      this.arrayNumber++;
      
    }
    


  }

  deleteReference(ref){    
    this.references.splice(this.references.indexOf(ref), 1);
  }

  selectReference(ref){

    Object.assign(this.referenceToModify, ref);  
    
    this.referenceToModify.references = this.references;
    this.referenceToModify.beforeUpdate = ref;
    this.referenceToModify.updating = true;

  }

  update(){
    
    if (this.referenceToModify.validate()) { 
          this.freshReferences();
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
