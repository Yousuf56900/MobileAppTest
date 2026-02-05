import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useTheme from '../../../utils/useTheme'
import { toggleFavorite } from '../../../redux/users/usersSlice'
import styles from './styles'
export default function Profile({ route }) {
  const { user } = route?.params
  const dispatch = useDispatch()
  const theme = useTheme()

  const isFav = useSelector(state => !!state.users.favorites[user.id])

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Image
          source={{ uri: `https://i.pravatar.cc/300?u=${user.email}` }}
          style={styles.avatar}
        />

        <Text style={[styles.name, { color: theme.text }]}>
          {user.name}
        </Text>

        <Text style={{ color: theme.sub }}>
          @{user.username}
        </Text>
        <TouchableOpacity
          style={[
            styles.favBtn,
            { backgroundColor: isFav ? '#FEE2E2' : theme.bg },
          ]}
          onPress={() => dispatch(toggleFavorite(user.id))}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={22}
            color={isFav ? '#DC2626' : theme.sub}
          />
          <Text
            style={{
              marginLeft: 6,
              color: isFav ? '#DC2626' : theme.text,
              fontWeight: '600',
            }}
          >
            {isFav ? 'Favorited' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <InfoRow
          icon="mail-outline"
          text={user.email}
          theme={theme}
        />
        <InfoRow
          icon="call-outline"
          text={user.phone}
          theme={theme}
        />
        <InfoRow
          icon="globe-outline"
          text={user.website}
          theme={theme}
        />
      </View>
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <SectionTitle title="Address" theme={theme} />
        <Text style={{ color: theme.sub }}>
          {user.address.suite}, {user.address.street}
        </Text>
        <Text style={{ color: theme.sub }}>
          {user.address.city}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <SectionTitle title="Company" theme={theme} />
        <Text style={{ color: theme.text, fontWeight: '600' }}>
          {user.company.name}
        </Text>
        <Text style={{ color: theme.sub }}>
          “{user.company.catchPhrase}”
        </Text>
      </View>
    </ScrollView>
  )
}



function InfoRow({ icon, text, theme }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color={theme.primary} />
      <Text style={[styles.rowText, { color: theme.text }]}>
        {text}
      </Text>
    </View>
  )
}

function SectionTitle({ title, theme }) {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
        color: theme.text,
      }}
    >
      {title}
    </Text>
  )
}




