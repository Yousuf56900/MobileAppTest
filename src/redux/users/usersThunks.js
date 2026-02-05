import axios from 'axios'
import { fetchStart, fetchSuccess, fetchError } from './usersSlice'

export const fetchUsers = (isRefresh = false) => async (dispatch, getState) => {
  try {
    dispatch(fetchStart())

    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!res.ok) {
      throw new Error('Failed to fetch users')
    }

    const data = await res.json()
    dispatch(fetchSuccess(data))
  } catch (err) {
    dispatch(fetchError(err.message || 'Something went wrong'))
  }
}

