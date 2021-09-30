import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './searchSlice'

export default configureStore({
  reducer: {
    search: counterReducer,
  },
})