export class Receipt {

    id: number;
    user_id: number;
    user_name: string;
    creator_id: any;
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
    description: String;

    constructor() {

        let d = new Date();
        this.year = d.getFullYear();
        this.month = d.getMonth() + 1;

    }
}
