import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function UserSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <View style={styles.lines}>
        <View style={styles.lineShort} />
        <View style={styles.lineLong} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#E0E0E0',
  },
  lines: {
    flex: 1,
    marginLeft: 10,
  },
  lineShort: {
    height: 10,
    width: '40%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  lineLong: {
    height: 10,
    width: '70%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
})
