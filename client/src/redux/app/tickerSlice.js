import { createSlice } from '@reduxjs/toolkit'


export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {
    pending: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },

    fulfilled: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },

    rejected: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

  },
})

export const { pending, fulfilled, rejected } = tickerSlice.actions

export default tickerSlice.reducer