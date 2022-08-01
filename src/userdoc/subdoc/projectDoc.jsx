import React from "react";

export default function ProjectDoc(){
    return (
        <>  
            <h5>Project</h5>
            <p>The Project tab has two parts: </p>
            <img src={"/simple-building-calculator/img/nav.png"} alt="navigator" style={{marginBottom: "10px"}}/>
            <p><strong>Simple Building Calculator: </strong> This part on the Left-Hand Side gives the user an overview of the SBC tool.</p>
            <p><strong>Project Info: </strong> This part on the Right-Hand Side is the main input section allowing the user to add information about their project. The inputs include "Project Name", "Building Type", "Climate Zone" and "Floor Area".</p>
            <p>The beta version currently allows: </p>
            <ol>
                <li><p>Building types of Medium Office and Strip Mall.</p></li>
                <li><p>Climate Zone 2A, 4C and 8 (The climate zone classification is available here.) </p></li>
                <li><p>Floor Area in SQFT (Floor area shall be smaller than <strong>50,000 SQFT</strong> to use this tool.)</p></li>
            </ol>
            <br ></br>
        </>
    )
}