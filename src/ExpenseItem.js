import  auth  from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard, Alert,Modal } from 'react-native';


import styles from './Styles';
import DatePick from './DatePicker';
import ChartSms from './Sms/ChartSms';
import ExpenseList from './ExpenseList';
import Permission from './Sms/Permission';
import ExpenseTracker from './ExpenseTracker';
import DropdownReason from  './DropdownReason';
import SMSComponent from './Sms/NotificationListner';
import ExpenseTrackerChart from './Sms/ExpenseTrackerChart'


const ExpenseItem = () => {
    const currentUser = auth().currentUser;
    const [amount, setAmount] = useState('');
    const [exptype, setExptype] = useState('');
    const [chartData,setChartData]=useState([]);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [expenseData, setExpenseData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [expenseTracker, setExpenseTracker] = useState(new ExpenseTracker());


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (currentUser) {
            fetchExpenses();
        }
    }, [currentUser]);
    
    const updateChartData = async () => {
        try {
            const expenses = await expenseTracker.getExpenses(currentUser.uid);
            setChartData(updateExpenseList(expenses));
        } catch (error) {
            console.error('Error updating chart data:', error);
        }
    };
    

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
        const defaultExpenseType = 'Payment'; 
        const newExpense = {
            id: Math.floor(Math.random() * 100000000),
            description: description,
            amount: parseFloat(amount),
            exptype: exptype || defaultExpenseType,
            date: date.getTime()
        };
    
        if (currentUser) {
            if (amount === '') {
                handleAlert();
            } else {
                try {
                    // Add expense for the logged-in user
                    await expenseTracker.addExpense(newExpense, currentUser.uid);
                    // Fetch updated expenses after adding a new expense
                    fetchExpenses();
                    updateChartData();
                } catch (error) {
                    console.error('Error adding expense:', error);
                }
            }
        }
    
        // Clear input fields and dismiss keyboard
        setAmount('');
        setDescription('');
        setExptype('');
        setDate(new Date());
        Keyboard.dismiss();
    };    
    
    
    const formatDate = (date) => {
      return date.toLocaleDateString(); 
      // Use toLocaleDateString to format the date
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
            const currentDate = new Date();
            const sevenDaysAgo = new Date(currentDate);
            sevenDaysAgo.setDate(currentDate.getDate() - 7);
            //extract of seven days only
            console.log(sevenDaysAgo)
    
            Object.values(expenses).forEach((expense) => {
                const expenseDate = new Date(expense.date);
                if (expenseDate >= sevenDaysAgo && expenseDate <= currentDate) {
                    total += expense.amount;
                }
            });
        }
        return total;
    };

    const updateExpenseList = () => {
      setExpenseTracker(new ExpenseTracker()); 
    }


    const handleSMSData = (smsData) => {
        if (smsData) {
            smsData.forEach((data) => {
                // Check if an expense item with the same date and ID already exists
                const existingExpense = expenseTracker.getExpenseByDateAndId(data.date, data.id);
                
                if (!existingExpense) {
                    // If no existing expense found, add the new expense item
                    const newExpense = {
                        id: data.id,
                        description: data.description,
                        amount: data.amount,
                        exptype: data.exptype,
                        date: data.date
                    };
                    
                    console.log("Adding new expense:", newExpense);
                    
                    // Add the expense to the expense tracker
                    expenseTracker.addExpense(newExpense, currentUser.uid);
                } else {
                    // Log a message indicating that a duplicate expense item was found
                    console.log("Duplicate expense found. Skipping...");
                }
            });
        
            // Fetch updated expenses after adding new expenses
            fetchExpenses();
        } else {
            console.log("No SMS data received.");
        }
    };
    
    
    const DateFilter = {
        userId: currentUser.uid,
        onExpenseAdded: updateExpenseList,
        expenseTracker: expenseTracker
    };

    return (
        <View style={{backgroundColor:'#2a2929'}}>
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

                <SMSComponent onSMSData={handleSMSData} />
                <Permission />
                <TouchableOpacity  onPress={handleAddExpense}>
                    <Text style={styles.btnText}>Add Expense</Text>
                </TouchableOpacity>
                
            </View>
            <Text style={styles.totalExpenses}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
            <View>
            <ChartSms {...DateFilter} />
            </View>
            <TouchableOpacity onPress={openModal}>
                <Text style={styles.btnTextModel}>View Statements</Text>
            </TouchableOpacity>

            <Modal  
            style={{backgroundColor:'black'}}
            visible={isModalOpen} 
            onRequestClose={closeModal} >
                <View style={{backgroundColor:'#2a2929',flex:1,justifyContent:'space-evenly'}}>


                    <View style={styles.btn}> 

                        <ExpenseTrackerChart {...DateFilter} />
                    <View>
                        <ExpenseList {...DateFilter} />
                    </View>
                    </View>
                <TouchableOpacity onPress={closeModal}><Text style={styles.btnText}>Close</Text></TouchableOpacity>
                </View>
            </Modal>

{/* show last expense track */}
            <View>
  <ExpenseList {...DateFilter} />
</View>
            
            
        </View>
    );
};
 
export default ExpenseItem;
