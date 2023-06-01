import React from 'react'
import Chart from "react-apexcharts";

function AdminGraphs({ monthlyData }) {
  const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    series: [
      {
        name: "series-1",
        data: monthlyData
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

export default AdminGraphs