import { Component, OnInit,  Input, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
