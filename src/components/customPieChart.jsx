import React from 'react'
import Plot from 'react-plotly.js'

export default function CustomPieChart(props){
    const{scenarioData, scenarioLabels, width, height, colors} = props

    var data = [
        {
            values: scenarioData,
            labels: scenarioLabels,
            type: 'pie',
            textinfo: "label+percent",
            insidetextorientation: "radial",
            marker:{colors: colors}
        }
    ]

    return (
        <div>
          <Plot 
            data={data}
            layout={{autosize:false, 
                      width: width, 
                      height: height, 
                      margin: {"t": 40, "b": 0, "l": 0, "r":0}, 
                      legend: {yanchor: "top", y: 1, x: -0.3},
                      font: {family: "Segoe UI", size:13}}}
            config={{displaylogo: false}}
          />
        </div>
    )
}