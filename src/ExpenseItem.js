import  auth  from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';


import styles from './Styles';
import DatePick from './DatePicker';
import ExpenseList from './ExpenseList';
import ExpenseTracker from './ExpenseTracker';
import DropdownReason from './DropdownReason';

const ExpenseItem = () => {
    const currentUser = auth().currentUser;
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [exptype, setExptype] = useState('');
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [expenseTracker, setExpenseTracker] = useState(new ExpenseTracker());

    useEffect(() => {
        if (currentUser) {
            fetchExpenses();
        }
    }, [currentUser]);

    const fetchExpenses = async () => {
        try {
            const expenses = await expenseTracker.getExpenses(currentUser.uid);
            // Calculate total expenses for the logged-in user
            setTotalExpenses(calculateTotalExpenses(expenses));
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleAlert = () => {
      Alert.alert(
        "Amount Please",
        "Please Add Amount in Amount Field to Records",
        [{ text: "OK"}],
        { cancelable: false }
      );
    };



    const handleAddExpense = async () => {
      const newExpense = {
          id :  Math.floor(Math.random() * 100000000),
          description: description,
          amount: parseFloat(amount),
          exptype: exptype,
          date: date.getTime()
      };
      if (currentUser) {

          if (amount === '') {
              handleAlert();
          } else {
          // Add expense for the logged-in user
          await expenseTracker.addExpense(newExpense, currentUser.uid);
          // Fetch updated expenses after adding a new expense
          fetchExpenses();
          }
      }
      setAmount('');
      setDescription('');
      setExptype('');
      setDate(new Date());
      Keyboard.dismiss();
  };
  
    const formatDate = (date) => {
      return date.toLocaleDateString(); // Use toLocaleDateString to format the date
    };
  
    const handleSelectDate = (selectedDate) => {
      setDate(selectedDate);
    };
    const handleExpType = (expType) => {
        setExptype(expType); // Set the selected expense type
      };

    const calculateTotalExpenses = (expenses) => {
        let total = 0;
        if (expenses) {
            Object.values(expenses).forEach((expense) => {
                total += expense.amount;
            });
        }
        return total;
    };

    const updateExpenseList = () => {
      setExpenseTracker(new ExpenseTracker()); 
    }

      

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
                   <DropdownReason
                    onSelectItem ={handleExpType}
                    
                   />
                <DatePick 
                onSelectDate={handleSelectDate} 
                    date={date} 
                    setDate={setDate} 
                     />

    
                <TouchableOpacity  onPress={handleAddExpense}>
                    <Text style={styles.btnText}>Add Expense</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.totalExpenses}>Total Expenses: ${totalExpenses}</Text>

            <ExpenseList userId={currentUser.uid} onExpenseAdded={updateExpenseList} expenseTracker={expenseTracker} />
            
        </View>
    );
};

export default ExpenseItem;
