import { createSlice } from '@reduxjs/toolkit'

export const timeFrameSlice = createSlice({
  name: 'timeFrame',
  initialState: {
    value: {
        text: "Last 7 days",
        amountDays:7
    }
  },
  reducers: {
    updateTimeFrame: (state, action) => {
      state.value.text = action.payload.text
      state.value.amountDays = action.payload.amountDays
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateTimeFrame } = timeFrameSlice.actions

export default timeFrameSlice.reducer