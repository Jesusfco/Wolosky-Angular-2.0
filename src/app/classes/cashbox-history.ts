import { User } from "./user"
import { ObjectJSONParser } from "../utils/classes/ObjectJSON"

export class CashboxHistory {
    id
    amount
    allow
    creator_id
    creator: User = new User()
    created_at = ''

    setData(data) {
        
        this.id = 0
        this.creator_id = 0        
        this.amount = 0
        this.allow = 0        
        ObjectJSONParser.set(data, this)   
        
        if(data.creator) 
            this.creator.setData(data.creator)
        
    }
}