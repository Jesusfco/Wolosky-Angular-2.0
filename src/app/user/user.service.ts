import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  getUser(){
      
    return [{
        name: 'Jesus Fco Cortes',
        type: 5,
        phone: '9611221222',
        sexo: 1,      
      
      },{
        name: 'Diana Toledo Chida',
        type: 5,
        phone: '9611113543',
        sexo: 2,      
      }
      ];
    
  }

}
