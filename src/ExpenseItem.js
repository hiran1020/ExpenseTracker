import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import ExpenseTracker from './ExpenseTracker';
import styles from './styles';

const ExpenseItem=()=>{
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [expenseTracker, setExpenseTracker] = useState(new ExpenseTracker);


    const handleAddExpense = () => {
        const newExpense = new Expense(Math.floor(Math.random() * 100000000), description, parseFloat(amount),Date.now());
        expenseTracker.addExpense(newExpense);
        setDescription('');
        setAmount('');
        setDate(new Date());
        setExpenseTracker(new ExpenseTracker(expenseTracker.expense)); // Resetting the state with new instance
      };

      const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };


    return(
        <View>
            <View>
                <Text>Expense Tracker</Text>
            </View>
            <TextInput
                placeholder="Enter Amount"
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setAmount(text)}
                value={amount}            
            />
            <TextInput
                placeholder="Enter Description"
                style={styles.input}
                onChangeText={(text) => setDescription(text)}
                value={description}
            />
            <TextInput
                placeholder="Enter Date"
                style={styles.input}
                value={formatDate(date)}
                onChangeText={text => setDate(new Date(text))}
            />
            <Button
                title="Add Expense"
                onPress={handleAddExpense}
            />
             <ExpenseItem expenses={expenseTracker.getExpense()} />
             <Text>Total Expenses: ${expenseTracker.getTotalExpense()}</Text>

        </View>

        )

}


export default ExpenseItem