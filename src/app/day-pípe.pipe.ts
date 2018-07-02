import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayPipe'
})
export class DayPípePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let day;

    value = parseInt(value);

    if(value == 1) {

      return 'LUNES';

    } else if(value == 2) {

      return 'MARTES';

    } else if(value == 3) {

      return 'MIERCOLES';

    } else if(value == 4) {

      return 'JUEVES';

    } else if(value == 5) {

      return 'VIERNES';

    } else if(value == 6) {

      return 'SABADO';

    } else if(value == 7) {

      return 'DOMINGO';

    }

    return 'DIA NO ENCONTRADO';

  }

}
