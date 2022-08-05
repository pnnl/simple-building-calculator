import React from "react";
import EndUseDoc from "./endUseDoc"

export default function DesignRightHand(){

    return(
        <>
            <h5>Design Right-Hand Side</h5>
            <img src={"/simple-building-calculator/img/scenario_section_small.png"} style={{height: "600px"}} alt="scenario_section"/>
            <p>Metrics and visualization of the energy end-use for the scenario is provided both as a plot and table format. 
                Plots can be downloaded and saved as a PNG and allow for some level of interaction within the tool in terms of features such as <span style={{fontFamily: "Courier New"}}>zoom</span>, <span style={{fontFamily: "Courier New"}}>pan </span>etc. 
                The table presents the savings and % savings in energy end-use for the scenario with the baseline</p>
            <img src={"/simple-building-calculator/img/plot_options.png"} style={{width: "400px"}} alt="scenario_section"/>
            <p>The user can choose from six metrics for the plot and visualization</p>
            <ol>
                <li><strong>Site EUI: </strong>is the amount of site energy used in one year divided by the total square feet of building area.</li>
                <li><strong>Source EUI: </strong>includes the total amount of raw fuel used at power plants to operate a building.</li>
                <li><strong>Site Annual Energy: </strong></li>
                <li><strong>Source Annual Energy: </strong></li>
                <li><strong>Carbon Emission: </strong></li>
                <li><strong>Utility Cost: </strong></li>
            </ol>
            <img src={"/simple-building-calculator/img/scenario_right_metrics.png"} style={{width: "400px"}} alt="scenario_right_metrics"/>
            <p>The energy end-use results for the simulations are aggregated into categories that were selected to combine end-use that are similarly affected by the independent parameters, for example combining fan and pump electricity consumption. </p>
            <p>The energy end-use include: ELgen, ELcool, ELheat, ELaux and NGheat.</p>
            <EndUseDoc></EndUseDoc>
        </>
    )
}