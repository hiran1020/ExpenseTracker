import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './Styles';

const ExpenseList = ({ userId }) => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const expenseRef = firebase.database().ref(`expenses/${userId}`);
    
    const handleData = (snapshot) => {
      const expenses = snapshot.val();
      if (expenses) {
        const expenseArray = Object.values(expenses);
        const groupedExpenses = groupExpensesByDate(expenseArray.reverse());
        setExpenseData(groupedExpenses);
      }
    };

    // Attach listener for real-time updates
    expenseRef.on('value', handleData);

    // Detach the listener when component unmounts
    return () => expenseRef.off('value', handleData);
  }, [userId]);

  // Function to group expenses by date
  const groupExpensesByDate = (expenses) => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!groupedExpenses[date]) {
        groupedExpenses[date] = {
          expenses: [],
          totalAmount: 0,
        };
      }
      groupedExpenses[date].expenses.push(expense);
      groupedExpenses[date].totalAmount += expense.amount;
    });
    return groupedExpenses;
  };

  return (
    <View style={styles.expenseList}>
     <FlatList
  data={Object.keys(expenseData).reverse()}
  keyExtractor={(item) => item} // Use date as the key
  renderItem={({ item }) => (
    <View>
      <Text style={styles.dateGroup}>{item}</Text>
      <Text style={styles.dateAmount}>Total: {expenseData[item].totalAmount}</Text>
      <FlatList
        data={expenseData[item].expenses}
        keyExtractor={(expense, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <View style={styles.descView}>
              <Text style={styles.desc}>{item.exptype}</Text>
            </View>
            <View style={styles.amtView}>
              <Text style={styles.amt}>-{item.amount}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  )}
/>
    </View>
  );
};

export default ExpenseList;
