import { createSlice } from '@reduxjs/toolkit'

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    data: [],
    isOn: true,
    time: 5000,
    status: null,
    error: null
  },
  reducers: {
    switcher: (state, action) => {
      state.isOn = action.payload
    },

    timeHandler: (state, action) => {
      state.time = action.payload
    },

    pending: (state) => {
      state.status = 'loading'
      state.error = null
    },

    fulfilled: (state, action) => {
      state.status = 'resolved'
      state.data = action.payload
    },

    rejected: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  }
})

export const { pending, fulfilled, rejected, timeHandler, switcher } = tickerSlice.actions

export default tickerSlice.reducer
