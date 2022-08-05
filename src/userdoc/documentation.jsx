import React from "react";
import { ListGroup } from "react-bootstrap";
import MainInterface from "./subdoc/mainInterface";
import ProjectDoc from "./subdoc/projectDoc";
import ScenarioDoc from "./subdoc/scenarioDoc";
import DesignLeftHand from "./subdoc/designLeftHand";
import DesignRightHand from "./subdoc/designRightHand";
import ScenarioFullDoc from "./subdoc/scenarioFull";
import VisualizerCompareDoc from "./subdoc/visualizeCompareDoc";
import VisualizerOpportunityDoc from "./subdoc/visualizeOpportunityDoc";
import VisualizerReportDoc from "./subdoc/visualizeReport";

export default function DocumentationPage(){

    return (
        <>
            <div id="doc-top">
                <p>This guide aims to explain the main features of the tool and demonstrates the best ways to use it. The user interface has been designed to be intuitive and you can get more information by clicking on the page relevant to the specific input or topic. </p>
            </div>
            <ListGroup as ="ol" numbered>
                <ListGroup.Item as="li"><a href="#maininterface">Main interface</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#projectDoc">Project</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#scenarioDoc">Scenario: Start</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#designLeftHand">Design: Left</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#designRightHand">Design: Right</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#scenarioFull">Scenario: List</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#visualizeCompare">Visualization: Compare</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#visualizeOpportunity">Visualization: Saving Opportunity</a></ListGroup.Item>
                <ListGroup.Item as="li"><a href="#visualizeReport">Visualization: Report</a></ListGroup.Item>

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
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="designLeftHand" style={{marginTop:"20px"}}>
                <DesignLeftHand></DesignLeftHand>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="designRightHand" style={{marginTop:"20px"}}>
                <DesignRightHand></DesignRightHand>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="scenarioFull" style={{marginTop:"20px"}}>
                <ScenarioFullDoc></ScenarioFullDoc>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="visualizeCompare" style={{marginTop:"20px"}}>
                <VisualizerCompareDoc></VisualizerCompareDoc>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="visualizeOpportunity" style={{marginTop:"20px"}}>
                <VisualizerOpportunityDoc></VisualizerOpportunityDoc>
                <a href="#doc-top">Back</a>
            </div>
            <hr style={{marginTop: "30px", marginBottom: "30px"}}></hr>
            <div id="visualizeReport" style={{marginTop:"20px"}}>
                <VisualizerReportDoc></VisualizerReportDoc>
                <a href="#doc-top">Back</a>
            </div>
        </>
    )
}