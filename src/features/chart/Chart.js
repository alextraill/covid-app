import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateData, cleanData } from './chartSlice'
import { updateDate } from '../drillDownTable/drillDownTableSlice'

import { CircularProgress } from '@material-ui/core'
import { Bar } from 'react-chartjs-2';
import { getTotalStateData, getTotalUsaData } from '../../services/covidApi';

export function Chart() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const dateRange = useSelector(state => state.timeFrame.value)
    const selectedState = useSelector(state => state.statesDropdown.value.selectedState)
    const data = useSelector(state => state.chart.value)

    useEffect(() => {
        dispatch(cleanData({
            dates:[],
            confirmed: [],
            deaths: []
        }))
        fetchData();
    }, [dateRange, selectedState]);

    //Retrieves data for graph. Takes into account which timeFrame has been choosen and whether a state has been specified.
    async function fetchData() {
        setIsLoading(true);
        
        const date = new Date();
        
        const dailyDataProms = [];
        for (let i = 0; i < dateRange.amountDays; i++) {
            date.setDate(date.getDate() - 1);
            dailyDataProms.push(getDailyData(date));
        }
        const dailyDataList = await Promise.all(dailyDataProms);
        dailyDataList.reverse()

        for (const dailyData of dailyDataList) {
            if(dailyData != null){
                dispatch(updateData({
                    date:dailyData.date,
                    confirmed: dailyData.confirmed,
                    deaths: dailyData.deaths
                }))
            }
        }
        setIsLoading(false);
    }

    async function getDailyData(date ){
        let data = null;
        try{
            if(selectedState === null){
                data = getTotalUsaData(date)
            }else{
                data = getTotalStateData(date, selectedState)
            }
        }catch(err){
            //In case the API fails. If one of the requests fails the promise all doesn't return anything.
            console.error(`Failing silently for date: ${date}`);
        }
        return data;
    }

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
                text: `Covid data ${selectedState === null ? "USA" : selectedState}`,
                font: {
                    size: 25,
                    family:'roboto'
                }
            },
            subtitle: {
                text: dateRange.text,
                display: true,
                font: {
                    size: 12,
                    style: 'italic',
                    family: 'Open Sans'
                  },
            }
        },
        onClick: function(evt, element) {
            if(element.length > 0) {
                const dateClicked = chartData.labels[element[0].index];
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