import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducer from '../redux/auth/authSlice'
import usersReducer from '../redux/users/usersSlice'

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated', 'userEmail', 'token', 'lastLogin'],
}

const usersPersistConfig = {
  key: 'users',
  storage: AsyncStorage,
  whitelist: ['favorites'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
export default store
