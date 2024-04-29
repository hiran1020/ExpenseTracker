class ExpenseTracker {
    constructor() {
        this.expense = [];
        console.log('ExpenseTracker'.expense);
    }

    addExpense(expense) {
        this.expense.push(expense);
    }

    getExpense() {
        return this.expense;
    }

    getTotalExpense(){
        return this.expense.reduce((acc,curr) => acc + curr.amount,0);
    }
    
}



export default ExpenseTracker;
