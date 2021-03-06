export class Reference {
    public id: number;
    public user_id: number;
    public relationship_id: number = 1;    
    public name: string = '';
    public phone: string = '';
    public phone2: string = '';
    public email: string = '';
    public work_place: string = '';
    public created_at: String = '';
    public updated_at: String = '';

    public updating: Boolean = false;

    public references: Array<any> = [];
    public beforeUpdate: any = null;

    public validations: any = {
        validate: true,
        name: 0,
        nuMail: 0,
        phone: 0,
        phone2: 0,
        email: 0,
      };

    constructor(){                
        
        
    }

    setValues(data) {
        this.id = parseInt(data.id);
        this.user_id = parseInt(data.user_id);
        this.relationship_id = parseInt(data.relationship_id);
        this.name = data.name;
        this.phone = data.phone;
        this.phone2 = data.phone2;
        this.email = data.email;
        this.work_place = data.work_place;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        
    }

    get relationshipView () {
        if(this.relationship_id == 1) return'Padres/Madre';
        else if(this.relationship_id == 2) return 'Hermano/a';
        else if(this.relationship_id == 3) return 'Familiares';
        else if(this.relationship_id == 4) return 'Amigos';
        else if(this.relationship_id == 5) return 'Compañeros de Trabajo';
        else if(this.relationship_id == 6)  return 'Otro';

        return ''
    }
    

    

    validateLengthPhone(){

        if(this.phone.length < 7){ 
            
            this.validations.phone = 1;
            this.validations.validate = false;
            
        } else if(this.phone.length > 10) { 
            
            this.validations.phone = 2;
            this.validations.validate = false;

        }

    }

    validateLengthPhone2(){

        if(this.phone2.length < 7){ 
            
            this.validations.phone2 = 1;
            this.validations.validate = false;
            
        } else if(this.phone2.length > 10) { 
            
            this.validations.phone2 = 2;
            this.validations.validate = false;

        }

    }


    validatePhoneFormat(){
        this.phone =  this.phone.replace(/\D/g, '');
        this.phone2 = this.phone2.replace(/\D/g, '');
    }

    setValuesFromData(x) {

        this.id = parseInt(x.id);
        this.name = x.name.toUpperCase();
        this.user_id = parseInt(x.user_id);
        this.relationship_id = parseInt(x.relationship_id);

        if(x.phone != null)
            this.phone = x.phone;
        if(x.phone2 != null)
            this.phone2 = x.phone2;
        if(x.email != null)
            this.email = x.email.toUpperCase();
        if(x.work_place != null)            
            this.work_place = x.work_place.toUpperCase();
        this.created_at = x.created_at;
        this.updated_at = x.updated_at;        

    }

    nameUpper() {
        // if()
        this.name = this.name.toUpperCase();

        this.validateName();
    }

    validateName() {
        let n = JSON.parse(JSON.stringify(this.name));
        
        if(this.name.length == 0) {

            this.validations.name = 1;
            this.validations.false = false;

        } else if ( this.name.length < 7){

            this.validations.name = 2;
            this.validations.false = false;

        } else {

            this.validations.name = 0;

            for(let r of this.references) {

                if(r.name == n.replace(/\s+$/, '')) {

                    if(this.updating == true) {
                        if(r.name == this.beforeUpdate.name) {
                            break;
                        }
                    }

                    this.validations.name = 3;
                    this.validations.false = false;
                    break;

                }

            }

        }

    }

    emailUpper() {
        this.email = this.email.toUpperCase();
        this.email = this.email.replace(/\s+$/, '');
        this.validateEmail();
    }

    validateEmail() {

        this.validations.email = 0;

       if ( this.email.length < 13){

            this.validations.email = 1;
            this.validations.false = false;

        } else {

            this.validations.email = 0;

            for(let r of this.references) {

                if(r.email == this.email) {

                    if(this.updating == true) {
                        if(r.email == this.beforeUpdate.email) {
                            break;
                        }
                    }
                    
                    this.validations.email = 2;
                    this.validations.false = false;
                    break;

                }

            }

            let re = /\S+@\S+\.\S+/;
            if(!re.test(this.email)) {
             
                this.validations.email = 3;
                this.validations.false = false;

            }

        }

    }

    work_placeUpper() {
        this.work_place = this.work_place.toUpperCase();
    }

    phone1Format(){
        this.phone = this.phone.replace(/\D/g,'');
        this.phone = this.phone.replace(/\s+$/, '');
    }

    phone2Format() {
        this.phone2 = this.phone2.replace(/\D/g,'');
        this.phone2 = this.phone2.replace(/\s+$/, '');
    }

    validateMailNumber(){

        if(this.phone.length > 0  || this.email.length > 0){
            this.validations.nuMail = 0;

        } else {

          this.validations.nuMail = 1;
          this.validations.validate = false;
        }

    }

    restoreValidationValues(){

        this.validations = {
          validate: true,
          name: 0,
          nuMail: 0,
          email: 0,
          phone: 0,
          phone2: 0,
        };
    
      }


    static getRelationshipOptions() {

        let relationshipOptions = [
            {
              value: 1,
              view: 'Padres/Madre'
            }, {
              value: 2,
              view: 'Hermano/a'
            }, {
              value: 3,
              view: 'Familiares'
            }, {
              value: 4,
              view: 'Amigos'
            }, {
              value: 5,
              view: 'Compañeros de trabajo'
            }
            , {
              value: 6,
              view: 'Otro'
            }
          ];

          return relationshipOptions;
    }

    validate() {

        this.restoreValidationValues();

        this.validateName();

        this.validateMailNumber();

        if(this.email.length !== 0) {
            this.validateEmail();
        }

        if(this.phone.length !== 0) {
            this.validateLengthPhone();
        }

        if(this.phone2.length !== 0) {
            this.validateLengthPhone2();
        }

        return this.validations.validate;
    }

    static convertToArray(data: any): Reference[] {
    
        let array: Array<Reference> = [];
            for(let d of data) {
              let obj = new Reference();
              obj.setValues(d);
              array.push(obj);
            }
        return array;
    
    }
}
