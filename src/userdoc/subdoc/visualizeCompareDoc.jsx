import React from "react";

export default function VisualizerCompareDoc(){

    return(
        <>
            <h5>Visualization</h5>
            <p>The visualization tab comprises of three tabs:</p>
            <img src={"/simple-building-calculator/img/viz_tab.png"} style={{height: "120px"}} alt="viz_tab"/>
            <h5>Scenario Compare</h5>
            <p>allows the user to visualize all the scenarios defined by the user along with the Baseline and Max Tech scenarios based on the six metrics and energy end-use as a plot and table. The plot is interactive with a hover feature that provides the data in the plot. 
                Plots can be downloaded and saved as a PNG and allow for some level of interaction within the tool in terms of features such as <span style={{fontFamily: "Courier New"}}>zoom</span>, <span style={{fontFamily: "Courier New"}}>pan</span> etc.
                The table below provides the data on the Total Annual Energy per Square Foot and the Percent Savings from the baseline. 
            </p>
            <p>The table below provides the data on the Total Annual Energy per Square Foot and the Percent Savings from the baseline. </p>
            
            <p>The table can be downloaded as a CSV file that can be used for data analysis.</p>
        </>
    )
}