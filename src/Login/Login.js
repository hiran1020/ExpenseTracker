import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

import SignUp from './Signup';
import styles from '../Styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false); 
  const [isSignUPModalVisible, setIsSignUPModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      // Navigate to the next screen or perform other actions upon successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(resetEmail);
      setResetSuccess(true);
      setIsResetModalVisible(false); // Close the modal after successful reset
    } catch (error) {
      console.error('Password reset error:', error.message);
      setError(error.message);
    }
  };

  const toggleSignUpModal = () => {
    setIsSignUPModalVisible(!isSignUPModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleLogin}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.inputLogin}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputLogin}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, !email ? styles.disabledButton : null]} disabled={!email} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.buttonText} >Don't have an account? Create One </Text>
        <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => setIsSignUPModalVisible(true)}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>


        <Modal
        animationType="fade"
        transparent={true}
        visible={isSignUPModalVisible}
        onRequestClose={toggleSignUpModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SignUp />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsSignUPModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            {/* Add any additional content or buttons if needed */}
          </View>
        </View>
      </Modal>
      </View>
      </View>

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => setIsResetModalVisible(true)}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>



      {/* Reset Password Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isResetModalVisible}
        onRequestClose={() => setIsResetModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titleLogin}>Reset Password</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
              style={styles.inputLogin}
              placeholder="Email"
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={[styles.button, !resetEmail ? styles.disabledButton : null]} disabled={!resetEmail} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            {resetSuccess && (
              <Text style={styles.success}>Password reset email sent successfully</Text>
            )}
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setIsResetModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
