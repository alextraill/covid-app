import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { updateDate } from '../features/drillDownTable/drillDownTableSlice'

function CovidChart(props) {
    const dispatch = useDispatch()
 
    const chartData = {
        labels: props.data.dates,
        datasets:[
            {
                label: 'Confirmed cases',
                data: props.data.confirmed,
                backgroundColor: 'rgba(0, 0, 255, 0.6)'
            },
            {
                label: 'Deaths',
                data: props.data.deaths,
                backgroundColor: 'rgba(255, 0, 0, 0.6)'
            },
        ]
    }
    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Covid data ' + props.title,
                font: {
                    size: 25
                }
            },
            subtitle: {
                text: props.timeFrame,
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
                console.log(dateClicked)
                dispatch(updateDate(dateClicked))
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    }


  return (
      <div className="chart">
          <Bar
            data={chartData}
            options={options}
          />
      </div>
  );

}

export default CovidChart;