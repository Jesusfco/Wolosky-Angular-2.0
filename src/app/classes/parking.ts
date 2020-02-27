import { User } from "./user";
import { ObjectJSONParser } from "../utils/classes/ObjectJSON";

export class Parking {
  static convertToArray(data: any): Parking[] {
    
    let array: Array<Parking> = [];
        for(let da of data) {
          let obj = new Parking();
          obj.setData(da);
          array.push(obj);
        }
    return array;

}
    id: Number
    user: User = new User()
    creator: User = new User()
    user_id: Number
    creator_id: Number
    check_in: String= ""
    check_out: String= ""
    date_entry: String = ""
    paid: Boolean = false
    amount: Number = 0;
    created_at: String = ""
    updated_at: String = ""
    validations = {
        date: 0,
        user: 0,
        amount: 0,
        check_in: 0,
        check_out: 0,
        validated: true
    }

    setData(data: any) {
        this.id = 0
        this.user_id = 0
        this.creator_id = 0        
        ObjectJSONParser.set(data, this) 

        if(data.user) {
            this.user = new User()
            this.user.setData(data.user)
        }

        if(data.creator) {
            this.creator = new User()
            this.creator.setValues(data.creator)
        }
        
    }

    validateUserSelected() {
        if(this.user_id == null) {
            this.validations.user = 1
            this.validations.validated = false
        }
    }

    validateDate() {
        if(this.date_entry ==  null){
            this.validations.date = 1
            this.validations.validated = false
        }

    }

    validateCheckIn() {
        if(this.check_in == null) {
            this.validations.check_in = 1;
            this.validations.validated = false;
        }
    }

    validateCheckOut() {
        if(this.check_out == null) {
            this.validations.check_out = 1;
            this.validations.validated = false;
        }
    }

    validateAmount() {
        if(this.amount == null) {
            this.validations.amount = 1;
            this.validations.validated = false;
        }
    }

    restoreValidations() {
        this.validations = {
            date: 0,
            user: 0,
            amount: 0,
            check_in: 0,
            check_out: 0,
            validated: true
        }
    }

    validationForCreate() {

        this.restoreValidations()

        this.validateCheckIn()
        this.validateDate()
        this.validateUserSelected()

        return this.validations.validated

    }

    setActualDate() {

        let d = new Date();

        if (d.getMonth() <= 8) {
    
          this.date_entry = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-";      
    
        } else {
    
          this.date_entry = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-";      
          
        }

        if(d.getDate() < 10) this.date_entry += "0" + d.getDate()
            
        else this.date_entry += d.getDate().toString()

    }

    getActualTime() {
        let d = new Date()

        let time = ''

        if(d.getHours() < 10) time = '0' + d.getHours() + ':'
        else time = d.getHours + ':'

        if(d.getMinutes() < 10) time += '0' + d.getMinutes() 
        else time +=  d.getMinutes() 

        return time
    }

    paidView() {
        if(this.paid) return 'Pagado'
        return 'Por Entregar'
    }

}