export class Salary {

    public id: number;
    public description: string;
    public amount: number;
    public bonus: number;
    public salary_type_id: number;   
    public salaryTypeView: string; 

    constructor(){

        this.description = null;
        this.amount = 0;
        this.bonus = 0;
        this.salary_type_id = 1;
        this.salaryTypeView = this.returnSalaryView();

    }

    setValues(data) {
        this.id = parseInt(data.id);
        this.description = data.description;
        this.amount = parseFloat(data.amount);
        this.bonus = parseFloat(data.bonus);
        this.salary_type_id = parseInt(data.salary_type_id);
        this.salaryTypeView = this.returnSalaryView();

    }

    returnSalaryView(){
        if(this.salary_type_id == 1) return 'Hora';
        else if(this.salary_type_id == 2) return 'Quincenal';
    }

    

}
