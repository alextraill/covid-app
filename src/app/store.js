import { configureStore } from '@reduxjs/toolkit'
import drillDownTableReducer from '../features/drillDownTable/drillDownTableSlice'
import statesDropdownReducer from '../features/statesDropdown/statesDropdownSlice'
import timeFrameReducer from '../features/timeFrame/timeFrameSlice'

export default configureStore({
  reducer: {
      timeFrame: timeFrameReducer,
      drillDownTable: drillDownTableReducer, 
      statesDropdown: statesDropdownReducer
  }
})