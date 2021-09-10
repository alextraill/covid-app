import { createSlice } from '@reduxjs/toolkit'

export const statesDropdownSlice = createSlice({
  name: 'statesDropdown',
  initialState: {
    value: {
        states: [],
        selectedState: null
    }
  },
  reducers: {
    addToStatesList: (state, action) => {
        state.value.states = action.payload
    },
    updateSelectedState: (state, action) => {
        state.value.selectedState = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToStatesList, updateSelectedState } = statesDropdownSlice.actions

export default statesDropdownSlice.reducer