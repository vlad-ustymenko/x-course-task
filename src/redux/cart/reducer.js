import * as a from './actionTypes'

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD__BOOK:
      return [...state, action.payload]
    default:
      return state
  }
}
export default cartReducer
