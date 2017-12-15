export class Schedule {

    public id: number;
    
    public day: number;
    public dayView: string;
    public checkIn: any;
    public checkOut: any;
    
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
}
