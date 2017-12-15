export class Schedule {

    public id: number;
    
    public day: number;
    public dayView: string;
    public checkIn: any;
    public checkOut: any;
    public active: boolean;
    public error: number;
    
    public user_id: number;

    constructor(){
        // if(this.day != null || this.day != ""){
        //     this.setDayView();
        // }
    }


    setDayView(){
        if(this.day == 1){ this.dayView = "Lunes" }
        else if(this.day == 2){ this.dayView = "Martes" }
        else if(this.day == 3){ this.dayView = "Miercoles" }
        else if(this.day == 4){ this.dayView = "Jueves" }
        else if(this.day == 5){ this.dayView = "Viernes" }
        else if(this.day == 6){ this.dayView = "Sábado" }
        else if(this.day == 7){ this.dayView = "Domingo" }
    }

    setArray(){
        let x = [
            {day: 1, checkIn: null, checkOut: null, dayView: 'Lunes', active: false, error: 0},
            {day: 2, checkIn: null, checkOut: null, dayView: 'Martes', active: false, error: 0},
            {day: 3, checkIn: null, checkOut: null, dayView: 'Miercoles', active: false, error: 0},
            {day: 4, checkIn: null, checkOut: null, dayView: 'Jueves', active: false, error: 0},
            {day: 5, checkIn: null, checkOut: null, dayView: 'Viernes', active: false, error: 0},
            {day: 6, checkIn: null, checkOut: null, dayView: 'Sabado', active: false, error: 0},
          ];

        return x;
    }
}
