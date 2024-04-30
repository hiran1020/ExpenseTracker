class ExpenseTracker {
    constructor() {
        this.expense = [];
    }

    addExpense(expense) {
        // Create a new instance of ExpenseTracker with updated expenses array
        const updatedTracker = new ExpenseTracker();
        updatedTracker.expense = [...this.expense, expense];
        return updatedTracker;
    }


    getExpense() {
        return this.expense;
    }

    getTotalExpense(){
        return this.expense.reduce((acc,curr) => acc + curr.amount,0);
    }
    
}



export default ExpenseTracker;
