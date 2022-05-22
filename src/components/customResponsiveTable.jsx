import React from 'react'
import Plot from 'react-plotly.js'


export default function CustomResponsiveTable(props){
    const {dataValue} = props

    const headerColor = "grey"
    const rowColorArrayMap = ["lightgrey", "white"]

    const rowColorArray = () => {
        let colorArray = []
        dataValue.forEach(function (value, i){
            colorArray.push(rowColorArrayMap[i%2])
        })
        return colorArray
    }

    const defaultRowColorArray = rowColorArray()

    const data = [
        {
            type: 'table',
            header: {
                values: [[""], [`<b>Total (kBtu/ft2)</b>`],[`<b>per Square Foot (kBtu)</b>`], [`<b>Percent Savings</b>`]],
                align: "center",
                line: {width: 2, color: 'black'},
                fill: {color: headerColor},
                font: {family: "Verdana", size: 18, color: "white"}
            },
            cells:{
                values: dataValue,
                height: 30,
                align: "center",
                line: {color: "black", width: 2},
                fill: {defaultRowColorArray},
                font: {family: "Verdana", size: 18, color: ["black"]}
            }
        }
    ]

    return (
        <div>
          <Plot
            data={data}
            layout = {{margin: {"t": 20, "b": 0, "l": 0, "r":0},}}
            style={{width: "100%", heigh: "100%"}}
          />
        </div>
    );
}