import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateTimeFrame } from './timeFrameSlice'
import {Select, FormControl, InputLabel, MenuItem} from '@material-ui/core';

export function TimeFrame() {
  const timeFrame = useSelector(state => state.timeFrame.value)
  const dispatch = useDispatch()

  function handleTimeFrame(event) {
    let updatedTimeFrame = {
        text: event.target.value,
        amountDays: event.currentTarget.dataset.amount
    };
    dispatch(updateTimeFrame(updatedTimeFrame))
  };

  function getAllTime(){
    const startDate  = '2020-01-01';
    const diffInMs   = new Date() - new Date(startDate)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays
    }

  return (
    <div>
        <FormControl>
            <InputLabel id="demo-simple-select-label">Dates</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeFrame.text}
                onChange={handleTimeFrame}
            >
                <MenuItem value={"Last 7 days"} data-amount={7}>Last 7 days</MenuItem>
                <MenuItem value={"Last Month"} data-amount={30}>Last Month</MenuItem>
                <MenuItem value={"All time"} data-amount={getAllTime()}>All time</MenuItem>
            </Select>
        </FormControl>
    </div>
  )
}