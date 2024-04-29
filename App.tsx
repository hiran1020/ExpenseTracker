import { View, Text } from 'react-native'
import React from 'react'
import ExpenseItem from './src/ExpenseItem'

const App = () => {
  return (
    <View>
      <Text>EXPENSE TRACKER-HIRAN</Text>
      <ExpenseItem />
    </View>
  )
}

export default App;