import { User } from "./user";

export class Record { 
    public id: number;
    public user_id: number;
    public user: User = new User();
    public checkIn: String;
    public checkOut: String;
    public date: String;
    
    constructor() {

    }

    setValues(data) {
        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);
        if(data.user != undefined) {
            this.user.setValues(data.user);
        }
        this.date = data.date;
        this.checkIn = data.checkIn;
        this.checkOut = data.checkOut;
    }
}