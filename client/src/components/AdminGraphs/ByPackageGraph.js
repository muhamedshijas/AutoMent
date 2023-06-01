import React from 'react'
import Chart from "react-apexcharts";

function ByPackageGraph({byPackage}) {
    const categoryName=byPackage.map(item=>{
            return item._id
        })
        const categoryCount=byPackage.map(item=>{
            return item.count
        })

        console.log(categoryCount)
    const state = {

        series: categoryCount,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: categoryName,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };

    return (
        <div>
            <Chart
                options={state.options}
                series={state.series}
                type="pie"
                className={'w-100 dashboard-chart'}
                height={300}
            />
        </div>
    )
}

export default ByPackageGraph