import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-delete-generic',
  templateUrl: './delete-generic.component.html',
  styleUrls: ['./delete-generic.component.sass']
})
export class DeleteGenericComponent implements OnInit {

  
  @Input() message: any;
  @Output() actionDeleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cancel(){
    this.actionDeleteEvent.emit(  false );
  }

  confirm(){
        
    if(this.message.type = 2) 
      this.actionDeleteEvent.emit(1)
    else  this.actionDeleteEvent.emit(  true )
    
  }

  confirm2() {
    this.actionDeleteEvent.emit(2);

  }
}
