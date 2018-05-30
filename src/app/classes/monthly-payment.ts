export class MonthlyPayment {
    public id:number;    
    public amount: number;
    public description: string;

    constructor(){
        this.amount = 0;
        this.description = null;
    }
}
