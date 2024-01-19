import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  price: 'Any Price',
  level: 'Any Level',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload
    },
    setLevelFilter: (state, action) => {
      state.level = action.payload
    },
    resetTitleFilter: (state) => {
      state.title = ''
    },
    resetFilters: (state) => {
      state.title = ''
      state.price = 'Any Price'
      state.level = 'Any Level'
    },
  },
})

export const {
  setTitleFilter,
  setPriceFilter,
  setLevelFilter,
  resetFilters,
  resetTitleFilter,
} = filterSlice.actions

export const selectTitleFilter = (state) => state.filter.title
export const selectPriceFilter = (state) => state.filter.price
export const selectLevelFilter = (state) => state.filter.level

export default filterSlice.reducer
