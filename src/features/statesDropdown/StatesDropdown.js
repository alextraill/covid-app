import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addToStatesList, updateSelectedState } from './statesDropdownSlice'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';


export function StatesDropdown() {
    const [value, setValue] = useState();
    const states = useSelector(state => state.statesDropdown.value.states)
    const dispatch = useDispatch()

  async function fetchStates() {
        const response = await axios.get('https://covid-api.com/api/reports?iso=USA&date=2021-09-07'); 
        let responseArray=response.data.data;
        responseArray.sort(function(a, b){
            if(a.region.province < b.region.province) { return -1; }
            if(a.region.province > b.region.province) { return 1; }
            return 0;
        })
        let statesList=[]
        for (let i = 0; i < responseArray.length; i++) {
            statesList.push(responseArray[i].region.province)
        }  
        dispatch(addToStatesList(statesList))
    };

    useEffect(() => {
        fetchStates();
    }, []);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          dispatch(updateSelectedState(newValue))
        }}
        id="controllable-states-demo"
        options={states}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="US States" variant="outlined" />}
      />
    </div>
  )
}