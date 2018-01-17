export class Storage {
    public token:string;
    public tokenRequest:string;
    public userName: string;
    public userEmail: string;
    public userId: number;
    public userType: number;

    constructor(){
        if(localStorage.getItem('token') !== null){
            
            this.tokenRequest = "?token=" + this.token;

            this.userId = parseInt(localStorage.getItem('userId'));
            this.userType = parseInt(localStorage.getItem('userType'))
        }
    }

    getToken(){
        return localStorage.getItem('token');
    }

    getTokenUrl(){
        return '?token=' + this.getToken();
    }

    getUserName(){
        return localStorage.getItem('userName');
    }

    getUserEmail(){
        return localStorage.getItem('userEmail');
    }

    getUserId(){
        return parseInt(localStorage.getItem('userId'));
    }

    getUserType(){
        return parseInt(localStorage.getItem('userType'));
    }
}
