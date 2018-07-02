import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value == null) return null;

    let time = value.split(':');

    if(time.lenght == 0) {
      return null;
    }

    time[0] = parseInt(time[0]);
          
    if(time[0] == 0) {

      return '12:' + time[1] + ' a.m';

    } else if (time[0] < 12) {

      return time[0] + ':' + time[1] + ' a.m';
       
    } else if (time[0] == 12) {

      return '12:' + time[1] + ' p.m';

    } else {

      return (time[0] - 12) + ':' + time[1] + ' p.m';

    }
    
  }

}
