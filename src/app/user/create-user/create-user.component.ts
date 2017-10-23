import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  // animations: [
  //   trigger('principal', [
      
  //     state('initial', style({
  //       transform: 'translate3d(0,80%,0) scale(.7)',        
  //       opacity: 0
  //     })),

  //     state('final' ,style({
  //       transform: 'translate3d(0,0,0) scale(1)',       
  //       opacity: 1
  //     })),      

  //     transition('initial <=> final' , animate('1000ms ease-out')),
  //   ]),

  //   trigger('loader', [
      
  //     state('initial', style({        
  //       opacity: 1
  //     })),

  //     state('final' ,style({
  //       display: 'none',       
  //       opacity: 0
  //     })),      

  //     transition('initial <=> final' , animate('500ms ease-out')),
  //   ])

  // ]
})
export class CreateUserComponent implements OnInit {

  @Input() createView;
  @Output() closeEventCreateComponent =  new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close(){
    // this.createView = false;
    this.closeEventCreateComponent.emit();
  }

}
