import React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import useTheme from '../../../utils/useTheme'
import styles from './styles'
import UserCard from '../../../components/UserCard'
export default function Favorites({ navigation }) {
    const theme = useTheme()
    const { favorites, list } = useSelector(state => state.users)

    const favUsers = list.filter(u => favorites[u.id])

    if (favUsers.length === 0) {
        return (
            <View style={[styles.emptyContainer, { backgroundColor: theme.bg }]}>
                <Text style={[styles.emptyTitle, { color: theme.text }]}>
                    No Favorites Yet ❤️
                </Text>
                <Text style={[styles.emptySub, { color: theme.sub }]}>
                    Add users to favorites to see them here.
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.bg }}>
            <FlatList
                data={favUsers}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingVertical: 8 }}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                        showComments
                        onPress={() =>
                            navigation.navigate('Profile', { user: item })
                        }
                    />
                )}
            />
        </View>
    )
}


