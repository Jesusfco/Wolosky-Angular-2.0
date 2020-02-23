import { User } from "./user";
import { ObjectJSONParser } from "../utils/classes/ObjectJSON";

export class Record { 
    id: number;
    user_id: number;
    user: User = new User();
    checkIn: String = '';
    checkOut: String = '';    
    date: String = '';
    time_worked: String= ''
    time_extra: String  = '';
    type: number = 0
    observation: String = ''

    
    
    constructor() {

    }

    setValues(data) {
        this.id = 0
        this.user_id = 0
        ObjectJSONParser.set(data, this)
        if(data.user != undefined) {
            this.user.setData(data.user);
        }
        
    }

    typeView() {
        if(this.type == 0) return 'Normal'
        if(this.type == 1) return 'Entrada Previa'
        if(this.type == 2) return 'Sin horario relacionado'
        return ''
    }
}