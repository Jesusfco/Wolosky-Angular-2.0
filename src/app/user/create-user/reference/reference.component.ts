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
  @Input() references: Reference;

  reference: Reference = new Reference();
  

  relationshipOptions = [
    {
      value: 1,
      view: 'Padres/Madre'
    },{
      value: 2,
      view: 'Familiar'
    },{
      value: 3,
      view: 'Herman@'
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

  constructor() { }

  ngOnInit() {

    setTimeout(() => {      
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

  }

  close(){

    this.cardState = 'initial';
    this.backgroundState = 'initial';

    setTimeout(() => {      
      this.closeReferenceEvent.emit();
    }, 350);

  }

  form(){

  }

  validateForm(){
   
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

}
