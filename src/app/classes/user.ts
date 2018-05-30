import { Reference } from '../classes/reference';
import { Schedule } from '../classes/schedule';
import { Payment } from '../classes/payment';
import { Salary } from '../classes/salary';

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
    public houseNumber: number;
    public colony: string;
    public city: string;

    public timer: any;
    public validations: any;

    public creator_user_id: number;
    public monthly_payment_id: number;
    public user_type_id: number;
    public salary_id: number;
    public status:number;    
    public created_at: string;
    public updated_at: string;    

    constructor(){
        this.name = '';
        this.user_type_id = 1;
        this.phone = '';
        this.email = '';
        this.birthday = null;
        this.placeBirth = 'TUXTLA GUTIERREZ';
        this.curp = '';
        this.insurance = '';
        this.gender = 1;
        this.password = null;

        this.street = '';
        this.houseNumber = null;
        this.colony = '';
        this.city = 'TUXTLA GUTIERREZ';

        this.timer = {
            name: 0,
            email: 0
        };

        this.validations = {
            validate: true,
            name: 0,
            email: 0,
            password: 0,
            monthlyPaymentAmount: 0,
            salaryAmount: 0
        };
    }

    setValues(data){
        if(data.name != undefined)
            this.name = data.name;
        if(data.email != undefined)
            this.email = data.email;
        this.birthday =  data.birthday;
        this.id = data.id;
        this.phone = data.phone;
        this.user_type_id = data.user_type_id;
        this.placeBirth = data.placeBirth;
        this.curp = data.curp;
        this.insurance = data.insurance;
        this.gender = data.gender;
        this.street = data.street;
        this.houseNumber = data.houseNumber;
        this.colony = data.colony;
        this.city = data.city;

        this.monthly_payment_id = data.monthly_payment_id;
        this.creator_user_id = data.creator_user_id;
        this.status = data.status;
        this.salary_id = data.salary_id;
    }

    validatePhoneFormat(){
        this.phone = this.phone.replace(/\D/g, '');
    }

    nameUppercase(){    
        if(this.name != null || this.name != '')
          this.name = this.name.toUpperCase();                  
      }
    
    mailUpper(){
    if(this.email != null || this.email != '')
        this.email =  this.email.toUpperCase();
    }

    curpUpper(){
    if(this.curp != null)
        this.curp = this.curp.toUpperCase();    
    }

    placeUpper(){
    if(this.placeBirth != null)
        this.placeBirth =  this.placeBirth.toUpperCase();
    }

    seguroUpper(){
    if(this.insurance != null)
        this.insurance =  this.insurance.toUpperCase();
    }

    streetUpper(){
    if(this.street != null)
        this.street =  this.street.toUpperCase();
    }

    colonyUpper(){
    if(this.colony != null)
        this.colony = this.colony.toUpperCase();
    }

    cityUpper(){
    if(this.city != null)
        this.city = this.city.toUpperCase();
    }
}    

