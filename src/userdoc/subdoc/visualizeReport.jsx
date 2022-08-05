import React from "react";

export default function VisualizerReportDoc(){

    return(
        <>
            <h5>Scenario Report</h5>
            <p>This tab comprises of six parts as shown below and provides a summary for every scenario by comparing it with the Standard for the chosen metric. The user can select from the six metrics for deeper insights. 
            </p>
            <img src={"/simple-building-calculator/img/report.png"} style={{height: "600px"}} alt="report"/>
            <ul>
                <dd>- <strong>1</strong> allows the user to select the scenario and performance metric using the drop-down menu. </dd>
                <dd>- <strong>2</strong> and <strong>3</strong> provides a summary of the chosen scenario, comparing it with the baseline ASHRAE 90.1 performance metrics. IT gives a PASS of FAIL assessment of the design scenario.</dd>
                <dd>- <strong>4</strong> provides the value and plot of the chosen Performance metric by the Energy Source breakdown for Electricity and Natural Gas, with a visualization in the form of the pie-chart. The plot can be downloaded as a PNG.</dd>
                <dd>- <strong>5</strong> provides the values and plot of the chosen Performance metric by the End-Use Breakdown, with a visualization in the form of a pie-chart. The plot can be downloaded as a PNG.</dd>
            </ul>
        </>
    )
}