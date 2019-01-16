import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';
import { EventParticipant } from '../../classes/event-participant';
import { Event } from '../../classes/event';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-participants-event',
  templateUrl: './participants-event.component.html',
  styleUrls: ['./participants-event.component.css']
})
export class ParticipantsEventComponent implements OnInit {

  @Input() event: Event;

  sendingData = 0

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

  public participants: Array<EventParticipant> = [];

  constructor(private _http: EventService, private not: NotificationService) { 
    this.setParticipants()
  }

  ngOnInit() {
  }

  setParticipants() {

    this._http.getParticipants(this.event).then(

      data => {
        if(data.users != undefined){
          this.setParticipantsArray(data.users);
        }
      },

      error => this.not.sendError(error)

    ).then( () => this.sendingData++ )

  }

  setParticipantsArray(users) {

    this.participants = []

    for(let user of users) {

      let participant = new EventParticipant();

      participant.user = user;
      participant.user_id = user.id;
      participant.event_id = this.event.id;
      participant.active = false;
      this.participants.push(participant);

    }

  }

  setParticipantsActive(parts) {

    for(let participant of parts) {

      for(let part of this.participants) {

        if(part.user_id == participant.user_id) {

          part.id = participant.id;
          part.cost = participant.cost;
          part.active = true;
          break;

        }

      }

    }

  }

}

