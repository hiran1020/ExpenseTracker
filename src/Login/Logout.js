import auth from '@react-native-firebase/auth';

export const Logout = async () => {
  try {
    await auth().signOut();
    console.log('User logged out');
    // Navigate to the login screen or perform other actions after logout
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};
