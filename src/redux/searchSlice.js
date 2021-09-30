import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    setSearchStore: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setSearchStore } = searchSlice.actions

export default searchSlice.reducer