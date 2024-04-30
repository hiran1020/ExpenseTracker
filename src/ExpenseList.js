import React from 'react'
import styles from './Styles'
import { View, Text,FlatList } from 'react-native'

const ExpenseList = ({expenseTracker}) => {
   
  return (
   
    <View style={styles.expenseList}>
  <FlatList
    data={expenseTracker.getExpense()}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({item}) => (
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

  
  )
}

export default ExpenseList