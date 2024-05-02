import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';

const ExpenseList = ({ onExpenseAdded }) => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const loadExpenseData = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        if (savedExpenses !== null) {
          // Parse the saved expenses
          const parsedExpenses = JSON.parse(savedExpenses);
          
          // Group expenses by date
          const groupedExpenses = groupExpensesByDate(parsedExpenses.reverse());

          // Set the grouped expenses
          setExpenseData(groupedExpenses);
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };

    loadExpenseData();
  }, [onExpenseAdded]);

  // Function to group expenses by date
  const groupExpensesByDate = (expenses) => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!groupedExpenses[date]) {
        groupedExpenses[date] = [];
      }
      groupedExpenses[date].push(expense);
    });
    return groupedExpenses;
  };

  return (
    <View style={styles.expenseList}>
      <FlatList
        data={Object.keys(expenseData)}
        keyExtractor={(item) => item} // Use date as the key
        renderItem={({ item }) => (
          <View>
            <Text style={styles.dateGroup}>{item}</Text>
            <FlatList
              data={expenseData[item]}
              keyExtractor={(expense, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemList}>
                  <View style={styles.descView}>
                    <Text style={styles.desc}>{item.description}</Text>
                  </View>
                  <View style={styles.amtView}>
                    <Text style={styles.amt}>-{item.amount}</Text>
                    <Text style={styles.date}>
                      {new Date(item.date).toLocaleTimeString()}
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
