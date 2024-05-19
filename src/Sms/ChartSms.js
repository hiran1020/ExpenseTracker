import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../Styles';

const ChartSms = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        if (savedExpenses !== null) {
          const expenses = JSON.parse(savedExpenses);
          const groupedExpenses = groupExpensesByDate(expenses);
          setExpenseData(groupedExpenses);
          setError(null); // Clear any previous errors
        } else {
          setExpenseData({});
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
        setError('Error loading expenses');
      } finally {
        setLoading(false);
      }
    };

    const timer = setInterval(loadExpenses, 1000);

    return () => clearInterval(timer);
  }, []);

  const groupExpensesByDate = (expenses) => {
    const currentDate = new Date();
    const startOfWeek = moment().startOf('isoWeek'); // Set Monday as the start of the week
  
  
    const groupedExpenses = {
      Mon: { totalAmount: 0 },
      Tue: { totalAmount: 0 },
      Wed: { totalAmount: 0 },
      Thu: { totalAmount: 0 },
      Fri: { totalAmount: 0 },
      Sat: { totalAmount: 0 },
      Sun: { totalAmount: 0 },
    };
  
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
  
      if (date >= startOfWeek && date < currentDate) {
        const dayOfWeek = moment(date).format('ddd');
        groupedExpenses[dayOfWeek].totalAmount += expense.amount;
      }
    });
  
    return groupedExpenses;
  };
  
  
  
  
  
  

  return (
    <View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(14,164,164,0.5)" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
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
              verticalLabelRotation={9}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 8,
                // backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 1.5,
                color: (opacity = 1) => `rgba(14,164,164,0.5), ${opacity})`,
                barPercentage: 1,
                useShadowColorFromDataset: true,
              }}
              bezier
            />
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ChartSms;
