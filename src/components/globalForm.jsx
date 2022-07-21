import React, {useState, useContext} from "react";
import Select from "react-select"
import { Accordion, useAccordionButton, Button, InputGroup, Form, FormControl, Modal } from "react-bootstrap";
import { ProjectContext, ScenarioContext, ScenarioListContext, AdvancedConfigContext} from "../store/index";
import * as strUtils from "../util/strUtil.jsx";
import * as dataUtils from '../util/dataProcessor';
import FileUploader from "../components/fileUploader"

function ConfigToggle({children, eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <Button variant="link" onClick={decoratedOnClick}>{children}</Button>
    )
}

export default function GlobalForm(props){
    const {bldgTypeOptions, climateZonesOptions, onSubmitGlobalVariable} = props
    const {project, setProject, bldgType, setBldgType, climateZone, setClimateZone, floorArea, setFloorArea, setCurrentWorkingScenario, setCurrentBaseCase} = useContext(ProjectContext)
    const {electricityRate, setElectricityRate, natGasRate, setNatGasRate, electricityCarbon, setElectricityCarbon, natGasCarbon, setNatGasCarbon,
        electricitySourceToSite, setElectricitySourceToSite, natGasSourceToSite, setNatGasSourceToSite} = useContext(AdvancedConfigContext)
    const [scenarioState, scenarioDispatch] = useContext(ScenarioContext)
    const [scenarioListState, scenarioListDispatch] = useContext(ScenarioListContext)

    //const availableStandards = dataUtils.getStandardData()
    const [projectNameState, setProjectNameState] = useState(project)
    const [bldgTypeState, setBldgTypeState] = useState(bldgType)
    const [climateZoneState, setClimateZoneState] = useState(climateZone)
    const [floorAreaState, setFloorAreaState] = useState(floorArea)
    const [electricityRateState, setElectricityRateState] = useState(electricityRate)
    const [natGasRateState, setNatGasRateState] = useState(natGasRate)
    const [electricityCarbonState, setElectricityCarbonState] = useState(electricityCarbon)
    const [natGasCarbonState, setNatGasCarbonState] = useState(natGasCarbon)
    const [electricitySourceToSiteState, setElectricitySourceToSiteState] = useState(electricitySourceToSite)
    const [natGasSourceToSiteState, setNatGasSourceToSiteState] = useState(natGasSourceToSite)

    //modal status
    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[jsonFile, setJsonFile] = useState()

    const onValueHandler = (event, action) => {
        //handler to handle the local state updates
        if(action === undefined){
            //text input action
            if(event.target.name === "floor_area"){
                setFloorAreaState(event.target.value)
            }else if(event.target.name === "project"){
                setProjectNameState(event.target.value)
            }else if(event.target.name === "electricity_rate"){
                let electricRateNew = {
                    ... electricityRateState,
                    "value": event.target.value
                }
                setElectricityRateState(electricRateNew)
            }else if(event.target.name === "natgas_rate"){
                let natgasRateNew = {
                    ... natGasRateState,
                    "value": event.target.value
                }
                setNatGasRateState(natgasRateNew)
            }else if(event.target.name === "electricity_carbon_rate"){
                let electricCarbonRateNew = {
                    ... electricityCarbonState,
                    "value": event.target.value
                }
                setElectricityCarbonState(electricCarbonRateNew)
            }else if(event.target.name === "natgas_carbon_rate"){
                let natgasCarbonRateNew = {
                    ... natGasCarbonState,
                    "value": event.target.value
                }
                setNatGasCarbonState(natgasCarbonRateNew)
            }else if(event.target.name === "electricity_source_to_site_rate"){
                let electricSourceSiteRateNew = {
                    ... electricitySourceToSiteState,
                    "value": event.target.value
                }
                setElectricitySourceToSiteState(electricSourceSiteRateNew)
            }else if(event.target.name === "natgas_source_to_site_rate"){
                let natgasSourceSiteRateNew = {
                    ... natGasSourceToSiteState,
                    "value": event.target.value
                }
                setNatGasSourceToSiteState(natgasSourceSiteRateNew)
            }
        }else{
            if(action.name === "bldg_type"){
                setBldgTypeState(event)
            }else if(action.name === "climate_zone"){
                setClimateZoneState(event)
            }
        }
    }

    const onUpdateAdvancedSettings = () => {
        const _ = require('lodash'); 
                    if (! _.isEqual(electricityRate, electricityRateState)){
                        setElectricityRate(electricityRateState)
                    }

                    if (! _.isEqual(natGasRate, natGasRateState)){
                        setNatGasRate(natGasRateState)
                    }

                    if (! _.isEqual(electricityCarbon, electricityCarbonState)){
                        setElectricityCarbon(electricityCarbonState)
                    }

                    if (! _.isEqual(natGasCarbon, natGasCarbonState)){
                        setNatGasCarbon(natGasCarbonState)
                    }

                    if (! _.isEqual(electricitySourceToSite, electricitySourceToSiteState)){
                        setElectricitySourceToSite(electricitySourceToSiteState)
                    }

                    if (! _.isEqual(natGasSourceToSite, natGasSourceToSiteState)){
                        setNatGasSourceToSite(natGasSourceToSiteState)
                    }
    }

    const submitAction = (e) => {
        //flag to trigger whether we should update when the action is update
        if(e.target.id==="discard"){
            if(window.confirm("Caution: this action will delete all your previous work. Do you want to proceed?")){
                setProjectNameState("")
                setBldgTypeState("")
                setClimateZoneState("")
                setFloorAreaState("")
                setElectricityRateState(dataUtils.getDefaultRates("electricity_rate"))
                setNatGasRateState(dataUtils.getDefaultRates("natgas_rate"))
                setElectricityCarbonState(dataUtils.getDefaultRates("eletrcity_carbon"))
                setNatGasCarbonState(dataUtils.getDefaultRates("natgas_carbon"))
                setElectricitySourceToSiteState(dataUtils.getDefaultRates("electricity_source_site"))
                setNatGasSourceToSiteState(dataUtils.getDefaultRates("natgas_source_site"))
                scenarioDispatch({type:"reset"})
                scenarioListDispatch({type:"reset"})
            }
        }else if(e.target.id === "continue"){
            onUpdateAdvancedSettings()
            onSubmitGlobalVariable(e, bldgTypeState, climateZoneState)
        }else if(e.target.id === "load"){
            //TODO load option
        }else if(e.target.id === "confirm" || e.target.id === "start"){
            if (
                !strUtils.isEmptyOrUndefined(projectNameState) &&
                !strUtils.isEmptyOrUndefined(bldgTypeState) &&
                !strUtils.isEmptyOrUndefined(climateZoneState) &&
                !strUtils.isEmptyOrUndefined(floorAreaState)
              ) {
                  let testFloorArea = parseFloat(floorAreaState)

                  if(testFloorArea > 50000){
                    alert("Floor area shall be smaller than 50,000 SQFT to use this tool.");
                  } else if(scenarioListState['cases'].length > 0 || Object.keys(scenarioState)>0){
                    alert("Please discard previous project data to proceed the new data");
                  } else {
                    setProject(projectNameState)
                    setBldgType(bldgTypeState)
                    setClimateZone(climateZoneState)
                    setFloorArea(floorAreaState)
                    onUpdateAdvancedSettings()
                    onSubmitGlobalVariable(e, bldgTypeState, climateZoneState)
                  }
              } else {
                alert("One of the parameters in not defined. Please check your inputs before start a project.");
            }
        }
    }

    const loadJsonFile = () => {
        //load file and set to the project
        setProject(jsonFile.project_name)
        setProjectNameState(jsonFile.project_name)
        setBldgType(jsonFile.bldg_type)
        setBldgTypeState(jsonFile.bldg_type)
        setClimateZone(jsonFile.climate_zone)
        setClimateZoneState(jsonFile.climate_zone)
        setFloorArea(jsonFile.floor_area)
        setFloorAreaState(jsonFile.floor_area)
        setCurrentWorkingScenario(jsonFile.current_scenario)
        setCurrentBaseCase(jsonFile.scenario_basecase)
        setElectricityRate(jsonFile.electricity_rate)
        setElectricityRateState(jsonFile.electricity_rate)
        setNatGasRate(jsonFile.natgas_rate)
        setNatGasRateState(jsonFile.natgas_rate)
        setElectricityCarbon(jsonFile.eletrcity_carbon)
        setElectricityCarbonState(jsonFile.eletrcity_carbon)
        setNatGasCarbon(jsonFile.natgas_carbon)
        setNatGasCarbonState(jsonFile.natgas_carbon)
        setElectricitySourceToSite(jsonFile.electricity_source_site)
        setElectricitySourceToSiteState(jsonFile.electricity_source_site)
        setNatGasSourceToSite(jsonFile.natgas_source_site)
        setNatGasSourceToSiteState(jsonFile.natgas_source_site)
        scenarioDispatch({type:"load", payload: jsonFile["scenario-reducer-123"]})
        scenarioListDispatch({type:"load", payload: jsonFile["scenario-list-reducer-123"]})
        handleClose()
    }

    const renderSubmitButton = () => {
        if(Object.keys(bldgType).length === 0 || Object.keys(climateZone).length === 0){
            return (<Button variant="outline-primary" size="lg" id="start" onClick={submitAction}>Start</Button>)
        }else if(scenarioListState['cases'].length > 0 || Object.keys(scenarioState)>0){
            return (<><Button variant="outline-success" size="lg" id="continue" onClick={submitAction}>Continue</Button>
            <Button variant="outline-warning" size="lg" id="discard" onClick={submitAction}>New Project</Button></>)
        }else{
            return(<><Button variant="outline-info" size="lg" id="confirm" onClick={submitAction}>Confirm</Button></>)
        }
    }

    return (
        <div className="container-fluid">
            <div>
                <div className="form-group">
                    <h6>Project Name:</h6>
                    <input type="text" className="form-control" value={projectNameState} name="project" onChange={onValueHandler}></input>
                </div>
                <div className="form-group">
                    <h6>Building Type:</h6>
                    <Select value={bldgTypeState} options={[...bldgTypeOptions]} name="bldg_type" onChange={onValueHandler}></Select>
                </div>
                <div className="form-group">
                    <h6>Climate Zone:</h6>
                    <Select value={climateZoneState} options={[...climateZonesOptions]} name="climate_zone" onChange={onValueHandler}></Select>
                </div>
                <h6>Floor Area:</h6>
                <div className="input-group">
                    <input type="text" className="form-control" value={floorAreaState} name="floor_area" aria-describedby="floor-addon" onChange={onValueHandler}></input>
                    <div class="input-group-append">
                        <span class="input-group-text" id="floor-addon">ft2</span>
                    </div>
                </div>
                <Accordion defaultActiveKey="none" style={{"marginTop": "25px"}}>
                    <div className="icard">
                        <div className="icard-heading">
                            <ConfigToggle eventKey="advanced_config">Advance</ConfigToggle>
                        </div>
                        <Accordion.Collapse eventKey="advanced_config">
                            <div className="icard-content">
                                <Form.Label><h6>Electricity Rate:</h6></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl value={electricityRateState["value"]} name="electricity_rate" onChange={onValueHandler}></FormControl>
                                    <InputGroup.Text>{electricityRateState["unit"]}</InputGroup.Text>
                                </InputGroup>
                                <Form.Label><h6>Natural Gas Rate:</h6></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl value={natGasRateState["value"]} name="natgas_rate" onChange={onValueHandler}></FormControl>
                                    <InputGroup.Text>{natGasRateState["unit"]}</InputGroup.Text>
                                </InputGroup>
                                <Form.Label><h6>Electricity Carbon Emissions:</h6></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl value={electricityCarbonState["value"]} name="electricity_carbon_rate" onChange={onValueHandler}></FormControl>
                                    <InputGroup.Text>{electricityCarbonState["unit"]}</InputGroup.Text>
                                </InputGroup>
                                <Form.Label><h6>Natural Gas Carbon Emissions:</h6></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl value={natGasCarbonState["value"]} name="natgas_carbon_rate" onChange={onValueHandler}></FormControl>
                                    <InputGroup.Text>{natGasCarbonState["unit"]}</InputGroup.Text>
                                </InputGroup>
                                <Form.Label><h6>Electricity Source Conversion Factor:</h6></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl value={electricitySourceToSiteState["value"]} name="electricity_source_to_site_rate" onChange={onValueHandler}></FormControl>
                                    <InputGroup.Text>{electricitySourceToSiteState["unit"]}</InputGroup.Text>
                                </InputGroup>
                                <Form.Label><h6>Natural Gas Source Conversion Factor:</h6></Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl value={natGasSourceToSiteState["value"]} name="natgas_source_to_site_rate" onChange={onValueHandler}></FormControl>
                                    <InputGroup.Text>{natGasSourceToSiteState["unit"]}</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </Accordion.Collapse>
                    </div>
                </Accordion>
                <Button variant="outline-success" size="lg" className={"pull-right"} onClick={handleShow}>Load</Button>
                <Modal show={show} size="lg" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Upload File</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FileUploader
                                jsonFile={jsonFile}
                                handleUploadJsonFile = {(e) => {setJsonFile(e)}}
                            ></FileUploader>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={loadJsonFile}>
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                {renderSubmitButton()}
            </div>
        </div>
    )
}