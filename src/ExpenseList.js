import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Styles';

const ExpenseList = () => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        if (savedExpenses !== null) {
          const expenses = JSON.parse(savedExpenses);
          const groupedExpenses = groupExpensesByDate(expenses);
          setExpenseData(groupedExpenses);
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };
    const intervalId = setInterval(() => {
      loadExpenses();
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const groupExpensesByDate = (expenses) => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (expense.amount >= 1) {
        if (!groupedExpenses[date]) {
          groupedExpenses[date] = {
            expenses: [],
            totalAmount: 0,
          };
        }
        groupedExpenses[date].expenses.push(expense);
        groupedExpenses[date].totalAmount += expense.amount;
      }
    });
    return groupedExpenses;
  };
  

  return (
    <View style={styles.expenseList}>
      <FlatList
  data={Object.keys(expenseData).sort((a, b) => new Date(b) - new Date(a))}
  keyExtractor={(item) => item}
  ListEmptyComponent={<Text style={styles.btnText}>No Expenses Yet !!!</Text>}
  renderItem={({ item }) => (
    <>
      <Text style={styles.dateGroup}>{item}</Text>
      <Text style={styles.dateAmount}>Total: {expenseData[item].totalAmount}</Text>
      {expenseData[item].expenses.map((expense, index) => (
        <View style={styles.itemList} key={index}>
          <View style={styles.descView}>
            <Text style={styles.desc}>{expense.exptype}</Text>
          </View>
          <View style={styles.amtView}>
            <Text style={styles.amt}>-{expense.amount}</Text>
            <Text style={styles.date}>{new Date(expense.date).toLocaleTimeString()}</Text>
          </View>
        </View>
      ))}
    </>
  )}
/>

    </View>
  );
};

export default ExpenseList;
