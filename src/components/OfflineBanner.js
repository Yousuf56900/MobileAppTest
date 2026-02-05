import React, { useEffect, useRef } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import useTheme from '../utils/useTheme'

export default function OfflineBanner({ isOnline }) {
  const theme = useTheme()
  const slide = useRef(new Animated.Value(-60)).current

  useEffect(() => {
    Animated.timing(slide, {
      toValue: isOnline ? -60 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isOnline])

  if (isOnline) return null

  return (
    <Animated.View
      style={[
        styles.banner,
        { backgroundColor: theme.danger, transform: [{ translateY: slide }] },
      ]}
    >
      <Text style={styles.text}>You are offline – showing cached data</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  text: { color: '#fff', fontWeight: '600' },
})
