import React, {useEffect, useState} from 'react'
import Plot from 'react-plotly.js'


export default function CustomBarChart(props){
  const {plotData, barmode, unit, title} = props
  const [plotDataList, setPlotDataList] = useState(Object.values(plotData))
  useEffect(()=>{
    let plotDataArray = Object.values(plotData)
    setPlotDataList(plotDataArray)
  }, [plotData])

  const layout = {
    barmode: barmode,
    title:{
      text: title,
    },
    yaxis:{
      title:{
        text: unit,
      }
    }
  }
    return (
        <div>
          <Plot
            data={plotDataList}
            layout={layout}
            style={{width: "100%", height: "100%"}}
          />
        </div>
    );
} 