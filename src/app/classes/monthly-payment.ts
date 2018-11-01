export class MonthlyPayment {
    public id:number;    
    public amount: number;
    public description: string;

    constructor(){
        this.amount = 0;
        this.description = null;
    }

    setValues(data) {
        this.id = parseInt(data.id);
        this.amount = parseFloat(data.amount);
        this.description = data.description;
    }
}
