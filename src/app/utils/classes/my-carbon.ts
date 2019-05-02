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

    static getFromToThisMonth() {
        let d = new Date();
        let from = '';
        let to = '';
        if(d.getMonth() <= 7){
            from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-01";
            to = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
        } else if (d.getMonth() == 8){
            from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-01";
            to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
        } else {
            from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-01";
            to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
        }

        return  {
                    from: from,
                    to: to
                };

    }
}
