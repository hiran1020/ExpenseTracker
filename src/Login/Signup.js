import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


import styles from '../Styles';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('User signed up:', userCredential.user);
      // Navigate to the next screen or perform other actions upon successful signup
    } catch (error) {
      console.error('Signup error:', error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.login}>
      <Text style={styles.titleLogin}>Sign Up</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />

        <TouchableOpacity style={[styles.button, !email || !password ? styles.disabledButton : null]} disabled={!email || !password} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
};


export default SignUp;
