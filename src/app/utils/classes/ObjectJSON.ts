export class ObjectJSONParser{ 
    
   
    static set(data, object){

        let atributes = Object.getOwnPropertyNames(object);        
        
        for(let atribute of atributes) {

            for(let key in data) {            
               
                if(atribute == key) {
                   

                    if(typeof object[atribute] === 'string')                        
                        object[atribute] = data[key];
                        
                    if(typeof object[atribute] === 'number')
                        object[atribute] = parseFloat(data[key]);                                            

                    if(typeof object[atribute] === 'boolean') 
                        object[atribute] = this.getBoolean(data[key]);
                    
                        

                }
            }
        
        }
        
    }

    static setWithoutParse(data, object){ 
        
        let atributes = Object.getOwnPropertyNames(object);        
        
        for(let atribute of atributes) {

            for(let key in data) {            
               
                if(atribute == key) {
                                       
                    object[atribute] = data[key];                                                                                        

                }
            }
        
        }
    }

    static getBoolean(value){
        switch(value){
             case true:
             case "true":
             case 1:
             case "1":
             case "on":
             case "yes":
                 return true;
             default: 
                 return false;
         }
     }

     
    
}