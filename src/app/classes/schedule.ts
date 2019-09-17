import { MonthlyPrice } from "../classes/monthly-price";

export class Schedule {  
    public id: number;
    
    public day_id: number;
    public dayView: string;
    public check_in: any;
    public check_out: any;
    public active: boolean;
    public error: number;
    
    public created_at: String;
    public updated_at: String;
    public edit: Boolean = false;
    
    public user_id: number;
    public user_name: String;

    constructor(){
        // if(this.day != null || this.day != ""){
        //     this.setDayView();
        // }
    }


    setDayView(){
        if(this.day_id == 1){ this.dayView = "Lunes" }
        else if(this.day_id == 2){ this.dayView = "Martes" }
        else if(this.day_id == 3){ this.dayView = "Miercoles" }
        else if(this.day_id == 4){ this.dayView = "Jueves" }
        else if(this.day_id == 5){ this.dayView = "Viernes" }
        else if(this.day_id == 6){ this.dayView = "Sábado" }
        else if(this.day_id == 7){ this.dayView = "Domingo" }
    }

    setArray(){
        let x = [
            {day_id: 1, check_in: null, check_out: null, dayView: 'Lunes', active: false, error: 0},
            {day_id: 2, check_in: null, check_out: null, dayView: 'Martes', active: false, error: 0},
            {day_id: 3, check_in: null, check_out: null, dayView: 'Miercoles', active: false, error: 0},
            {day_id: 4, check_in: null, check_out: null, dayView: 'Jueves', active: false, error: 0},
            {day_id: 5, check_in: null, check_out: null, dayView: 'Viernes', active: false, error: 0},
            {day_id: 6, check_in: null, check_out: null, dayView: 'Sabado', active: false, error: 0},
          ];

        return x;
    }

    setValues(data){
       
        this.id = parseInt(data.id);                        
        this.day_id = parseInt(data.day_id);           

        let check_in = data.check_in.split(':');
        let check_out = data.check_out.split(':');

        this.check_in = check_in[0] + ":" + check_in[1];
        this.check_out = check_out[0] + ":" + check_out[1];
        
        this.user_id = parseInt(data.user_id);
        
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

    }


    generateRamdomId() {
        this.id = Math.floor(Math.random() * 10000) * -1
    }

    static countHours(schedules) {

        let count = 0;
    
        for(let x of schedules) {
            
            let checkIn = new Date("2017-01-01 " + x.check_in);
            let checkOut = new Date("2017-01-01 " + x.check_out);
            count += checkOut.getHours() - checkIn.getHours();
          
        }

        let amount = 0;
        let monthlyPrices = JSON.parse(localStorage.getItem('monthlyPrices'));

        for(let x of monthlyPrices) {
            if(x.hours == count || x.hours > count) {
              amount = x.cost;
              break;
            }
          }
    
          if(amount == 0) {

            let i = monthlyPrices.length - 1;
            if( i >= 0) {
                amount = monthlyPrices[i].cost;
            }
    
            
    
          }
    

        return {
            hours: count,
            amount: amount
        };

      }

    getWeekDays() {

        return [            
            { day: 'Lunes', day_id: 1 },
            { day: 'Martes', day_id: 2 },
            { day: 'Miércoles', day_id: 3 },
            { day: 'Jueves', day_id: 4 },
            { day: 'Viernes', day_id: 5 },
            { day: 'Sábado', day_id: 6 },            
            { day: 'Domingo', day_id: 7 },
        ];

    }

}
