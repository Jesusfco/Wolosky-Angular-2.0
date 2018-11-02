export class Notificaction {

    public id: number;
    public status: number;
    public title: String;
    public description: String;

    constructor() {}

    setValues1( title, description) {
        this.status = 200;
        this.title = title;
        this.description = description;
    }
}