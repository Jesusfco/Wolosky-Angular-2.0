import { Storage } from "./storage";

export class Url {
    public url: string;
    public basic: string;
    
        constructor() {
            this.basic = "http://www.woloskygimnasia.com/";
            // this.basic = "http://localhost:8000/"

            this.url = this.basic + 'api/';
        }

        static basicUrl = "http://www.woloskygimnasia.com/";
    // static basicUrl = 'http://localhost:8000/';

    static getApiUrlToken(link: string): string {
        return this.basicUrl + 'api/' + link + Storage.getTokenUrl();
    } 

    static getApiUrl() {
        return this.basicUrl + 'api/'        
    }
}
