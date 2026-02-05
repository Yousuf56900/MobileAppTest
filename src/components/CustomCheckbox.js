import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useTheme from '../utils/useTheme'

export default function CustomCheckbox({
  checked,
  onToggle,
  size = 22,
}) {
  const theme = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onToggle}
      style={[
        styles.box,
        {
          width: size,
          height: size,
          borderColor: checked ? theme.primary : theme.sub,
          backgroundColor: checked ? theme.primary : 'transparent',
        },
      ]}
    >
      {checked && (
        <Ionicons name="checkmark" size={size - 6} color="#fff" />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
