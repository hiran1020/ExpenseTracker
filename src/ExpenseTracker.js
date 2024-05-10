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

    async addExpense(expense) {
        this.expense.push(expense);
        await this.saveExpenses(); 
        // Save expenses after adding a new expense
    }

    async getExpenses() {
        return this.expense;
    }

    getTotalExpense(){
        if (this.expense && this.expense.length > 0) {
            return this.expense.reduce((acc, curr) => acc + curr.amount, 0);
        } else {
            return 0; 
            // Return 0 if there are no expenses or if expense is undefined
        }
    }

    getExpenseByDateAndId(date, id) {
        // Check if an expense with the given date and ID exists
        const expense = this.expense.find(expense => {
            return expense.id === id && new Date(expense.date).getTime() === new Date(date).getTime();
        });
        // Return the matching expense or undefined if not found
        return expense;
    }


    sortByDate() {
        this.expense.sort((a, b) => new Date(b.date) - new Date(a.date));
        //shorting by date
    }

    filterByDateRange(startDate, endDate) {
        return this.expense.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= startDate && expenseDate <= endDate;
        });
    }
}


export default ExpenseTracker;
