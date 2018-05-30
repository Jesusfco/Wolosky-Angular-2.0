export class Payment {

    public id:number;
    public user_id: number;
    public amount: number;
    public description: string;
    public date: string;
    
    constructor(){
        this.user_id = null;
    }
}
