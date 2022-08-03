import React from "react";

export default function ProjectDoc(){
    return (
        <>  
            <h5>Project</h5>
            <p>The Project tab has two parts: </p>
            <img src={"/simple-building-calculator/img/project_page_small.png"} alt="navigator" style={{height: "600px", marginBottom: "10px"}}/>
            <p><strong>Simple Building Calculator: </strong> This part on the Left-Hand Side gives the user an overview of the SBC tool.</p>
            <p><strong>Project Info: </strong> This part on the Right-Hand Side is the main input section allowing the user to add information about their project. The inputs include "Project Name", "Building Type", "Climate Zone" and "Floor Area".</p>
            <p>The beta version currently allows: </p>
            <ol>
                <li><p>Building types of Medium Office and Strip Mall.</p></li>
                <li><p>Climate Zone 2A, 4C and 8 (The climate zone classification is available here.) </p></li>
                <li><p>Floor Area in SQFT (Floor area shall be smaller than <strong>50,000 SQFT</strong> to use this tool.)</p></li>
            </ol>
            <p><span style={{fontFamily: "Courier New"}}>Confirm: </span> Upon entering the project details the user can click on the <span style={{fontFamily: "Courier New"}}>Confirm </span>button to save the current inputs and move to the next tab to set up the "Scenario".</p>
            <p><span style={{fontFamily: "Courier New"}}>Load: </span> Project inputs can be saved in the "Scenario" tab as a json file and loaded into the tool (described in the next section).</p>
            <p><span style={{fontFamily: "Courier New"}}>Advanced: </span> Includes inputs for the Electricity Rate, Natural Gas Rate, Electricity Carbon Emissions, Natural Gas Carbon Emissions, Electricity Source Conversion Factor, and Natural Gas Conversion Factor. The pre-defined values are based on …… (add source) and can be left as default, or the user may add inputs based on location and available data.</p>
            <p><span style={{fontFamily: "Courier New"}}>Continue: </span> Upon entering the project information the user will see a <span style={{fontFamily: "Courier New"}}>Continue </span> button that will allow them to move on to the "Scenario" tab for additional inputs.</p>
        </>
    )
}