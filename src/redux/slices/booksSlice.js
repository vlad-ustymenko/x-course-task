import { createSlice, original } from '@reduxjs/toolkit'
import books from '../../data/books'

const state = books.map((book) => {
  return { ...book, inCart: false, count: 1, initCount: 1 }
})

const initialState = state

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCountUpdate: (state, action) => {
      const book = action.payload
      const stateArr = original(state)
      const newState = []
      stateArr.forEach((item) => {
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
