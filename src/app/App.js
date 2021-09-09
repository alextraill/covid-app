import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import CovidChart from '../components/Chart';

import { TimeFrame } from '../features/timeFrame/TimeFrame';
import { useSelector } from 'react-redux'
import { DrillDownTable } from '../features/drillDownTable/DrillDownTable';
import { StatesDropdown } from '../features/statesDropdown/StatesDropdown';
import { CircularProgress } from '@material-ui/core'


function App() {
    const [data, setData] = useState({dates:[],confirmed:[],deaths:[]});
    const [isLoading, setIsLoading] = useState(false);
    const dateRange = useSelector(state => state.timeFrame.value)
    const selectedState = useSelector(state => state.statesDropdown.value.selectedState)


    async function fetchData() {
        setIsLoading(true);
        let dates = []
        let confirmed = []
        let deaths = []
        let data = []
            let date = new Date();
                for (let i = 0; i < dateRange.amountDays; i++) {
                    date.setDate(date.getDate() - 1);
                    if(selectedState === "none" || selectedState === null){
                        let response = await axios.get('https://covid-api.com/api/reports/total?iso=USA&date=' + date.toISOString().split('T')[0]);
                        data=response.data.data
                    }else{
                        let response = await axios.get('https://covid-api.com/api/reports?iso=USA&date=' + date.toISOString().split('T')[0] + '&region_province=' + selectedState);
                        data = response.data.data[0]
                    }
                        dates.unshift(data.date)
                        confirmed.unshift(data.confirmed)
                        deaths.unshift(data.deaths)
                }   
                setData({
                    dates:dates,
                    confirmed: confirmed,
                    deaths: deaths
                })
                setIsLoading(false);
    };

  
    useEffect(() => {
        setData({dates:[],confirmed:[],deaths:[]});
        fetchData();
    }, [dateRange, selectedState]);


  return (
    <div className="App">
        <div className="inputs">
            <TimeFrame/>
            <StatesDropdown/>
        </div>
        <div className="loader-chart">
                {isLoading && (
                    <CircularProgress 
                        size={100}
                    />
                )}
                </div>
        <CovidChart timeFrame={dateRange.text} data={data} title={selectedState==="none"? "USA" : selectedState}/>
        <DrillDownTable/>
    </div>
  );
}

export default App;
