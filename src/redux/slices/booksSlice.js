import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCountUpdate: (state, action) => {
      const book = action.payload
      const newState = []
      state.forEach((item) => {
        if (item.title === book.title) {
          newState.push(book)
        } else {
          newState.push(item)
        }
      })
      return newState
    },
    getBookList: (state, action) => {
      return action.payload
    },
  },
})

export const { setCountUpdate } = booksSlice.actions
export const { getBookList } = booksSlice.actions

export const selectBooksList = (state) => state.books

export default booksSlice.reducer
