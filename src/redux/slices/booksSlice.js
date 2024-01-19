import { createSlice } from '@reduxjs/toolkit'
import books from '../../data/books'

const originalState = books.map((book) => {
  return { ...book, inCart: false, count: 1, initCount: 1 }
})

const initialState = originalState

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
  },
})

export const { setCountUpdate } = booksSlice.actions

export const selectBooksList = (state) => state.books

export default booksSlice.reducer
