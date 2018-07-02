import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleComponentPipe'
})
export class ScheduleComponentPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    value = parseInt(value);

    if(value == 0) {

      return '12 A.M';

    } else if (value < 12) {

      return value + ' A.M';

    } else if( value == 12) {

      return value + 'P.M';

    } else if(value < 24){

      return (value - 12) + ' P.M';

    }

    return 'FUERA PARAMETROS';
    
  }

}
