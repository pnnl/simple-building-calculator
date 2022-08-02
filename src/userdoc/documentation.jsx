import React from "react";
import { ListGroup } from "react-bootstrap";
import MainInterface from "./subdoc/mainInterface";
import ProjectDoc from "./subdoc/projectDoc";
import ScenarioDoc from "./subdoc/scenarioDoc";

export default function DocumentationPage(){

    return (
        <>
            <div id="doc-top">
                <p>This guide aims to explain the main features of the tool and demonstrates the best ways to use it. The user interface has been designed to be intuitive and you can get more information by clicking on the page relevant to the specific input or topic. </p>
            </div>
            <ListGroup as ="ol" numbered>
                <ListGroup.Item as="li"><a href="#maininterface">Main interface</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#projectDoc">Project</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#scenarioDoc">Scenario</a></ListGroup.Item>
            </ListGroup>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="maininterface" style={{marginTop: "20px"}}>
                <MainInterface></MainInterface>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="projectDoc" style={{marginTop: "20px"}}>
                <ProjectDoc></ProjectDoc>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="scenarioDoc" style={{marginTop: "20px"}}>
                <ScenarioDoc></ScenarioDoc>
                <a href="#scenarioDoc">Back</a>
            </div>
            
        </>
    )
}