import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'; // Import firebase here
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {Logout} from './Logout';
import LoginScreen from './Login';
import ExpenseItem from '../ExpenseItem';
import firebaseConfig from '../../android/app/google-services.json';



export default function LoginCheck() {
    const handleLogout = async () => {
        try {
          await Logout();
          console.log('Logout successful'); // Add a log statement for debugging
        } catch (error) {
          console.error('Logout error:', error.message);
          // Handle logout error
        }
      };
      
    

  // Initialize Firebase outside the component
  if (!firebase.apps.length) {
    console.log("Initializing Firebase...");
    firebase.initializeApp(firebaseConfig);
  }

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
     return (
       <LoginScreen />
      );
  }

  return (
    <View>
        <View style={{flexDirection:"row", justifyContent:"space-between", height:20}}>

      <Text>Welcome {user.email}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
        </View>
      <ExpenseItem />
    </View>
  );
}
