import React from 'react'
import Plot from 'react-plotly.js'

export default function CustomTornadoDiagram(props){
    const {y, baselineValue, srMaxTech, srWorstCase, srMaxTechParam, srWorstCaseParam, unit, analysisType} = props
    const graphLayout = {
        barmode: "overlay",
        autosize:false,
        xaxis_tickangle: -45,
        bargap: 0.30,
        width: 1200,
        height: 900,
        font: {family: "Segoe UI", size:18},
        xaxis:{
            ticksuffix: ` (${unit})`
        },
        title: {
            text: `${analysisType} Sensitivity Analysis`,
            font: {
                family: "Segoe UI",
                size: 20,
                color: "darkblue"
            },
            x: 0.05
        }
    }

    const data = [
        {
            "x": srMaxTech,
            "y": y,
            "base": srMaxTech.map(x => -x + baselineValue),
            "type": "bar",
            "name": "Max Tech Case",
            marker:{
                color: "rgb(158, 202, 225)",
                line: {
                    color: "rgb(8,48,107)",
                    width: 1.5,
                }
            },
            "orientation": "h",
            "opacity": 0.7,
            "text": srMaxTechParam,
            "textposition": "inside",
            "texttemplate": "%{y}: %{text}",
        },
        {
            "x": srWorstCase,
            "y": y,
            "base": baselineValue,
            "type": "bar",
            "marker_color": "crimson",
            "name": "Worst Case",
            marker: {
                line:{
                    color:"red",
                    width: 1.5
                }
            },  
            "orientation": "h",
            "opacity": 0.7,
            "text": srWorstCaseParam,
            "textposition": "left",
            "texttemplate": "%{y}: %{text}"
        }
    ]

    return (
        <div>
          <Plot
            data={data}
            layout={graphLayout}
          />
        </div>
    );
    
}