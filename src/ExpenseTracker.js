import AsyncStorage from '@react-native-async-storage/async-storage';

class ExpenseTracker {
    constructor() {
        this.expense = [];
        //initializing array as empty
        this.loadExpenses(); 
        // Load expenses when creating a new instance
    }

    async loadExpenses() {
        try {
            const savedExpenses = await AsyncStorage.getItem('expenses');
            if (savedExpenses !== null) {
                this.expense = JSON.parse(savedExpenses);
            } else {
                this.expense = [];
            }
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
    }

    async saveExpenses() {
        try {
            await AsyncStorage.setItem('expenses', JSON.stringify(this.expense));
        } catch (error) {
            console.error('Error saving expenses:', error);
        }
    }

    addExpense(expense) {
        this.expense.push(expense);
        this.saveExpenses(); // Save expenses after adding a new expense
        console.log("------this-------",this); // Optionally log the updated tracker
    }

    getExpense() {
        return this.expense;
    }

    getTotalExpense(){
        if (this.expense && this.expense.length > 0) {
            return this.expense.reduce((acc, curr) => acc + curr.amount, 0);
        } else {
            return 0; // Return 0 if there are no expenses or if expense is undefined
        }
    }
}

export default ExpenseTracker;
