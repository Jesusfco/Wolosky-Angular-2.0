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
    public gender: number;
    public phone: string;
    public insurance: string;

    public street: string;
    public hauseNumber: number;
    public colony: string;
    public city: string;

    public creator_user_id: number;
    public monthly_payment_id: number;
    public user_type_id: number;
    public salary_id: number;
    public status:number;        


    constructor(){
        

        this.name = null;
        this.user_type_id = 1;
        this.phone = null;
        this.email = null;
        this.birthday = null
        this.placeBirth = null;
        this.curp = null;
        this.insurance = null;
        this.gender = 1;
        this.password = null;

        this.street = null;
        this.hauseNumber = null;
        this.colony = null;
        this.city = null;
    }


}    


