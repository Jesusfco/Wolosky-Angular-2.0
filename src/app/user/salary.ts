export class Salary {

    public id: number;
    public description: string;
    public amount: number;
    public bonus: number;
    public salaryTypeId: number;   
    public salaryTypeView: string; 

    constructor(){

        this.description = null;
        this.amount = null;
        this.bonus = 0;
        this.salaryTypeId = 1;
        this.salaryTypeView = this.returnSalaryView();

    }

    returnSalaryView(){
        if(this.salaryTypeId == 1) return 'Hora';
        else if(this.salaryTypeId == 2) return 'Día';
    }

    

}
