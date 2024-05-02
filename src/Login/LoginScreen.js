import React from 'react'
import { View } from 'react-native'

import Login from './Login'
import SignUp from './SignUp'

const LoginScreen = () => {
  return (
    <View styles={{flex: 1}} >
    <Login />
    <View styles={{flex: 1,}}>
    <SignUp />
    </View>
  </View>
  )
}

export default LoginScreen