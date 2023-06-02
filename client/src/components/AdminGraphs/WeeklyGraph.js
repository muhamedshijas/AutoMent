import React from 'react'
import Chart from "react-apexcharts";
function WeeklyGraph({weeklyData}) {
    const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories:["sun","mon","tue","wed","thu","fri","sat"]
      }
    },
    series: [
      {
        name: "series-1",
        data: weeklyData
      }
    ]
  };
  return <div>
    <Chart
      options={state.options}
      series={state.series} 
      type="bar"
      className={'w-100 dashboard-chart'}
      height={300}
    />
  </div>
}

export default WeeklyGraph