import { createSlice } from '@reduxjs/toolkit'

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
        value: {
            dates: [],
            confirmed: [],
            deaths: []
        }
  },
  reducers: {
    updateData: (state, action) => {
        console.log(action)
      state.value = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateData } = chartSlice.actions

export default chartSlice.reducer