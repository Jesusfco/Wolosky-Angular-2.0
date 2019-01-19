import { User } from "./user";
import { Event } from "./event";

export class EventParticipant {  
    
    public id: number;
    public creator_id: number;
    public user_id: number;
    public user: User;
    public status: number;
    public creator: User;
    public cost: number;    
    public event_id: number;
    public event: Event;
    public created_at: String;
    public active: Boolean = false;

    constructor() {}

    setValues(data: any) {

        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);
        this.creator_id = parseInt(data.creator_id);
        this.event_id = parseInt(data.event_id);
        this.status = parseInt(data.status);
        this.cost = parseFloat(data.cost);
        this.created_at = data.created_at;

        if(data.user != undefined) {
            this.user = new User();
            this.user.setValues(data.user);
        }

        if(data.creator != undefined) {
            this.creator = new User();
            this.creator.setValues(data.creator);
        }

        if(data.event != undefined) {
            this.event = new Event();
            this.event.setValues(data.event);
        }

        if(this.status == 1) this.active = true;
        else this.active = false;

    }

    send(object) {
        
    }

    checkActive() {
        if(this.active) this.status = 1;
        else this.status = 0;
    }

}