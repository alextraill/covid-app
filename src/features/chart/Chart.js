import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

import { updateData } from './chartSlice'
import { updateDate } from '../drillDownTable/drillDownTableSlice'

import { CircularProgress } from '@material-ui/core'
import { Bar } from 'react-chartjs-2';

export function Chart() {
    const dispatch = useDispatch()
    //const [data, setData] = useState({dates:[],confirmed:[],deaths:[]});
    const [isLoading, setIsLoading] = useState(false);
    const dateRange = useSelector(state => state.timeFrame.value)
    const selectedState = useSelector(state => state.statesDropdown.value.selectedState)
    const data = useSelector(state => state.chart.value)

    //Retrieves data for graph. Takes into account which timeFrame has been choosen and whether a state has been specified.
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
                    let response = await axios.get(`https://covid-api.com/api/reports/total?iso=USA&date=${date.toISOString().split('T')[0]}`);
                    data=response.data.data
                }else{
                    let response = await axios.get(`https://covid-api.com/api/reports?iso=USA&date=${date.toISOString().split('T')[0]}&region_province=${selectedState}`);
                    data = response.data.data[0]
                }
                dates.unshift(data.date)
                confirmed.unshift(data.confirmed)
                deaths.unshift(data.deaths)
            }   
            dispatch(updateData({
                dates:dates,
                confirmed: confirmed,
                deaths: deaths
            }))
        setIsLoading(false);
    }
  
    useEffect(() => {
        dispatch(updateData({
            dates:[],
            confirmed: [],
            deaths: []
        }))
        fetchData();
    }, [dateRange, selectedState]);
 
    const chartData = {
        labels: data.dates,
        datasets:[
            {
                label: 'Confirmed cases',
                data: data.confirmed,
                backgroundColor: 'rgba(0, 0, 255, 0.6)'
            },
            {
                label: 'Deaths',
                data: data.deaths,
                backgroundColor: 'rgba(255, 0, 0, 0.6)'
            },
        ]
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: `Covid data ${selectedState === "none" ? "USA" : selectedState}`,
                font: {
                    size: 25
                }
            },
            subtitle: {
                text: dateRange.text,
                display: true,
                font: {
                    size: 12,
                    style: 'italic'
                  },
            }
        },
        onClick: function(evt, element) {
            if(element.length > 0) {
                let dateClicked = chartData.labels[element[0].index];
                dispatch(updateDate(dateClicked))
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    }

  return (
    <div>
        <div className="loader-chart">
        {isLoading && (
            <CircularProgress 
                size={100}
            />
        )}
        </div>
      <div className="chart">
          <Bar
            data={chartData}
            options={options}
          />
      </div>
    </div>
  )
}