import React, {useContext, useEffect, useState} from 'react'
import { Row, Col, Table, Card } from "react-bootstrap";
import {ProjectContext, ScenarioListContext, ScenarioContext, AdvancedConfigContext} from "../store/index";
import CustomDisplayCard from './customDisplayCard';
import Select from "react-select"
import * as dataUtils from "../util/dataProcessor.jsx";
import * as alg from '../util/algorithmLoader.jsx'
import CustomPieChart from './customPieChart';

export default function ScenarioReport(){

    const [scenarioListState, scenarioListDispatch] = useContext(ScenarioListContext)
    const [scenarioState, scenarioDispatch] = useContext(ScenarioContext)
    const {bldgType, climateZone, floorArea} = useContext(ProjectContext)
    const {electricityRate,natGasRate,electricityCarbon,natGasCarbon,electricitySourceToSite,natGasSourceToSite} = useContext(AdvancedConfigContext)
    const analysisTypeArray = dataUtils.getAnalysisType()
    //exclude baseline and max_tech cases
    const scenarioListArray = dataUtils.convert_scenario_list_to_option_list(scenarioListState, false)
    
    const [analysisType, setAnalysisType] = useState(analysisTypeArray[0])
    const [selectedScenario, setSelectedScenario] = useState(scenarioListArray[0])
    const [electricityConversionFactor, setElectricityConversionFactor] = useState(1.0)
    const [natGasConversionFactor, setNatGasConversionFactor] = useState(1.0)

    const calculatedElectricValues = (scenarioID) => {
        // calculate the metrics based on selected analysis type
        let scenario = scenarioState[scenarioID]
        let total_value = alg.calculateAux(bldgType.value, climateZone.value, scenario, 1.0) + 
        alg.calculateCool(bldgType.value, climateZone.value, scenario, 1.0) + 
        alg.calculateELHeat(bldgType.value, climateZone.value, scenario, 1.0) + 
        alg.calculateGen(bldgType.value, climateZone.value, scenario, 1.0)
        return dataUtils.fixed_2(total_value)
    }

    const calculatedNatGasValues = (scenarioID) => {
        // calculate the metrics based on selected analysis type
        let scenario = scenarioState[scenarioID]
        let total_value = alg.calculateNGHeat(bldgType.value, climateZone.value, scenario, 1.0)
        return dataUtils.fixed_2(total_value)
    }

    const calculatedValues = (scenarioID) => {
        // calculate the metrics based on selected analysis type
        let scenario = scenarioState[scenarioID]
        let total_value = alg.calculateAux(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateCool(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateELHeat(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateGen(bldgType.value, climateZone.value, scenario, electricityConversionFactor) + 
        alg.calculateNGHeat(bldgType.value, climateZone.value, scenario, natGasConversionFactor)
        return dataUtils.fixed_2(total_value)
    }

    const updateFuelPieChart = () => {
        //new data
        let electricity = dataUtils.fixed_2(calculatedElectricValues(selectedScenario.value) * floorArea)
        let natGas = dataUtils.fixed_2(calculatedNatGasValues(selectedScenario.value) * floorArea )
        return [electricity, natGas]
    }

    const updateBreakdownChart = (value) => {
        if(value){
            return [
                alg.calculateCool(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor),
                alg.calculateGen(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor),
                alg.calculateAux(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor),
                alg.calculateELHeat(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor),
                alg.calculateELHeat(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor)
            ]
        }else{
            return [
                `Cool (${dataUtils.getAnalysisTypeUnit(analysisType.value)})`,
                `General (${dataUtils.getAnalysisTypeUnit(analysisType.value)})`,
                `Auxiliary (${dataUtils.getAnalysisTypeUnit(analysisType.value)})`,
                `Heating (Electricity) (${dataUtils.getAnalysisTypeUnit(analysisType.value)})`,
                `Heating (Natural Gas) (${dataUtils.getAnalysisTypeUnit(analysisType.value)})`
            ]
        }
    }

    const [baselineMetricValue, setBaselineMetricValue] = useState(calculatedValues(dataUtils.getProjectBaselineScenario(scenarioListState.cases).id))
    const [selectedScenarioMetricValue, setSelectedScenarioMetricValue] = useState(calculatedValues(selectedScenario.value))
    const [fuelPieChartValue, setFuelPieChartValue] = useState(updateFuelPieChart())
    const [metricBreakdownValue, setMetricBreakdownValue] = useState(updateBreakdownChart(true))
    const [metricBreakdownLabel, setMetricBreakdownLabel] = useState(updateBreakdownChart(false))
    //update the currentState (the list of the scenarios)
    //used for duplicate case
    useEffect(()=>{
        setBaselineMetricValue(calculatedValues(dataUtils.getProjectBaselineScenario(scenarioListState.cases).id))
        setSelectedScenarioMetricValue(calculatedValues(selectedScenario.value))
        let fuelData = updateFuelPieChart()
        setFuelPieChartValue(fuelData)
        let breakdownData = updateBreakdownChart(true)
        setMetricBreakdownValue(breakdownData)
        let breakdownLabel = updateBreakdownChart(false)
        setMetricBreakdownLabel(breakdownLabel)
    }, [electricityConversionFactor, natGasConversionFactor, selectedScenario])

    const handleOptionChanges = (value, e) => {
        if(e['name'] === 'analysis_type'){
            if(value['value'] !== analysisType['value']){
                let tempElectricFactor = electricityConversionFactor
                let tempNatGasFactor = natGasConversionFactor

                //need to update the base case.
                if(value['value'] === 'source_eui'){
                    tempElectricFactor = 1 * electricitySourceToSite['value'] / dataUtils.getConversionFactor("kwh", "kbtu")
                    tempNatGasFactor = 1 * natGasSourceToSite['value'] / dataUtils.getConversionFactor("therm", "kbtu")
                }else if(value['value'] === 'site_energy'){
                    tempElectricFactor = floorArea
                    tempNatGasFactor = floorArea
                }else if(value['value'] === 'source_energy'){
                    tempElectricFactor = floorArea * electricitySourceToSite['value']  / dataUtils.getConversionFactor("kwh", "kbtu")
                    tempNatGasFactor = floorArea * natGasSourceToSite['value'] / dataUtils.getConversionFactor("therm", "kbtu")
                }else if(value['value'] === 'carbon_emission'){
                    tempElectricFactor = electricityCarbon['value'] / dataUtils.getConversionFactor('kwh','kbtu')
                    tempNatGasFactor = natGasCarbon['value'] / dataUtils.getConversionFactor('therm','kbtu')
                }else if(value['value'] === 'utility_cost'){
                    tempElectricFactor = electricityRate['value'] / dataUtils.getConversionFactor('kwh','kbtu')
                    tempNatGasFactor = natGasRate['value'] / dataUtils.getConversionFactor('therm','kbtu')
                }else{
                    tempElectricFactor = 1.0
                    tempNatGasFactor = 1.0
                }
                setElectricityConversionFactor(tempElectricFactor)
                setNatGasConversionFactor(tempNatGasFactor)
                setAnalysisType(value)
            }
        }else if (e['name'] === 'scenario_list'){
            if(value['value'] !== selectedScenario['value']){
                setSelectedScenario(value)
                setSelectedScenarioMetricValue(calculatedValues(value.value))
            }
        }
    }

    const renderComplianceOutcome = () => {
        let color = "success"
        let outcome = "PASS"

        if(baselineMetricValue <= selectedScenarioMetricValue){
            outcome = "FAIL"
            color = "warning"
        }

        return (
        <>
            <Card bg={color} style={{"height": "94%"}}>
                <Card.Body>
                    <h1 style={{"padding": "35%", "textAlign": "center", "color": "white"}}>{outcome}</h1>
                </Card.Body>
            </Card>
        </>)
    }

    return (
        <>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <h3>Senario Report</h3>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col xs={6}>
                            <h6>Scenario</h6>
                            <Select
                                options={[...scenarioListArray]}
                                name={"scenario_list"}
                                value={selectedScenario}
                                onChange={handleOptionChanges}
                            ></Select>
                        </Col>
                        <Col xs={6}>
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
                    <h3>Summary</h3>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col xs={10}>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Name: <strong>{dataUtils.getSelectedScenarioInfo(scenarioListState.cases, selectedScenario)["name"]}</strong>
                                        </td>
                                        <td></td>
                                        <td> 
                                            Floor Area: <strong>{floorArea}</strong> (ft2)
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            Building Type: <strong>{bldgType["value"]}</strong>
                                        </td>
                                        <td></td>
                                        <td>
                                            Climate Zone: <strong>{climateZone["value"]}</strong>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                </div>
            </div>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <h3>Compare with Standard</h3>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col xs={8}>
                            <Row>
                                <Col>
                                    <CustomDisplayCard
                                        cardTitle = {"Design"}
                                        displayData = {selectedScenarioMetricValue}
                                        displaySmall = {dataUtils.getAnalysisTypeUnit(analysisType.value)}
                                        badgeInfo = {"Base"} 
                                        badgeColor = {"warning"}
                                    >
                                    </CustomDisplayCard>
                                </Col>
                                <Col>
                                    <div className={"icard"}>
                                        <div className={"icard-title"}>
                                            <h5>Baseline Metrics</h5>
                                        </div>
                                        <div className={"icard-content"} style={{"height": "108px"}}>
                                            <h2>{analysisType.label}</h2>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <CustomDisplayCard
                                        cardTitle = {"Baseline"}
                                        displayData = {baselineMetricValue}
                                        displaySmall = {dataUtils.getAnalysisTypeUnit(analysisType.value)}
                                        badgeInfo = {"Design"} 
                                        badgeColor = {"primary"}
                                        >
                                    </CustomDisplayCard>
                                </Col>
                                <Col>
                                    <div className={"icard"}>
                                        <div className={"icard-title"}>
                                            <h5>Code</h5>
                                        </div>
                                        <div className={"icard-content"} style={{"height": "108px"}}>
                                            <h2>ASHRAE 90.1</h2>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={4}>
                            {renderComplianceOutcome()}
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <h3>Fuel Usage</h3>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <Col>
                                    <div className={"icard card border-primary"}>
                                        <div className={"icard-content"}>
                                            <h2>{dataUtils.format_num_to_string(
                                                dataUtils.fixed_2(
                                                    calculatedElectricValues(selectedScenario.value) * floorArea * dataUtils.getConversionFactor("kbtu", "kwh")))}</h2>
                                            <small>Electricity (kWh)</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={"icard card border-danger"}>
                                        <div className={"icard-content"}>
                                            <h2>{dataUtils.format_num_to_string(
                                                dataUtils.fixed_2(
                                                    calculatedNatGasValues(selectedScenario.value) * floorArea * dataUtils.getConversionFactor("kbtu", "therm")))}</h2>
                                            <small>Natural Gas (therm)</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={8}>
                            <CustomPieChart
                                scenarioData = {fuelPieChartValue}
                                scenarioLabels= {["Electricity (kBtu)", "Natural Gas (kBtu)"]}
                                width= {700}
                                height={250}
                            >
                            </CustomPieChart>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <h3>{analysisType.label} Breakdowns</h3>
                </div>
                <div className={"icard-content"}>
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <Col>
                                    <div className={"icard card text-white bg-primary"}>
                                        <div className={"card-body"}>
                                            <h2>{alg.calculateCool(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor)}</h2>
                                            <small>Cool ({dataUtils.getAnalysisTypeUnit(analysisType.value)})</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={"icard card text-white bg-info"}>
                                        <div className={"card-body"}>
                                            <h2>{alg.calculateGen(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor)}</h2>
                                            <small>General ({dataUtils.getAnalysisTypeUnit(analysisType.value)})</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={"icard card text-white bg-success"}>
                                        <div className={"card-body"}>
                                            <h2>{alg.calculateAux(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor)}</h2>
                                            <small>Auxiliary ({dataUtils.getAnalysisTypeUnit(analysisType.value)})</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={"icard card text-white bg-warning"}>
                                        <div className={"card-body"}>
                                            <h2>{alg.calculateELHeat(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor)}</h2>
                                            <small>Heating (Electricity) ({dataUtils.getAnalysisTypeUnit(analysisType.value)})</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={"icard card text-white bg-danger"}>
                                        <div className={"card-body"}>
                                            <h2>{alg.calculateNGHeat(bldgType.value, climateZone.value, scenarioState[selectedScenario.value], electricityConversionFactor)}</h2>
                                            <small>Heating (Natural Gas) ({dataUtils.getAnalysisTypeUnit(analysisType.value)})</small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={8}>
                            <CustomPieChart
                                scenarioData = {metricBreakdownValue}
                                scenarioLabels= {metricBreakdownLabel}
                                width= {800}
                                height= {700}
                                colors={['rgb(2,117,216)', 'rgb(91,192,222)', 'rgb(92, 184, 92)', 'rgb(240, 173, 78)', 'rgb(217, 83, 79)']}
                            >
                            </CustomPieChart>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}