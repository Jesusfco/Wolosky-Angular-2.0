import { User } from './user';
import { Record } from './record';
import { Schedule } from './schedule';
export class DayAnalized {

     
        day: Date = new Date();        
        records: Array<Record> = [];
        schedules: Array<Schedule> = [];
        status: number = 0;
        message: String = "";
        timeToWork = {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };

        timeWorked = {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };

        timeNotWorked = {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };         

    constructor() {}

    getAnalisis() {
        //Analisis de horas trabajadas y por trabajar
        for(let sche of this.schedules) {
          
            let checkInSchedule = new Date("2017-01-01 " + sche.check_in);
            let checkOutSchedule = new Date("2017-01-01 " + sche.check_out);
  
            this.setTimeToWork(checkInSchedule, checkOutSchedule);            
            
            let timeNotWorked1;
            let timeNotWorked2;     
  
            for(let record of this.records) {
              
              let checkInRecord = new Date("2017-01-01 " + record.checkIn);
              let checkOutRecord = new Date("2017-01-01 " + record.checkOut);
  
                if((checkInRecord <= checkInSchedule && checkOutRecord >= checkOutSchedule) ||
                    (checkInRecord > checkInSchedule && checkInRecord < checkOutSchedule) ||
                    (checkInRecord <= checkInSchedule && checkOutRecord < checkOutSchedule)
                ){
           
  
                    //Si llega puntual
                    if(checkInRecord <= checkInSchedule && checkOutRecord >= checkOutSchedule) {              
                        this.status = 1;
                    }
  
                    //Si llega tarde
                    if(checkInRecord > checkInSchedule) {
                        timeNotWorked1 = this.getTimeNotWorked(checkInRecord, checkInSchedule);
                        this.status = 2;
                    }
    
                    //si se va temprano
                    if(checkOutRecord < checkOutSchedule) {
                        timeNotWorked2 = this.getTimeNotWorked(checkOutSchedule, checkOutRecord);
                        this.status = 2;
                    }
  
                }
              
            }// FOR RECORDS IN DAY ANALIZED
            
        this.setTotalTimeNotWorked(timeNotWorked1, timeNotWorked2, );
  
          }
    }
    getTimeNotWorked(x, y) {

        let timeNotWorked = {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
    
        timeNotWorked.hours = x.getHours() - y.getHours();
        timeNotWorked.minutes = x.getMinutes() - y.getMinutes();
        timeNotWorked.seconds = x.getSeconds() - y.getSeconds();
    
        return timeNotWorked;
    
      }
    
      setTotalTimeNotWorked(x, y) {       
    
        if(x != null) {
          this.timeNotWorked.hours += x.hours;
          this.timeNotWorked.minutes += x.minutes;
          this.timeNotWorked.seconds += x.seconds;  
        }
    
        if(y != null) {
            this.timeNotWorked.hours += y.hours;
            this.timeNotWorked.minutes += y.minutes;
            this.timeNotWorked.seconds += y.seconds;
        } 
    
        while(this.timeNotWorked.seconds >= 60) {
            this.timeNotWorked.minutes++;
            this.timeNotWorked.seconds -= 60;
        }
    
        while(this.timeNotWorked.minutes >= 60) {
            this.timeNotWorked.hours++;
            this.timeNotWorked.minutes -= 60;
        }
    
        while(this.timeNotWorked.minutes < 0) {
            this.timeNotWorked.hours--;
            this.timeNotWorked.minutes += 60;
        }
    
        while(this.timeNotWorked.seconds < 0) {
            this.timeNotWorked.minutes--;
            this.timeNotWorked.seconds += 60;
        }            
    
      }
    
      setTimeToWork(checkInSchedule, checkOutSchedule) {    
    
        this.timeToWork.hours += checkOutSchedule.getHours() - checkInSchedule.getHours();
        this.timeToWork.minutes += checkOutSchedule.getMinutes() - checkInSchedule.getMinutes();
        this.timeToWork.seconds += checkOutSchedule.getSeconds() - checkInSchedule.getSeconds();
    
        while(this.timeToWork.seconds >= 60) {
          this.timeToWork.minutes++;
          this.timeToWork.seconds -= 60;
        }
    
        while(this.timeToWork.minutes >= 60) {
            this.timeToWork.hours++;
            this.timeToWork.minutes -= 60;
        }
    
        while(this.timeToWork.minutes < 0) {
            this.timeToWork.hours--;
            this.timeToWork.minutes += 60;
        }
    
        while(this.timeToWork.seconds < 0) {
            this.timeToWork.minutes--;
            this.timeToWork.seconds += 60;
        }            
    
      }
    
      setTimeWorked() {

        let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre']
        if(this.records.length == 0) {          
            this.timeNotWorked = this.timeToWork;    
        }
    
        this.timeWorked.hours = this.timeToWork.hours - this.timeNotWorked.hours;
        this.timeWorked.minutes = this.timeToWork.minutes - this.timeNotWorked.minutes;
        this.timeWorked.seconds = this.timeToWork.seconds - this.timeNotWorked.seconds;
    
        while(this.timeWorked.minutes < 0) {
            this.timeWorked.hours--;
            this.timeWorked.minutes += 60;
        }
    
        while(this.timeWorked.seconds < 0) {
            this.timeWorked.minutes--;
            this.timeWorked.seconds += 60;
        }        
    
      }

      getDayPipe() {       

      }

}
