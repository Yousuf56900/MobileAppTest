import React from 'react'
import { useSelector } from 'react-redux'
import AuthStack from './AuthStack'
import AppNavigation from './AppStack'

export default function RootNavigator() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  return isAuth ? <AppNavigation /> : <AuthStack />
}
