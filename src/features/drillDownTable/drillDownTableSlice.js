import { createSlice } from '@reduxjs/toolkit'

export const drillDownTableSlice = createSlice({
  name: 'drillDownTable',
  initialState: {
    value: {
        date: "2021-09-07",
        UsStates: []
    }
  },
  reducers: {
    updateDate: (state, action) => {
      state.value.date = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateDate, pushToStateList } = drillDownTableSlice.actions

export default drillDownTableSlice.reducer