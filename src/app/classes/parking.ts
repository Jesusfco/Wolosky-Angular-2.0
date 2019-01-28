import { User } from "./user";

export class Parking { 
    id: Number
    user: User
    creator: User
    user_id: Number
    creator_id: Number
    check_in: String
    check_out: String
    date_entry: String
    paid: Boolean
    amount: Number;
    created_at: String
    updated_at: String    

    setValues(data: any) {
        this.id = parseInt(data.id)
        this.user_id = parseInt(data.user_id)
        this.user_id = parseInt(data.user_id)
        this.amount = parseFloat(data.amount)
        this.check_in = data.check_in
        this.check_out = data.check_out
        this.date_entry = data.date_entry
        this.updated_at = data.updated_at
        this.created_at = data.created_at
        this.paid = data.paid

        if(data.user) {
            this.user = new User()
            this.user.setValues(data.user)
        }

        if(data.creator) {
            this.creator = new User()
            this.creator.setValues(data.creator)
        }
        
    }
}