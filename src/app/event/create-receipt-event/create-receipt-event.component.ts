import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import { User } from '../../classes/user';
import { Receipt } from '../../classes/receipt';
import { EventParticipant } from '../../classes/event-participant';
import { Event } from '../../classes/event';


@Component({
  selector: 'app-create-receipt-event',
  templateUrl: './create-receipt-event.component.html',
  styleUrls: ['./create-receipt-event.component.css']
})
export class CreateReceiptEventComponent implements OnInit {

  @Input() event: Event
  @Input() sendingData
  @Input() participants: Array<EventParticipant>    
  @Input() receipts: Array<Receipt>
  @Input() users: Array<User>

  sugests: Array<User> = []
  search = ''
  amountValidate = 0;

  select: EventParticipant = new EventParticipant()
  payed = 0;
  view = 0;
  

  receipt: Receipt = new Receipt()

  constructor(private _http: EventService, private not: NotificationService) { 

  }

  ngOnInit() {

    this.receipt.event_id = this.event.id
    
  }

  searchSugest(key) {
    if(key.keyCode >=37 && key.keyCode <= 40 || key.keyCode == 13) return

    this.sugests = this.getSugests()

  }

  getSugests() {
    

    let search = this.search.replace(/\s+$/, '')

    if(this.search == '' || this.search == null) return []

    let users = this.users

    return users.filter(function(user){

      return (user.name.includes(search.toUpperCase()))
      
    })

  }

  setUserReceipt(user: User) {

    

    for(let part of this.participants) {

      if(part.user_id == user.id) {

        if(part.status!= 1) {
          this.view = 2
          return
        }

        Object.assign(this.select, part)        
        this.receipt.user_id = user.id
        this.setPayed()
        this.receipt.amount = this.select.cost - this.payed
        if(this.receipt.amount < 0) {
          this.receipt.amount = 0
        }
        this.view = 1
        setTimeout(() => document.getElementById('focus1').focus(), 50);
        break

      }

    }

  }

  setPayed() {
    this.payed = 0
    for(let receipt of this.receipts) {
      if(receipt.user_id == this.select.user_id) {
        this.payed += receipt.amount
      }
    }

  }

  createReceipt() {
    
    if(this.receipt.amount > 0) {
      this.amountValidate = 0;
    } else {
      this.amountValidate = 1;
    }

    if(this.amountValidate == 1) return

    this.sendingData++
    this._http.createReceipt(this.receipt).then(
      data => {

        let receipt = new Receipt();
        receipt.setData(data)
        this.receipts.push(receipt)
        this.view = 0
        this.not.sendNotification('Recibo Creado', 'El recibo del evento ha sido creado correctamente', 3500)

      }, error => this.not.sendError(error)

    ).then(() => this.sendingData--)
  }

}
