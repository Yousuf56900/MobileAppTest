import React, { useState, memo } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useTheme from '../utils/useTheme'


function AppInput({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  secure = false,
  error,
  style,
}) {
  const theme = useTheme()
  const [hidden, setHidden] = useState(secure)

  return (
    <View style={style}>
      <View
        style={[
          styles.wrapper,
          {
            borderColor: error ? theme.danger : theme.border,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={theme.sub}
            style={styles.icon}
          />
        )}

        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.sub}
          style={[styles.input, { color: theme.text }]}
          secureTextEntry={hidden}
          onChangeText={onChangeText}
          onBlur={onBlur}
          autoCapitalize="none"
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setHidden(!hidden)}
          >
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={theme.sub}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text style={[styles.error, { color: theme.danger }]}>
          {error}
        </Text>
      )}
    </View>
  )
}

export default memo(AppInput)

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
})
