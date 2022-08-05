import React from "react";

export default function VisualizerOpportunityDoc(){

    return(
        <>
            <h5>Saving Opportunity</h5>
            <p>This tab provides the Sensitivity Diagram for the metrics comparing the Worst Case with the Max Tech Scenario across the ECM list. It is presented as a tornado diagram to help understand which measures have the largest impact on the building energy use. 
            Interpretation: The vertical line represents the project baseline case, while the orange bars to the right show increased performance metric (e.g., EUI) with the worst case, and bars to the left show reduced performance metric with the best case.
            </p>
            <img src={"/simple-building-calculator/img/tornado.png"} style={{height: "600px"}} alt="tornado"/>
            <ul>
                <dd>- <strong>Measures:</strong> x-axis contains a list of measures that apply to the design</dd>
                <dd>- <strong>Measure value:</strong> Value of the measure for each case, in a format of measure: value.</dd>
                <dd>- <strong>Performance metric value:</strong> y-axis represents the value of a selected performance metrics. The values updated with the selected performance metric.</dd>
                <dd>- <strong>Case information:</strong> display the information of the case, including the measure, measure value and the value of the selected performance metric. Show up when cursor is focused on the bar.</dd>
            </ul>
        </>
    )
}