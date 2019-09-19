import { ObjectJSONParser } from "../utils/classes/ObjectJSON";
import { User } from "./user";

export class Expense {

    id: number;
    creator_id: number;
    name: string = '';
    description: string = '';
    amount: number;
    created_at: string = '';
    updated_at: string = '';
    from_cashbox: boolean = true;

    creator: User = new User()


    //public constructor(){}

	public constructor() {}
    
    setData(data) {
        this.id = 0
        this.creator_id = 0        
        this.amount = 0
        this.from_cashbox = true
        ObjectJSONParser.set(data, this)   
        
        if(data.creator) 
            this.creator.setData(data.creator)
        
    }
 

   
    static convertToArray(data: any): Expense[] {
    
        let receipts: Array<Expense> = [];

        for(let da of data) {
            let d = new Expense()
            d.setData(da)
            receipts.push(d);
        }

        return receipts;
    
    }
}
