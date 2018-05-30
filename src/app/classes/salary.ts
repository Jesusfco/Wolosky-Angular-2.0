export class Salary {

    public id: number;
    public description: string;
    public amount: number;
    public bonus: number;
    public salary_type_id: number;   
    public salaryTypeView: string; 

    constructor(){

        this.description = null;
        this.amount = null;
        this.bonus = 0;
        this.salary_type_id = 1;
        this.salaryTypeView = this.returnSalaryView();

    }

    returnSalaryView(){
        if(this.salary_type_id == 1) return 'Hora';
        else if(this.salary_type_id == 2) return 'Día';
    }

    

}
