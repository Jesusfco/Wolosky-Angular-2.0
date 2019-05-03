import { ObjectJSONParser } from './../utils/classes/ObjectJSON';
import { User } from './user';
import { Sale } from './sale';

export class SaleDebt {
    public id: number;
    public user_id: number;
    public user: User;
    user_name: string = ''
    public sale_id: number;
    sale: any
    public status: boolean = false;
    
    public created_at: string = '';
    public updated_at: string = '';
    public updating: boolean;

    constructor() {
        this.updating = false;
    }

    setData(data) {
        this.id = 0
        this.user_id = 0
        this.sale_id = 0
        ObjectJSONParser.set(data, this)
        if(data.user) {
            this.user = new User()
            this.user.setData(data.user)
        }

        if(data.sale) {
            this.sale = new Sale()
            this.sale.setData(data.sale)
        }
    }

    get total(){
        let n = 0
        if(this.sale) {
            n = this.sale.total
        }

        return n
    }

}
