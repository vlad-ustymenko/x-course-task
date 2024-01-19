import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import booksReducer from './slices/booksSlice'
import filterReducer from './slices/filterSlice'
import signInReducer from './slices/sigIn'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: booksReducer,
    filter: filterReducer,
    signIn: signInReducer,
  },
})

export default store
