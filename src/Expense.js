class Expense {
    constructor(id, description, amount, date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date || Date.now();
        
    }
}
export default Expense;
