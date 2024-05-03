import auth from '@react-native-firebase/auth';

export const Logout = async () => {
  try {
    await auth().signOut();
    // Navigate to the login screen or perform other actions after logout
  } catch (error) {
    throw error;
  }
};
