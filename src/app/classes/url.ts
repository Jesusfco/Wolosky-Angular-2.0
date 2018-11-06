export class Url {
    public url: string;
    public basic: string;
    
        constructor() {
            this.basic = "http://www.woloskygimnasia.com/";
            this.basic = "http://localhost:8000/";

            this.url = this.basic + 'api/';
        }
}
