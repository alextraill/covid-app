import { createSlice } from '@reduxjs/toolkit'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1);

export const drillDownTableSlice = createSlice({
  name: 'drillDownTable',
  initialState: {
    value: {
        date: yesterday.toISOString().split('T')[0],
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