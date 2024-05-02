import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Text,View,TouchableHighlight } from 'react-native';

import styles from './Styles';

const DatePick = ({ onSelectDate, date, setDate }) => {
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    setDate(date.toLocaleString('en-US', options));
  };

  const selectDate = (date) => {
    setOpen(false);
    formatDate(date);
    onSelectDate(date);
  };

  return (
    <View>
        <TouchableHighlight
      style={styles.button}
      underlayColor="transparent"
        onPress={() => setOpen(true)}
      >
      <Text style={styles.buttonText}>Select Expense Date</Text>
    </TouchableHighlight>
      <DatePicker
        modal
        open={open}
        date={new Date()}
        onConfirm={(selectedDate) => {
          selectDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        buttonColor="#9A2BE1"
        dividerColor="#9A2BE1"
      />
    </View>
  );
};

export default DatePick;
