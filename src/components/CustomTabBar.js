import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        let icon
        if (route.name === 'Home') {
          icon = isFocused ? 'home' : 'home-outline'
        } else if (route.name === 'Favorites') {
          icon = isFocused ? 'heart' : 'heart-outline'
        } else if (route.name === 'Profile') {
          icon = isFocused ? 'person' : 'person-outline'
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <Ionicons
              name={icon}
              size={24}
              color={isFocused ? '#007AFF' : '#8E8E93'}
            />
            <Text
              style={[
                styles.label,
                isFocused && styles.labelFocused,
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  labelFocused: {
    color: '#007AFF',
    fontWeight: '600',
  },
})
