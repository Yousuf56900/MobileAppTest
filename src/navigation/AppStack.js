import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Profile from '../screens/main/Profile/Profile'
import AppTabs from'./tabStack'
const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  )
}
