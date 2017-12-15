export class MonthlyPayment {
    public id:number;    
    public amount: number;
    public description: string;

    constructor(){
        this.amount = null;
        this.description = null;
    }
}
