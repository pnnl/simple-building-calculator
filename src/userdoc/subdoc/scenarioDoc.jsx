import React from "react";

export default function ScenarioDoc(){
    return (
        <>
            <h5>Scenario</h5>
            <img src={"/simple-building-calculator/img/scenario_fresh.png"} alt="scenario_fresh"/>
            <p>The user clicks <span style={{fontFamily: "Courier New"}}>New Scenario </span>to take them to the input window for naming the scenario and selecting a baseline. The baseline includes the ASHRAE 90.1 2019 and Max Tech (maximum technical potential) options.</p>
            <p>The user clicks <span style={{fontFamily: "Courier New"}}>create </span>to edit the scenario to add the inputs for the parameters.</p>
            <img src={"/simple-building-calculator/img/scenario_create.png"} alt="scenario_create"/>
            
            <p>The Scenario section has two parts the <a href="#scenarioLeftHand">Left-Hand Side </a> and the <a href="#scenarioRightHand">the Right-Hand Side. </a></p>
        </>
    )
}