export class MyCarbon {

    static nowTimeStamp() {
        let x = new Date();
        let stamp = x.getFullYear() + "-";

        if(x.getMonth() < 9){
            stamp += "0" + (x.getMonth() + 1) + "-";
        } else {
            stamp += (x.getMonth() + 1) + "-";
        }

        if( x.getDate() < 9){
            stamp += "0" + (x.getDate() ) + " ";        
        }else {
            stamp += (x.getDate() ) + " ";
        }

        if(x.getHours() < 10){
            stamp += "0" + x.getHours() + ":";
        }
        else {
            stamp += x.getHours() + ":";
        }

        if( x.getMinutes() < 10) {
            stamp += "0" + x.getMinutes() + ":";
        } else {
            stamp += x.getMinutes() + ":";
        }

        if( x.getSeconds() < 10) {
            stamp += "0" + x.getSeconds();
        } else {
            stamp += x.getSeconds();
        }
        return stamp
    }

    static todayDateInput(){
        let d = new Date();
        let date = '';
        
        if(d.getMonth() <= 8){
            date = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-";
        
        } else {
            date = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-";        
        }

        if(d.getDate() < 10) 
            date += '0' + d.getDate()
        else date += d.getDate()

        return  date

    }

    static getFromToThisMonth() {
        let d = new Date();
        let lastDayMonth = new Date();

        lastDayMonth.setMonth(d.getMonth() + 1);
        lastDayMonth.setDate(0)
        let from = '';
        let to = '';
        if(d.getMonth() <= 8) {

            from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-01";
            to = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + lastDayMonth.getDate();        
            
        } else {
            from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-01";
            to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + lastDayMonth.getDate();
        }
        

        return  {
                    from: from,
                    to: to
                };

    }

    static monthToString(m) {
        if(m == 1) return 'Enero'
        if(m == 2) return 'Febrero'
        if(m == 3) return 'Marzo'
        if(m == 4) return 'Abril'
        if(m == 5) return 'Mayo'
        if(m == 6) return 'Junio'
        if(m == 7) return 'Julio'
        if(m == 8) return 'Agosto'
        if(m == 9) return 'Septiembre'
        if(m == 10) return 'Octubre'
        if(m == 11) return 'Noviembre'
        return 'Diciembre'
    }
    
    static getMonthsArrayForOptions() {
        return [
            {value: 1, view: 'Enero'},
            {value: 2, view: 'Febrero'},
            {value: 3, view: 'Marzo'},
            {value: 4, view: 'Abril'},
            {value: 5, view: 'Mayo'},
            {value: 6, view: 'Junio'},
            {value: 7, view: 'Julio'},
            {value: 8, view: 'Agosto'},
            {value: 9, view: 'Septiembre'},
            {value: 10, view: 'Octubre'},
            {value: 11, view: 'Noviembre'},
            {value: 12, view: 'Diciembre'},
        ]
    }

    static getYear(){
        var d = new Date()
        return d.getFullYear()
    }

    static getMonth() {
        var d = new Date()
        return d.getMonth() + 1
    }

    static getDate() {
        var d = new Date()
        return d.getDate()
    }

}
