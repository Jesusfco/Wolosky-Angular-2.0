import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-participants-event',
  templateUrl: './participants-event.component.html',
  styleUrls: ['./participants-event.component.css']
})
export class ParticipantsEventComponent implements OnInit {

  public search = {
    name: '',
    active: true,
    inactive: false,
    typeA: true,
    typeT: true,
    typeO: true,
    genderM: true,
    genderF: true
  }

  constructor(private _http: EventService) { }

  ngOnInit() {
  }

  searchParticipants() {}

}
