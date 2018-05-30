export class MonthlyPrice {

    public id: number;
    public hours: number;
    public cost: number;
    public created_at: string;
    public updated_at: string;
    public edit: boolean;

    constructor() {
        this.hours = 0;
        this.cost = 0;
        this.edit = false;
    }

    setData(data) {

        this.id = parseInt(data.id);
        this.hours = parseInt(data.hours);
        this.cost = parseFloat(data.cost);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

    }
}
