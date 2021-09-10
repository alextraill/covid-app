import { createSlice } from '@reduxjs/toolkit'

export const drillDownTableSlice = createSlice({
  name: 'drillDownTable',
  initialState: {
    value: {
        date: new Date().toISOString().split('T')[0],
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