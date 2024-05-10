import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app'; 
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
        } catch (error) {
          // Handle logout error
        }
      };
      
    

  // Initialize Firebase outside the component
  if (!firebase.apps.length) {
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
    return subscriber;
     // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
     return (
       <LoginScreen />
      );
  }
 


  return (
    <View>
      <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor:'#2a2929',alignItems: "center", height: 30 }}>
        <Text style={{ fontSize: 16,color:'#ffff' }}>Welcome {user.email.split("@")[0]}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ fontSize: 16, color:'#ffff' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ExpenseItem  />
    </View>
  );
}  
