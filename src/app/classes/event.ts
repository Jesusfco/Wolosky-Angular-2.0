import { Receipt } from './receipt';
import { EventParticipant } from './event-participant';

export class Event { 

    public id: number;
    public name: String;
    public description: String;
    public date: String;
    public date_to: String;
    public cost: number;
    public created_at: String;
    public updated_at: String;

    public event_participants: Array<EventParticipant> = [];
    public receipts: Array<Receipt> = [];

    public participants_count: number;
    public payoff_count: number;

    constructor() {}
     
    setValues(data) {

        this.id = parseInt(data.id);
        this.name = data.name;
        this.description = data.description;
        this.date = data.date;
        this.date_to = data.date_to;
        this.cost = parseFloat(data.cost);
        this.created_at = data.created_at;
        this.updated_at = data.created_at;

        this.participants_count = parseInt(data.participants_count);
        this.payoff_count = parseInt(data.payoff_count);

    }
    
}
