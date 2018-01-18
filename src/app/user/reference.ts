export class Reference {
    public id: number;
    public user_id: number;
    public relationship_id: number;
    public relationshipView: string;
    public name: string;
    public phone: string;
    public email: string;

    constructor(){
        this.phone = '';
        this.email = '';
        this.relationship_id = 1;
    }

    setRelationshipView(){
        if(this.relationship_id == 1)this.relationshipView = 'Padres/Madre';
        else if(this.relationship_id == 2)this.relationshipView = 'Hermano/a';
        else if(this.relationship_id == 3)this.relationshipView = 'Familiares';
        else if(this.relationship_id == 4)this.relationshipView = 'Amigos';
        else if(this.relationship_id == 5)this.relationshipView = 'Compañeros de Trabajo';
        else if(this.relationship_id == 6)this.relationshipView = 'Otro';
    }

    validateLengthEmail(x){
        if(this.email.length < x){
            return false;
        } else { return true; }
    }

    validateLengthPhone(x){
        if(this.phone.length < x){
            return false;
        } else { return true; }
    }

    validateEmailFormat(){
        if(this.email.indexOf("@") > 0 && this.email.indexOf(".") > 0){
            return true;
        } else { return false; }
    }

    validatePhoneFormat(){
        this.phone =  this.phone.replace(/\D/g, '');
    }
}
