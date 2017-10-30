import { Reference } from './reference';
import { Schedule } from './schedule';
import { Payment } from './payment';
import { Salary } from './salary';

export class User {

    public id: number;
    public email:  string;
    public password: string;
    public name: string;
    public img: string;
    public birthday: string;
    public curp: string;
    public placeBirth: string;
    public gender: string;
    public phone: string;
    public insurance: string;

    public street: string;
    public hauseNumber: number;
    public colony: string;
    public city: string;

    public monthlyPaymentId: number;
    public userTypeId: number;
    public salaryId: number;
    public status:number;        

    public editable: boolean;
    public delete:boolean;
    public show:boolean;


    constructor(){
        this.editable = false;
    }


}    


