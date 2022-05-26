import React, {useContext, useState, useEffect} from 'react'
import {ProjectContext, ScenarioListContext, AdvancedConfigContext} from "../store/index";
import * as dataUtils from "../util/dataProcessor.jsx";
import * as alg from '../util/algorithmLoader.jsx'
import { Row, Col, Button, Modal} from "react-bootstrap";
import Select from "react-select"
import CustomTornadoDiagram from './customTornadoDiagram';


export default function ScenarioOpportunity(){
    const [scenarioListState, scenarioListDispatch] = useContext(ScenarioListContext)
    const {bldgType, climateZone, floorArea} = useContext(ProjectContext)
    const {electricityRate,natGasRate,electricityCarbon,natGasCarbon,electricitySourceToSite,natGasSourceToSite} = useContext(AdvancedConfigContext)
    const analysisTypeArray = dataUtils.getAnalysisType()
    //exclude baseline and max_tech cases
    const scenarioListArray = dataUtils.convert_scenario_list_to_option_list(scenarioListState, false)
    
    const [analysisType, setAnalysisType] = useState(analysisTypeArray[0])

    const [electricityConversionFactor, setElectricityConversionFactor] = useState(1.0)
    const [natGasConversionFactor, setNatGasConversionFactor] = useState(1.0)
    
    const y = dataUtils.getListOfParametersExceptionHVACAndStandard()
    const baseline = dataUtils.getProjectBaseline(bldgType, climateZone)
    const maxTech = dataUtils.getProjectMaxTech(bldgType, climateZone)
    const worstCase = dataUtils.getProjectWorstCase(bldgType, climateZone)

    //modal function
    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const calculatedValues = (scenario) => {
        // calculate the metrics based on selected analysis type
        let total_value = alg.calculateAux(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateCool(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateELHeat(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateGen(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateNGHeat(bldgType.value, climateZone.value, scenario, natGasConversionFactor)
        return dataUtils.fixed_2(total_value)
    }

    const createPlotData = (extremeCase) => {
        let sr = []
        let baselineValue = calculatedValues(baseline)
        for(let i=0; i<y.length; i++){
            let key = y[i]
            let baselineExtremeCase = {...baseline}
            baselineExtremeCase[key] = extremeCase[key]
            sr.push(Math.abs(dataUtils.fixed_2(calculatedValues(baselineExtremeCase)-baselineValue)))
        }
        return sr
    }
    const [sr1, setSR1] = useState(createPlotData(maxTech))
    const [sr2, setSR2] = useState(createPlotData(worstCase))

    useEffect(()=>{
        setSR1(createPlotData(maxTech))
        setSR2(createPlotData(worstCase))
    }, [electricityConversionFactor, natGasConversionFactor, analysisType])

    const handleOptionChanges = (value, e) => {
        if(e['name'] === 'analysis_type'){
            let tempElectricFactor = dataUtils.getElectricConversionFactor(value["value"], floorArea, electricitySourceToSite["value"],electricityCarbon["value"], electricityRate["value"])
            let tempNatGasFactor = dataUtils.getNatGasConversionFactor(value["value"], floorArea, natGasSourceToSite["value"], natGasCarbon["value"], natGasRate["value"])
            setElectricityConversionFactor(tempElectricFactor)
            setNatGasConversionFactor(tempNatGasFactor)
            setAnalysisType(value)
        }
    }

    return (
        <>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <h3>Saving Opportunities</h3>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col>
                            <h6>Analysis Type</h6>
                            <Select 
                                options={[...analysisTypeArray]} 
                                name={"analysis_type"} 
                                value={analysisType}
                                onChange={handleOptionChanges}></Select>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <h3>Sensitivity Diagram</h3>
                    <Button variant="success" onClick={handleShow} className={"pull-right"}>How to?</Button>
                    <Modal show={show} size="lg" onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>How to read the diagram</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                The tornado diagram is helpful in understanding which measures have the largest impact on building energy use.
                            </p>
                            <p>
                                The vertical line represents the project baseline case, while the orange bars to the right show increased performance metric (e.g., EUI) with the worst case, and bars to the left show reduced performance metric with the best case.
                            </p>
                            <img src="/simple-building-calculator/img/diagram_intro_specs.PNG" alt="intro of the tornado diagram" style={{width:"100%", height:"auto"}}/>
                            <p className={"text-justify"}>Sample tornado diagram</p>
                            <ul>
                                <li><strong>Measures:</strong> x-axis contains a list of measures that apply to the design</li>
                                <li><strong>Measure value:</strong> Value of the measure for each case, in a format of <i>measure: value</i>.</li>
                                <li><strong>Performance metric value:</strong> y-axis represents the value of a selected performance metrics. The values updated with the selected performance metric.</li>
                                <li><strong>Case information:</strong> display the information of the case, including the measure, measure value and the value of the selected performance metric. Show up when cursor is focused on the bar.</li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col>
                            <CustomTornadoDiagram
                                y = {y}
                                baselineValue = {calculatedValues(baseline)}
                                srMaxTech = {sr1}
                                srWorstCase = {sr2}
                                srMaxTechParam = {dataUtils.getValuesByKeys(y, maxTech)}
                                srWorstCaseParam = {dataUtils.getValuesByKeys(y, worstCase)}
                                unit = {dataUtils.getAnalysisTypeUnit(analysisType.value)}
                                analysisType = {analysisType.label}
                            >
                            </CustomTornadoDiagram>
                        </Col>
                    </Row>
                </div>
            </div>
        
        </>
    )
}