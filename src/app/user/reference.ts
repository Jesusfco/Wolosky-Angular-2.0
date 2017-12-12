export class Reference {
    public id: number;
    public relationship: number;
    public relationshipView: string;
    public name: string;
    public phone: string;
    public email:string;

    constructor(){
        
    }

    setRelationshipView(){
        if(this.relationship == 1)this.relationshipView = 'Padres/Madre';
        else if(this.relationship == 2)this.relationshipView = 'Familiar';
        else if(this.relationship == 3)this.relationshipView = 'Herman@';
        else if(this.relationship == 4)this.relationshipView = 'Otro';
    }
}
