import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from '../Styles';

const ChartSms = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const savedExpenses = await AsyncStorage.getItem('expenses');
      if (savedExpenses !== null) {
        const expenses = JSON.parse(savedExpenses);
        const groupedExpenses = groupExpensesByDate(expenses);
        setExpenseData(groupedExpenses);
      } else {
        setExpenseData({});
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error loading expenses:', error);
      setLoading(false);
      setError('Error loading expenses');
    }
  };

  const groupExpensesByDate = (expenses) => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); 
    // Start of the current week (Monday)
  
    const groupedExpenses = {
      Monday: { totalAmount: 0 },
      Tuesday: { totalAmount: 0 },
      Wednesday: { totalAmount: 0 },
      Thursday: { totalAmount: 0 },
      Friday: { totalAmount: 0 },
      Saturday: { totalAmount: 0 },
      Sunday: { totalAmount: 0 },
    };
  
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      // Check if the expense date is within the current week
      if (date >= startOfWeek && date < currentDate) {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        // Add the expense amount to the corresponding day of the week
        groupedExpenses[dayOfWeek].totalAmount += expense.amount;
      }
    });
  
    return groupedExpenses;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      {Object.keys(expenseData).length > 0 ? (
        <LineChart
          data={{
            labels: Object.keys(expenseData),
            datasets: [{
              data: Object.values(expenseData).map(data => data.totalAmount),
            }]
          }}
          width={500}
          height={256}
          verticalLabelRotation={1}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
          bezier
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default ChartSms;
