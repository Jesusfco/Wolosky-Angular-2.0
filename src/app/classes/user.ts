import { ObjectJSONParser } from './../utils/classes/ObjectJSON';

import { MonthlyPayment } from './monthly-payment';
import { Reference } from '../classes/reference';
import { Schedule } from '../classes/schedule';
import { Payment } from '../classes/payment';
import { Salary } from '../classes/salary';
import { Url } from './url';

export class User {

    id: number = null;
    email:  string = '';
    password: string = '';
    name: string = '';
    img: string = '';
    birthday: string = '';
    curp: string = '';
    placeBirth: string = 'TUXTLA GUTIERREZ';
    gender: number = 1;
    phone: string = '';
    insurance: string = '';

    street: string = '';
    houseNumber: number = null;
    colony: string = '';
    city: string = 'TUXTLA GUTIERREZ';

    timer: any = {
        name: 0,
        email: 0
    }
    validations: any  = {
        validate: true,
        name: 0,
        email: 0,
        password: 0,
        monthlyPaymentAmount: 0,
        salaryAmount: 0
    };

    creator_user_id: number = null;
    monthly_payment_id: number;
    user_type_id: number = 1;
    salary_id: number;
    
    status: number;    
    created_at: string;
    updated_at: string;    

    salary: Salary = new Salary();
    monthly_payment: MonthlyPayment = new MonthlyPayment();
    schedules: Array<Schedule> = [];
    references: Array<Reference> = [];
    payments: Array<Payment> = [];

    constructor(){                        
    }

    setData(data) {
        this.id = 0
        this.creator_user_id = 0        
        ObjectJSONParser.set(data, this) 
        if(data.salary != undefined) {
            let sal = new Salary();
            sal.setValues(data.salary);
            this.salary = sal;
        }

        if(data.monthly_payment != undefined)             
            this.monthly_payment.setValues(data.monthly_payment);                    
       
        if(data.schedules != undefined) 
            this.receiveSchedules(data.schedules)
        

        if(data.references != undefined) {
            this.references = [];
            for(let re of data.references) {
                let r = new Reference();
                r.setValues(re);
                this.references.push(r);
            }
        }

    }

    setValues(data){
        
        this.name = data.name;        
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
        this.img = data.img;

        this.monthly_payment_id = data.monthly_payment_id;
        this.creator_user_id = data.creator_user_id;
        this.status = data.status;
        this.salary_id = data.salary_id;

        if(data.salary != undefined) {
            let sal = new Salary();
            sal.setValues(data.salary);
            this.salary = sal;
        }

        if(data.monthly_payment != undefined) {
            
            this.monthly_payment.setValues(data.monthly_payment);
            
        }
       
        if(data.schedules != undefined) 
            this.schedules = Schedule.convertToArray(data.schedules)

        if(data.references != undefined) {

            this.references = [];

            for(let re of data.references) {

                let r = new Reference();
                r.setValues(re);
                this.references.push(r);

            }

        }

        this.setImg();        

    }

    static storageAuthUser(user) {
        localStorage.setItem('userLogged', JSON.stringify(user))
    }

    static authUser() {
        let user = new User()
        let data = JSON.parse(localStorage.getItem('userLogged'))
        if(data == undefined)   return user      
        user.setData(data)
        return user
    }

    getStatusView() {
        if(this.status == 1) return 'Activo'
        if(this.status == 2) return 'Baja Temporal'
        if(this.status == 3) return 'Baja Definitiva'
        return ''
    }

    getUserTypeView() {
        if(this.user_type_id == 1) return 'Alumn@'
        if(this.user_type_id == 2) return 'Maestr@'
        if(this.user_type_id == 3) return 'Cajer@'
        if(this.user_type_id == 4) return 'Contador@'
        if(this.user_type_id == 5) return 'Escritor@'        
        if(this.user_type_id == 6) return 'Administrador'
        if(this.user_type_id == 7) return 'Desarrollador'
        return 'Desconocido'
    }

    get typeView() {
        if(this.user_type_id == 1) return 'Alumn@'
        if(this.user_type_id == 2) return 'Maestr@'
        if(this.user_type_id == 3) return 'Cajer@'
        if(this.user_type_id == 4) return 'Contador@'
        if(this.user_type_id == 5) return 'Escritor@'        
        if(this.user_type_id == 6) return 'Administrador'
        if(this.user_type_id == 7) return 'Desarrollador'
        return 'Desconocido'
    }

    get getImage() {
        let y: Url = new Url();
        
        if(this.img != null) {
            
            return y.basic + 'images/app/users/' + this.img;

        } else {

            this.img = y.basic + 'images/app/';

            if( this.gender == 1) {
                return this.img + 'man_avatar.png';
            } else {
                return this.img + 'woman_avatar.png';
            }
        }   
    }
    setImg() {
        let y: Url = new Url();
        
        if(this.img != null) {
            
            this.img = y.basic + 'images/app/users/' + this.img;

        } else {

            this.img = y.basic + 'images/app/';

            if( this.gender == 1) {
                this.img = this.img + 'man_avatar.png';
            } else {
                this.img = this.img + 'woman_avatar.png';
            }
        }    
    }

    setUpperCaseProperties() {
        this.nameUppercase()
        this.curpUpper()
        this.cityUpper()
        this.streetUpper()
        this.colonyUpper()
        this.seguroUpper()
    }

    validatePhoneFormat(){
        if(this.phone != null)
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

    receiveSchedules(sche) {
        this.schedules = []
        for(let d of sche) {
            let obj = new Schedule();
            obj.setValues(d)
            this.schedules.push(obj)            
        }
    }

}    


