export class Reference {
    public id: number;
    public relationship: number;
    public relationshipView: string;
    public name: string;
    public phone: string;
    public email:string;

    constructor(){
        
        this.phone = null;
        this.email = null;
        this.relationship = 1;
    }

    setRelationshipView(){
        if(this.relationship == 1)this.relationshipView = 'Padres/Madre';
        else if(this.relationship == 2)this.relationshipView = 'Hermano/a';
        else if(this.relationship == 3)this.relationshipView = 'Familiares';
        else if(this.relationship == 4)this.relationshipView = 'Amigos';
        else if(this.relationship == 5)this.relationshipView = 'Compañeros de Trabajo';
        else if(this.relationship == 6)this.relationshipView = 'Otro';
    }
}
