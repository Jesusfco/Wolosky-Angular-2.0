export class Salary {

    public id: number;
    public description: string;
    public amount: number;
    public bonus: number;
    public salary_type_id: number;   
    public salaryTypeView: string; 

    public validations = {
        amount: 0,
        bonus: 0,
        type: 0,
        validate: true
    };

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

    restoreValidations() {
        this.validations = {
            amount: 0,
            bonus: 0,
            type: 0,
            validate: true
        };
    }

    validate() {
        this.restoreValidations();
        this.validateAmount();
        this.validateBonus();
        this.validateType();
        return this.validations.validate;
    }

    validateAmount() {
        if(this.amount >= 0) {

        } else {
            this.validations.amount = 1;
            this.validations.validate = false;
        }
    }

    validateBonus() {

        if(this.bonus < 0 || this.bonus == null) {

            this.validations.bonus = 1;
            this.validations.validate = false;

        }

    }

    validateType() {

        if(this.salary_type_id == null || this.salary_type_id < 1) {

            this.validations.type = 1;
            this.validations.validate = false;

        }

    }

}
