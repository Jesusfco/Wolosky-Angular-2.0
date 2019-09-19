import { MyCarbon } from './../utils/classes/my-carbon';
import { User } from "./user";
import { Event } from "./event";

export class Receipt {  

    id: number;
    user_id: number;    
    user: User = new User();
    creator_id: any;
    creator: User = new User();
    amount: number;
    payment: number;    
    event_id: any;
    event: Event = new Event()
    type: number = 1;
    month: number;
    year: number;
    description = '';
    days: number;
    payment_type: boolean;
    created_at: string = '0000-00-00 00:00:00'
    updated_at: string = '0000-00-00 00:00:00'

    monthly: number;
    monthlyAmount: number;

    constructor() {

        let d = new Date();
        this.year = d.getFullYear();
        this.month = d.getMonth() + 1;

        this.payment_type = false;

    }

    get creatorName() {
        if(this.creator) {
            return this.creator.name
        }

        return 'Desconocido'
    }
    get subtotal() {
        let x = this.amount;
        return (x * .84).toFixed(2);
    }

    get IVA(){
        let x = this.amount;
        return (x * .16).toFixed(2);
    }
    get descriptionView() {
        if(this.type == 0) return 'Recibo Tienda'
        if(this.type == 1) return 'Mensualidad ' + MyCarbon.monthToString(this.month) + ' ' + this.year
        if(this.type == 2) return 'Inscripción ' + this.year
        if(this.type == 3) return this.description                
        return ''
    }

    get paymentTypeView() {
        if(!this.payment_type ) 'Efectivo'
        if(this.payment_type) 'Tarjeta'
        return ''
    }
    setData(data) {
        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);        
        this.creator_id = parseInt(data.creator_id);
        this.amount = parseFloat(data.amount);
        this.payment = parseFloat(data.payment);
        this.event_id = parseInt(data.event_id);
        this.type = parseInt(data.type);
        this.month = parseInt(data.month);
        this.year = parseInt(data.year);
        this.description = data.description;
        this.days = parseInt(data.days);
        this.payment_type = false;
        if(parseInt(data.payment_type) == 1) 
            this.payment_type = true;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        if(data.user != undefined) {
            this.user.setValues(data.user);            
        }
        if(data.creator != undefined) {
            this.creator.setValues(data.creator);            
        }

        if(data.event != undefined) {
            this.event.setValues(data.event);            
        }

    }

    assignUserFromArrayUser(users: Array<User>) {
        

        
        if(this.user_id == null) {
            let user = new User()
            user.name = 'Sin Usuario Asignado'
            this.user = user;
            return;
        }

        for(let user of users) {

            if(user.id == this.user_id) {
                this.user = user
                break;
            }

        }

        if(this.user.id == null) {
            this.user.name = 'Usuario Eliminado'
        }

    }

    typeView() {
        if(this.type == 0) return 'Recibo Tienda'
        if(this.type == 1) return 'Mensualidad'
        if(this.type == 2) return 'Inscripción'
        if(this.type == 3) return 'Otros'
        // if(this.type == 4) return 'Uniforme'
        if(this.type == 5) return 'Evento'        
        return ''
        
    }

    monthView() {
        if(this.month == 1) {
            return 'Enero'
        } else if(this.month == 2) {
            return 'Febrero'
        } else if(this.month == 3) {
            return 'Marzo'
        } else if(this.month == 4) {
            return 'Abril'
        } else if(this.month == 5) {
            return 'Mayo'
        } else if(this.month == 6) {
            return 'Junio'
        } else if(this.month == 7) {
            return 'Julio'
        } else if(this.month == 8) {
            return 'Agosto'
        } else if(this.month == 9) {
            return 'Septiembre'
        } else if(this.month == 10) {
            return 'Octubre'
        } else if(this.month == 11) {
            return 'Noviembre'
        } else if(this.month == 12) {
            return 'Diciembre'
        }

        else return 'Mes no asignado'
        

    }

    static convertToArray(data: any): Receipt[] {
    
        let receipts: Array<Receipt> = [];
            for(let da of data) {
              let receipt = new Receipt();
              receipt.setData(da);
              receipts.push(receipt);
            }
        return receipts;
    
    }
}
