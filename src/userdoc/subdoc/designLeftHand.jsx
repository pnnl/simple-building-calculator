import React, {useState} from "react";
import ECMParamDoc from "./ecmParamDoc";
import { Button, Modal } from "react-bootstrap";

export default function DesignLeftHand(){
      //modal function
    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <h5>Design Left-Hand Side</h5>
            <img src={"/simple-building-calculator/img/scenario_section_small.png"} style={{height: "600px"}} alt="scenario_section"/>
            <p><span style={{fontFamily: "Courier New"}}>Standard </span>is used to select the relevant building energy code standards from ASHRAE 90.1, IECC 2021 (International Energy Conservation Code) or custom. </p>
            <p><span style={{fontFamily: "Courier New"}}>HVAC </span>currently includes Packaged VAV with electric reheat for the Medium Office and Packaged single zone air-conditioner with natural gas heat for the Strip Mall, that will be the default based on the project building typology chosen for the project. </p>
            <p>For each building typology, an efficiency conservation measure list (ECM) has been identified. This input section allows the user to change the values of the parameters from the ECM list to calculate the metric related to energy usage, carbon emissions and utility cost (link to metrics glossary).  The input for each parameter can be changed by either using the slider or clicking on input to type the value in the respective box. </p>
            <p>The ECM list and parameters can be found <a href="#scenarioLeftHand" onClick={handleShow}>here</a></p>
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>ECM Parameters Help</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ECMParamDoc></ECMParamDoc>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                      Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <p>The change in inputs can automatically be visualized on the right-hand side, the details of which are explained in detail below. Once all the inputs have been provided, the user should <span style={{fontFamily: "Courier New"}}>save</span>
              and <span style={{fontFamily: "Courier New"}}>exit</span> to go back to the list of scenarios to create more scenarios.
              <span style={{fontFamily: "Courier New"}}>Cancel</span> takes you back to the main scenario tab with no changes.
              </p>
              <img src={"/simple-building-calculator/img/download_session.png"} style={{width: "800px"}}alt="download_session"/>
              <p><span style={{fontFamily: "Courier New"}}>Download Session</span> button at the top right allows the user to save the session details that include the project and scenarios as a json file that can be loaded in the "Project" tab in another session.
              The <span style={{fontFamily: "Courier New"}}>Download Session</span> button is visible after the user clicks <span style={{fontFamily: "Courier New"}}>save</span> for the inputs.
              </p>
        </>
    )
}