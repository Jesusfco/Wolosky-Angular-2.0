import { Schedule } from "../../classes/schedule";

export class ScheduleDay {
    schedules: Array<Schedule> = []
    day_id = 1


    static getScheduleDayArrayLD(){

        let array: Array<ScheduleDay> = []

        for(let i = 1; i <= 7; i++ ) {
            let day = new ScheduleDay()
            day.day_id = i
            array.push(day)
        }

        return array

    }

    static sortScheduleDayArray(array: Array<ScheduleDay>){

        for(let d of array){
            d.schedules.sort((a, b) => {
                if(a.check_in < b.check_in) return -1
                else if (a.check_in > b.check_in) return 1
                else return 0            
            })
        }

    }

    static setSchedulesToArray(array: Array<ScheduleDay>, schedules: Array<Schedule>){ 

        for(let day of array){
            for(let sche of schedules){
                if(day.day_id == sche.day_id){
                    day.schedules.push(sche)
                }
            }
        }

        ScheduleDay.sortScheduleDayArray(array)

    }

}