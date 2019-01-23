import { User } from "./user";

export class Receipt {

    id: number;
    user_id: number;    
    user: User = new User();
    creator_id: any;
    creator: User = new User();
    amount: number;    
    event_id: any;
    type: Number = 1;
    month: number;
    year: number;
    days: number;
    payment_type: boolean;
    created_at: string;
    updated_at: string;

    monthly: number;
    monthlyAmount: number;

    constructor() {

        let d = new Date();
        this.year = d.getFullYear();
        this.month = d.getMonth() + 1;

        this.payment_type = false;

    }
    setData(data) {
        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);        
        this.creator_id = parseInt(data.creator_id);
        this.amount = parseFloat(data.amount);
        this.event_id = parseInt(data.event_id);
        this.type = parseInt(data.type);
        this.month = parseInt(data.month);
        this.year = parseInt(data.year);
        this.days = parseInt(data.days);
        this.payment_type = false;
        if(parseInt(data.payment_type) == 1) 
            this.payment_type = true;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        if(data.user != undefined) {
            this.user.setValues(data.user);            
        }
        if(data.creator != undefined) {
            this.creator.setValues(data.creator);            
        }

    }

    assignUserFromArrayUser(users: Array<User>) {
        

        
        if(this.user_id == null) {
            let user = new User()
            user.name = 'Sin Usuario Asignado'
            this.user = user;
            return;
        }

        for(let user of users) {

            if(user.id == this.user_id) {
                this.user = user
                break;
            }

        }

        if(this.user.id == null) {
            this.user.name = 'Usuario Eliminado'
        }

    }
}
