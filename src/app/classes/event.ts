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

    public validations = {
        validated: true,
        name: 0,
        date: 0,
        cost: 0,
    };

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

    statusView() {
        return '';
    }

    validateAll() {
        this.restoreValidations();
        this.validateName();
        this.valdiateCost();
        this.validateDate();
    }
    
    validateName() {
        try
        {
            if(this.name == null || this.name.length < 4){
                this.validations.name = 1;
                this.validations.validated = false;
            }
        }
        catch (ex)
        {
        // Code to handle exception
        }
        
    }

    valdiateCost() {
        if(this.cost <=0 || this.cost == null) {
            this.validations.cost = 1;
            this.validations.validated = false;
        }
    }

    validateDate() {
        if(this.date == null || this.date.length == 0) {
            this.validations.date = 1;
            this.validations.validated = false;
        } else {

        }

    }

    restoreValidations() {
        this.validations = {
            validated: true,
            name: 0,
            date: 0,
            cost: 0,
        };
    }
}
