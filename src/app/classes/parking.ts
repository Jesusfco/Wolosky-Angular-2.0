import { User } from "./user";

export class Parking { 
    id: Number
    user_id: User
    creator_id: User
    check_in: String
    check_out: String
    date_entry: String
    status: Number
    amount: Number;
    created_at: String
    updated_at: String

}