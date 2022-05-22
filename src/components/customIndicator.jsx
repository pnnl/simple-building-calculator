import React from 'react'
import Plot from 'react-plotly.js'

//for demo only
const template = {
    layout: {
        width: 600,
        height: 400,
        margin: {t:25, b:25, l:25, r:25}
    }
}

export default function CustomIndicator(props){
    const {value, range_min, range_max, reference, steps} = props

    var data = [
        {
            type: "indicator",
            title: "EUI (kBtu/ft2) compare to ASHRAE 90.1",
            mode: "gauge+number+delta",
            value: value,
            domain: {x: [0, 1], y: [0, 1]},
            delta: {reference: reference, increasing:{color: "red"}},
            gauge:{
                axis: {range: [range_min, range_max]},
                bar: {color: "green"},
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: steps,
                threshold: {line: {color: "red", width: 4}, thickness: 0.75, value: reference}
            },
        }
    ]

    return (
        <div>
          <Plot 
            data={data}
            layout={template['layout']}
            style={{width: "100%", height: "100%"}}
            config={{displaylogo: false}}
          />
        </div>
    );

}