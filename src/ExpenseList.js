import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';

const ExpenseList = ({ onExpenseAdded }) => {
  const [expenseData, setExpenseData] = useState([]);


  useEffect(() => {
    const loadExpenseData = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        if (savedExpenses !== null) {
          setExpenseData(JSON.parse(savedExpenses).reverse());
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };

    loadExpenseData();
  }, [onExpenseAdded]);

  

  return (
    <View style={styles.expenseList}>
      <FlatList
        data={expenseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemList}>
            <View style={styles.descView}>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
            <View style={styles.amtView}>
              <Text style={styles.amt}>-{item.amount}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ExpenseList;
