export class Storage {
    public token:string;
    public tokenRequest:string;
    public userName: string;
    public userEmail: string;
    public userId: number;
    public userType: number;

    constructor(){
        if(localStorage.getItem('token') !== null){
            this.token = localStorage.getItem('token');
            this.tokenRequest = "?token=" + this.token;
            this.userName = localStorage.getItem('name');
            this.userEmail = localStorage.getItem('email');
            this.userId = parseInt(localStorage.getItem('userId'));
            this.userType = parseInt(localStorage.getItem('typeUser'))
        }
    }
}
