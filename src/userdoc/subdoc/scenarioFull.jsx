import React from "react";

export default function ScenarioFullDoc(){

    return(
        <>
            <h5>Scenario List Page</h5>
            <p>Upon the creation of scenarios using the process above, the main "Scenario" tab is populated with the scenarios as a list on the left-hand side and a snapshot of the scenario on the right.</p>
            <img src={"/simple-building-calculator/img/sceanrio_tab.png"} style={{width: "800px"}} alt="scenario_tab"/>
            <p>The scenario list can be sorted by name, time and EUI. 
                <span style={{fontFamily: "Courier New"}}>Active </span>scenarios are the scenarios created by the user and <span style={{fontFamily: "Courier New"}}>All </span>includes the "Baseline" and "Max Tech" scenarios for the comparison visualization. 
                The <span style={{fontFamily: "Courier New"}}>Options </span>button allows the user to <span style={{fontFamily: "Courier New"}}>edit</span>, <span style={{fontFamily: "Courier New"}}>duplicate </span>or <span style={{fontFamily: "Courier New"}}>archive </span>the scenario. 
                New scenarios can be created by duplicating scenarios and amending them or by using the <span style={{fontFamily: "Courier New"}}>New Scenario </span>button.</p>
            <img src={"/simple-building-calculator/img/scenario_options.png"} style={{width: "800px"}} alt="scenario_options"/>
            <p>Clicking any scenario provides a snapshot of the scenario on the right-hand side of the tab.</p>
            <img src={"/simple-building-calculator/img/scenario_snapshot.png"} style={{width: "200px"}} alt="scenario_snapshot"/>
            <p></p>
        </>
    )
}