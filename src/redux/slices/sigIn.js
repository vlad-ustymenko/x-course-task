import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: localStorage.getItem('login'),
}

const signInSlice = createSlice({
  name: 'sigIn',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload
    },
  },
})

export const { setUserName } = signInSlice.actions

export const selectUserName = (state) => state.signIn.userName

export default signInSlice.reducer
