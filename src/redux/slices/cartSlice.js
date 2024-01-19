import { createSlice } from '@reduxjs/toolkit'

const cartJson = localStorage.getItem('cart')

const initialState = JSON.parse(cartJson) || []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddToCart: (state, action) => {
      const book = action.payload
      const newState = []
      let coincidence = false
      if (state.length === 0) {
        localStorage.setItem('cart', JSON.stringify([...state, book]))
        return [...state, book]
      }
      state.forEach((item) => {
        if (item.title === book.title) {
          newState.push(book)
          coincidence = true
        } else {
          newState.push(item)
        }
      })
      if (coincidence !== true) {
        localStorage.setItem('cart', JSON.stringify([...newState, book]))

        return [...newState, book]
      }
      localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    },
    setClearCart: (state) => {
      return []
    },
    setRemoveFromCart: (state, action) => {
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.filter((item) => item.title !== action.payload.title)
        )
      )
      return state.filter((item) => item.title !== action.payload.title)
    },
  },
})

export const { setAddToCart, setClearCart, setRemoveFromCart } =
  cartSlice.actions

export const selectCart = (state) => state.cart

export default cartSlice.reducer
