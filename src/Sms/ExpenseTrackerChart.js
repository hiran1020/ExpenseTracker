import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseTrackerChart = () => {
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        if (savedExpenses !== null) {
          const expenses = JSON.parse(savedExpenses);
          const todayStart = moment().startOf('day');
          const todayEnd = moment().endOf('day');
          // Filter expenses for today
          const todayExpenses = expenses.filter(expense =>
            moment(expense.date).isBetween(todayStart, todayEnd)
          );
          // Transform expense data into the format expected by LineChart
          const chartData = todayExpenses.map(expense => ({
            value: expense.amount,
            date: new Date(expense.date).getTime(),
            dateF: moment(expense.date).format('HH:mm'), // Convert date to milliseconds
            color: expense.amount >= 0 ? 'red' : 'green', // Assign green for increase, red for decrease
          }));
          setExpenseData(chartData);
        } else {
          setExpenseData([]);
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
        setError('Error loading expenses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseData();
  }, []);


  const generateXAxisLabels = () => {
    const labels = [];
    for (let i = 0; i < expenseData.length; i++) {
      const timestamp = expenseData[i].date;
      const formattedTime = moment(timestamp).format('HH:mm'); // Format timestamp as hour:minute
      labels.push(formattedTime);
    }
    console.log(labels)
    return labels;
  };
  

  return (
    <View >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View >
          <Text>Today's Expenses</Text>
          {expenseData.length > 0 ? (
            <LineChart
              data={expenseData}
              width={400}
              height={200}
              areaChart
              curved
              dataPointsColor1='red'
              isAnimated
              animationDuration={1500}
              startFillColor="#0BA5A4"
              startOpacity={1}
              endOpacity={0.3}
              initialSpacing={15}
              spacing={40}
              thickness={5}
              hideRules
              xAxisLabelsHeight={15}
              yAxisLabelSuffix='$'
              xAxisLabelTexts={generateXAxisLabels()}
              xAxisType='solid'
              yAxisColor="#0BA5A4"
              
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisColor="#0BA5A4"
              color="#0BA5A4"
              pointerConfig={{
                pointerStripHeight: 200,
                pointerStripColor: 'lightgray',
                pointerStripWidth: 2,
                pointerColor: 'lightgray',
                radius: 6,
                pointerLabelWidth: 100,
                pointerLabelHeight: 90,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: items => {
                  return (
                    <View
                      style={{
                        height: 90,
                        width: 100,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          marginBottom: 6,
                          textAlign: 'center',
                        }}>
                        {items[0].dateF}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 14,
                          paddingVertical: 6,
                          borderRadius: 16,
                          backgroundColor: 'white',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: items[0].color, // Assign color based on rate increase or decrease
                          }}>
                          {'$' + items[0].value + '.0'}
                        </Text>
                      </View>
                    </View>
                  );
                },
              }}
            />
          ) : (
            <Text>No expenses recorded for today</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ExpenseTrackerChart;
