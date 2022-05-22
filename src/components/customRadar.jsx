import React from 'react'
import Plot from 'react-plotly.js'

export default function CustomRadar(props){
    const {theta, designName, designData, baseName, baseData} = props
    const plotRange = () => {
        const designMax = Math.max(...designData)
        const baseMax = Math.max(...baseData)

        //calculate the scale - assuming baseMax is always positive, which is likely the case
        const length = Math.log(baseMax) * Math.LOG10E + 1 | 0
        //using the scale to scale the max to the nearest ceiling.
        const max = Math.ceil(Math.max(designMax, baseMax)/10^length)*10^length

        return [0, max]
    }

    var data = [
        {
            type: 'scatterpolar',
            theta: theta,
            r: designData,
            fill: 'toself',
            name: designName
        },
        {
            type: 'scatterpolar',
            theta: theta,
            r: baseData,
            fill: 'toself',
            name: baseName
        }
    ]

    var layout = {
        polar: {
            radialaxis:{
                visible: true,
                range: plotRange
            }
        }
    }

    return (
        <div>
          <Plot 
            data={data}
            layout={layout}
            style={{width: "100%", height: "100%"}}
            config={{displaylogo: false}}
          />
        </div>
    );
}