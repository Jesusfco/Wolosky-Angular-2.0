import { Storage } from "./storage";

export class Url {

    static basicUrl = "http://www.woloskygimnasia.com/";
    // static basicUrl = 'http://localhost:8000/';
    public url: string;
    public basic: string;
    
    constructor() {
        this.basic = Url.basicUrl            
        this.url = this.basic + 'api/';
    }        

    static getApiUrlToken(link: string): string {
        return this.basicUrl + 'api/' + link + Storage.getTokenUrl();
    } 

    static getApiUrlTokenWithVariables(link: string, variables): string {
        return this.basicUrl + 'api/' + link + Storage.getTokenUrl() + variables;
    } 
     getApiUrlToken(link: string): string {
        return Url.basicUrl + 'api/' + link + Storage.getTokenUrl();
    } 

    static getApiUrl() {
        return this.basicUrl + 'api/'        
    }
}
