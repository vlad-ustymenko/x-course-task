import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: localStorage.getItem('user'),
}

const signInSlice = createSlice({
  name: 'sigIn',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      localStorage.setItem('user', action.payload)
      state.userName = localStorage.getItem('user')
    },
  },
})

export const { setUserName } = signInSlice.actions

export const selectUserName = (state) => state.signIn.userName

export default signInSlice.reducer
