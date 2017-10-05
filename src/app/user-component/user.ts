export class User {

    public id: number;
    public email:  string;
    public password: string;
    public name: string;
    public img: string;
    public birthday: any;
    public gender: string;
    public phone: string;
    public street: string;
    public hauseNumber: number;
    public colony: string;
    public city: string;
    public monthlyPaymentId: number;
    public userTypeId: number;
    public salaryId: number;
    public editable: boolean;

    constructor(){
        this.editable = false;
    }


    

}
