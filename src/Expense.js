class Expense {
    constructor(id, description, amount,exptype ,date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.exptype = exptype;
        this.date = date || Date.now();
        
    }
}
export default Expense;
