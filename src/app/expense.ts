
export class Expense {

    private id: number;
    private creator_id: number;
    private name: string;
    private description: string;
    private amount: number;
    private created_at: string;
    private updated_at: string;


    //public constructor(){}

	public constructor(id: number, creator_id: number, name: string, description: string, amount: number, created_at: string, updated_at:string) {

        this.id = id;
        this.creator_id = creator_id;
        this.name = name;
        this.description  = description;
        this.amount = amount;
        this.created_at = created_at;
        this.updated_at = updated_at;

	}
    

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $creator_id
     * @return {number}
     */
	public get $creator_id(): number {
		return this.creator_id;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Getter $amount
     * @return {number}
     */
	public get $amount(): number {
		return this.amount;
	}

    /**
     * Getter $created_at
     * @return {string}
     */
	public get $created_at(): string {
		return this.created_at;
	}

    /**
     * Getter $updated_at
     * @return {string}
     */
	public get $updated_at(): string {
		return this.updated_at;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $creator_id
     * @param {number} value
     */
	public set $creator_id(value: number) {
		this.creator_id = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public set $description(value: string) {
		this.description = value;
	}

    /**
     * Setter $amount
     * @param {number} value
     */
	public set $amount(value: number) {
		this.amount = value;
	}

    /**
     * Setter $created_at
     * @param {string} value
     */
	public set $created_at(value: string) {
		this.created_at = value;
	}

    /**
     * Setter $updated_at
     * @param {string} value
     */
	public set $updated_at(value: string) {
		this.updated_at = value;
	}
    

   
}
