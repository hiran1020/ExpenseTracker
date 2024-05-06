import '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import { LineChart } from 'react-native-chart-kit';
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from '../Styles';

const ChartSms = ({ userId }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpenseData] = useState({});

  useEffect(() => {
    const expenseRef = firebase.database().ref(`expenses/${userId}`);
    
    const handleData = (snapshot) => {
      try {
        const expenses = snapshot.val();
        if (expenses) {
          const expenseArray = Object.values(expenses);
          const groupedExpenses = groupExpensesByDate(expenseArray.reverse());
          setExpenseData(groupedExpenses);
        } else {
          setExpenseData({});
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError('Error fetching data');
      }
    };

    // Attach listener for real-time updates
    expenseRef.on('value', handleData);

    // Detach the listener when component unmounts
    return () => expenseRef.off('value', handleData);
  }, [userId]);


  //show chart of same week only if there is any expense
  
  const groupExpensesByDate = (expenses) => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); 
    // Start of the current week (Monday)
  
    const groupedExpenses = {
      Monday: { expenses: [], totalAmount: 0 },
      Tuesday: { expenses: [], totalAmount: 0 },
      Wednesday: { expenses: [], totalAmount: 0 },
      Thursday: { expenses: [], totalAmount: 0 },
      Friday: { expenses: [], totalAmount: 0 },
      Saturday: { expenses: [], totalAmount: 0 },
      Sunday: { expenses: [], totalAmount: 0 },
    };
  
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      // Check if the expense date is within the current week
      if (date >= startOfWeek && date < currentDate) {
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        // Add the expense to the corresponding day of the week
        groupedExpenses[dayOfWeek].expenses.push(expense);
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
