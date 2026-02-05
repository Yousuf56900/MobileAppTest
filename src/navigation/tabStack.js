import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/main/Home/Home'
import Favorites from '../screens/main/Favorites/Favorites'
import Profile from '../screens/main/Profile/Profile'
import CustomTabBar from '../components/CustomTabBar'

const Tab = createBottomTabNavigator()

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: true }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  )
}
