import { User } from "./user"
import { ObjectJSONParser } from "../utils/classes/ObjectJSON"
import { Cash } from "./cash"

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

    static storeLastHistory(history) {
        localStorage.setItem('last_cash_history',  JSON.stringify(history));
    }

    static getLastHistory() {
        return JSON.parse(localStorage.getItem('last_cash_history'));
    }

    static decrementIfInLastCash(receipt){
        if(receipt.payment_type) return;

        
        let from = new Date(receipt.created_at)
        let last = CashboxHistory.getLastHistory()
        last = new Date(last.created_at)

        if(from < last) return;

        Cash.substractCash(receipt.amount)
        
    }
}