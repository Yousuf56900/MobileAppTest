
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  userEmail: null,
  token: null,
  lastLogin: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true
      state.userEmail = action.payload.email
      state.token = action.payload.token
      state.lastLogin = Date.now()
    },
    logout() {
      return initialState
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
