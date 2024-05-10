import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Styles';

const ExpenseList = ( ) => {
  const [expenseData, setExpenseData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    loadExpenses();
  }, [startDate, endDate]);

  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedExpenses !== null) {
        const expenses = JSON.parse(savedExpenses);
        const filteredExpenses = filterExpensesByDate(expenses, startDate, endDate);
        const groupedExpenses = groupExpensesByDate(filteredExpenses.reverse());
        setExpenseData(groupedExpenses);
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

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

  const filterExpensesByDate = (expenses, startDate, endDate) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  return (
    <View style={styles.expenseList}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>Start Date:</Text>
        <DatePickerIOS
          date={startDate}
          mode="date"
          onDateChange={handleStartDateChange}
          style={styles.datePicker}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>End Date:</Text>
        <DatePickerIOS
          date={endDate}
          mode="date"
          onDateChange={handleEndDateChange}
          style={styles.datePicker}
        />
      </View>
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
