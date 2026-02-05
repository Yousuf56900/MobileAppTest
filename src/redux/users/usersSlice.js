
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  loading: false,
  error: null,
  favorites: {},
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true
      state.error = null
    },
    fetchSuccess(state, action) {
      state.loading = false
      state.list = action.payload
    },
    fetchError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    toggleFavorite(state, action) {
      if (typeof action.payload === 'object') {
        const { id, note } = action.payload;
        if (!state.favorites[id]) state.favorites[id] = { note: '' };
        state.favorites[id].note = note;
      } else {
        const id = action.payload;
        if (state.favorites[id]) delete state.favorites[id];
        else state.favorites[id] = { note: '' };
      }
    },

  },
})

export const { fetchStart, fetchSuccess, fetchError, toggleFavorite } = usersSlice.actions
export default usersSlice.reducer
