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
        state.value.dates = [...state.value.dates, action.payload.date]
        state.value.confirmed = [...state.value.confirmed, action.payload.confirmed]
        state.value.deaths = [...state.value.deaths, action.payload.deaths]
    },
    cleanData: (state, action) =>{
        state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateData, cleanData } = chartSlice.actions

export default chartSlice.reducer