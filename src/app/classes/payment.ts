import { User } from "./user";

export class Payment {

    public id:number;
    public user_id: number;    
    public user: User = new User();
    public description: String;
    public amount: number;
    public status: number;        
    public date_from: String;
    public date_to: String;
    public payment_date: String;
    
    constructor(){
        this.user_id = null;
    }

    setValues(data) {
        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);
        this.description = data.description;
        this.amount = parseFloat(data.amount);
        this.status = parseInt(data.status);
        this.date_from = data.date_from;
        this.date_to = data.date_to;        
        this.payment_date = data.payment_date;
        if(data.user != undefined) {
            this.user.setValues(data.user);
        }
    }

    statusView() {
        if(this.status == 1) {
            return 'Por pagar';
        } else if(this.status == 2) {
            return 'Pagado';
        }

        return '';
        
    }

    

}
