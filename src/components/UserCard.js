import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useTheme from '../utils/useTheme'
import { toggleFavorite } from '../redux/users/usersSlice'
import Icon from 'react-native-vector-icons/Ionicons'

export default function UserCard({ user, onPress ,showComments=false}) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { favorites } = useSelector(state => state.users)
  const isFav = !!favorites[user.id]
  const note = favorites[user.id]?.note || ''

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${user.email}` }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: theme.text }]}>{user.name}</Text>
        <Text style={{ color: theme.sub }}>{user.company.name}</Text>
        <Text
          style={[styles.email, { color: theme.primary }]}
          onPress={() => Linking.openURL(`mailto:${user.email}`)}
        >
          {user.email}
        </Text>
        <Text style={{ color: theme.sub }}>{user.address.city}</Text>
        {showComments &&    <View style={styles.favRow}>
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(user.id))}>
            <Icon
              name={isFav ? 'heart' : 'heart-outline'}
              size={24}
              color={isFav ? 'red' : theme.sub}
            />
          </TouchableOpacity>

          {isFav && (
            <TextInput
              style={[styles.noteInput, { borderColor: theme.sub, color: theme.text }]}
              placeholder="Add a note..."
              placeholderTextColor={theme.sub}
              value={note}
              onChangeText={text =>
                dispatch(toggleFavorite({ id: user.id, note: text }))
              }
            />
          )}
        </View>}
     
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    margin: 10,
    borderRadius: 14,
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  name: { fontSize: 16, fontWeight: '700' },
  email: { marginTop: 4 },
  favRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  noteInput: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    paddingVertical: 2,
  },
})
