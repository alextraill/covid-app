import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addToStatesList, updateSelectedState } from './statesDropdownSlice'

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { getStateList } from '../../services/covidApi';


export function StatesDropdown() {
    const [value, setValue] = useState();
    const states = useSelector(state => state.statesDropdown.value.states)
    const dispatch = useDispatch()

    //Retrieves list of states in alphabetical order and adds them to global state StateList
    async function fetchStates() {
        const statesData = await getStateList()
        const statesList=[]
        for (const stateData of statesData) {
            statesList.push(stateData.region.province)
        }  
        dispatch(addToStatesList(statesList))
    }

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