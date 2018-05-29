export class Schedule {

    public id: number;
    
    public day_id: number;
    public dayView: string;
    public check_in: any;
    public check_out: any;
    public active: boolean;
    public error: number;
    public type: number;
    public created_at: String;
    public updated_at: String;
    
    public user_id: number;

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
        
        this.id = data.id;
        this.day_id = data.day_id;
        this.check_in = data.check_in;
        this.check_out = data.check_out;
        this.user_id = data.user_id;
        this.type = data.type;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
;

    }
}
