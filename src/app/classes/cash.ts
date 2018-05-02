export class Cash {

    id: number;
    amount: number;

    constructor() {}

    getAmount() {
        return parseInt( localStorage.getItem('userCash') );
    }

    addCash(cash) {
        let money = parseInt( localStorage.getItem('userCash') );
        localStorage.setItem('userCash', (money + cash).toString() );
    }

    substractCash(cash) {
        let money = parseInt( localStorage.getItem('userCash') );
        localStorage.setItem('userCash', (money - cash).toString() );
    }

}
