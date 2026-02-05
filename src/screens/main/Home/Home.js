import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
    FlatList,
    View,
    TextInput,
    Text,
    RefreshControl,
    TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../../../components/UserCard'
import OfflineBanner from '../../../components/OfflineBanner'
import UserSkeleton from '../../../components/UserSkeleton'
import { fetchUsers } from '../../../redux/users/usersThunks'
import useNetworkStatus from '../../../hooks/useNetworkStatus'
import styles from './styles'

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch()
    const { list, loading, error } = useSelector(s => s.users)
    const { isOnline } = useNetworkStatus()

    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const ITEM_HEIGHT = 96
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const onRefresh = async () => {
        setRefreshing(true)
        await dispatch(fetchUsers(true))
        setRefreshing(false)
    }

    const filteredUsers = useMemo(() => {
        if (!search.trim()) return list
        const q = search.toLowerCase()
        return list.filter(
            u =>
                u.name?.toLowerCase().includes(q) ||
                u.email?.toLowerCase().includes(q)
        )
    }, [search, list])
    const renderItem = useCallback(
        ({ item }) => (
            <UserCard
                user={item}
                onPress={() =>
                    navigation.navigate('Profile', { user: item })
                }
            />
        ),
        [navigation]
    )

    return (
        <View style={styles.container}>
            <OfflineBanner isOnline={isOnline} />

            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search users..."
                placeholderTextColor="#999"
                style={styles.search}
            />
            {error && !loading && (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={() => dispatch(fetchUsers(true))}>
                        <Text style={styles.retry}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}
            {loading && list.length === 0 ? (
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={i => i.toString()}
                    renderItem={() => <UserSkeleton />}
                />
            ) : (
                <FlatList
                    data={filteredUsers}
                    keyExtractor={i => i.id.toString()}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(data, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => dispatch(fetchUsers(true))}
                        />
                    }
                    ListEmptyComponent={
                        !loading && (
                            <Text style={styles.emptyText}>
                                No users found
                            </Text>
                        )
                    }
                    renderItem={renderItem}
                />
            )}
        </View>
    )
}
