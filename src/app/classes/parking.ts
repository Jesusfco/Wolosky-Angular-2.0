import { User } from "./user";

export class Parking { 
    id: Number
    user: User = new User()
    creator: User = new User()
    user_id: Number
    creator_id: Number
    check_in: String
    check_out: String
    date_entry: String
    paid: Boolean
    amount: Number;
    created_at: String
    updated_at: String    
    validations = {
        date: 0,
        user: 0,
        amount: 0,
        check_in: 0,
        check_out: 0,
        validated: true
    }

    setValues(data: any) {
        this.id = parseInt(data.id)
        this.user_id = parseInt(data.user_id)
        this.user_id = parseInt(data.user_id)
        this.amount = parseFloat(data.amount)
        this.check_in = data.check_in
        this.check_out = data.check_out
        this.date_entry = data.date_entry
        this.updated_at = data.updated_at
        this.created_at = data.created_at
        this.paid = data.paid

        if(data.user) {
            this.user = new User()
            this.user.setValues(data.user)
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