import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import styles from './Styles';
import Expense from './Expense';
import ExpenseList from './ExpenseList';
import ExpenseTracker from './ExpenseTracker';
 // Import the ExpenseTracker class

const ExpenseItem = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [expenseTracker, setExpenseTracker] = useState(new ExpenseTracker());
   // Initialize expenseTracker with a new instance
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const loadExpenseData = async () => {
      try {
        const storedTracker = new ExpenseTracker();
        await storedTracker.loadExpenses();
        setExpenseTracker(storedTracker);
        setTotalExpenses(storedTracker.getTotalExpense());
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };

    loadExpenseData();
  }, [description, amount]); 

  const handleAddExpense = () => {
    const newExpense = new Expense(
      Math.floor(Math.random() * 100000000),
      description,
      parseFloat(amount),
      date.getTime()
    );
    expenseTracker.addExpense(newExpense); // Modify the existing expenseTracker object
    setAmount('');
    setDescription('');
    setDate(new Date());
    setTotalExpenses(expenseTracker.getTotalExpense()); 
    Keyboard.dismiss();
  };

  const handleAlert = () => {
    Alert.alert(
      "Amount Please",
      "Please Add Amount in Amount Field to Records",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(); // Use toLocaleDateString to format the date
  };

  const updateExpenseList = () => {
    setExpenseTracker(new ExpenseTracker()); // Update the expenseTracker with a new instance
  };

  return (
    <View>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.form}>

   
      <TextInput
        placeholder="Enter Amount"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setAmount}
        value={amount}
      />
      <TextInput
        placeholder="Enter Description"
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        placeholder="Enter Date"
        style={styles.input}
        onChangeText={(text) => setDate(new Date(text))}
        value={formatDate(date)}
      />
      <TouchableOpacity styles={styles.button} title="Add Expense" onPress={amount?handleAddExpense:handleAlert} >
        <Text style={styles.btnText}>Add Expense</Text>
      </TouchableOpacity>
      </View>

        <Text style={styles.totalExpenses}>
            Total Expenses: ${(expenseTracker.getTotalExpense() ? expenseTracker.getTotalExpense() : 1235)}
        </Text>
        <ExpenseList onExpenseAdded={updateExpenseList} expenseTracker={expenseTracker} />

    </View>
  );
};

export default ExpenseItem;
