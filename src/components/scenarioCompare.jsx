import React, {useContext, useState} from 'react'
import CustomBarChart from "../components/customBarChart";
import CustomDisplayCard from "../components/customDisplayCard";
import CustomResponsiveTable from './customResponsiveTable';
import {ProjectContext, ScenarioListContext, ScenarioContext, AdvancedConfigContext} from "../store/index";
import { Row, Col, Button } from "react-bootstrap";
import * as dataUtils from "../util/dataProcessor.jsx";
import Select from "react-select"

const category=["Electricity-Auxiliary",
    "Electricity-Cooling",
    "Electricity-General",
    "Electricity-Heating",
    "Natural Gas-Heating",]

const colorMap = {
    "Electricity-Auxiliary": "#173F5F",
    "Electricity-Cooling": "#20639B",
    "Electricity-General": "#3CAEA3",
    "Electricity-Heating": "#F6D55C",
    "Natural Gas-Heating": "#ED553B",
}

export default function ScenarioCompare(){
    //get global variables
    const {floorArea, project} = useContext(ProjectContext)
    const [scenarioListState, scenarioListDispatch] = useContext(ScenarioListContext)
    const [scenarios, scenariosDispath] = useContext(ScenarioContext)
    const {electricityRate,natGasRate,electricityCarbon,natGasCarbon,electricitySourceToSite,natGasSourceToSite} = React.useContext(AdvancedConfigContext)

    const analysisTypeArray = dataUtils.getAnalysisType()
    const [analysisType, setAnalysisType] = useState(analysisTypeArray[0])

    //this component draws a bar chart
    const generatePlotData = (traces, electricMultiplier, natGasMultiplier) => {
        for(var i=0; i<category.length; i++){
            var trace = {}
            var y = []
            var x = []
            var maxTechX = ""
            var maxTechY = 0.0
            for(var j=0; j<scenarioListState.cases.length; j++){
                if(scenarioListState.cases[j]["id"] === "baseline" || scenarioListState.cases[j]["status"] === "active") {
                    x.push(scenarioListState.cases[j]['name'])
                    if(category[i].startsWith('Electricity')){
                        //electricity multiplier
                        y.push(scenarioListState.cases[j][category[i]] * electricMultiplier)
                    }else{
                        //natural gas multiplier
                        y.push(scenarioListState.cases[j][category[i]] * natGasMultiplier)
                    }
                }else if(scenarioListState.cases[j]["id"] === "max_tech"){
                    maxTechX = "Max Tech"
                    if(category[i].startsWith('Electricity')){
                        //electricity multiplier
                        maxTechY = scenarioListState.cases[j][category[i]] * electricMultiplier
                    }else{
                        //natural gas multiplier
                        maxTechY = scenarioListState.cases[j][category[i]] * natGasMultiplier
                    }
                }
            }
            // add max tech at the end
            x.push(maxTechX)
            y.push(maxTechY)
            trace["x"] = x
            trace["y"] = y
            trace["name"] = category[i]
            trace["type"] = 'bar'
            //set the color.
            trace["marker"] = {"color": colorMap[category[i]]}
            traces.push(trace)
        }
        return traces
    }

    const [plotData, setPlotData] = useState(generatePlotData([], 1.0, 1.0))

    const handleChangeAnalysisType = (value) => {
        if(value['value'] !== analysisType['value']){
            setAnalysisType(value)
          }
          let tempElectricFactor = dataUtils.getElectricConversionFactor(value["value"], floorArea, electricitySourceToSite["value"],electricityCarbon["value"], electricityRate["value"])
          let tempNatGasFactor = dataUtils.getNatGasConversionFactor(value["value"], floorArea, natGasSourceToSite["value"], natGasCarbon["value"], natGasRate["value"])
          let tempPlotData = generatePlotData([], tempElectricFactor, tempNatGasFactor)
          setPlotData(tempPlotData)
    }

    const baseCase = scenarioListState.cases.filter(scenario => scenario["id"] === "baseline")[0]
    const maxTechCase = scenarioListState.cases.filter(scenario => scenario["id"] === "max_tech")[0]

    return(
        <>
        <div className="icard">
            <div className="icard-title">
                <h3>Scenario Comparison</h3>
            </div>
            <div className="icard-content">
                <Row>
                    <Col xs={6}>
                    <Select 
                        options={[...analysisTypeArray]} 
                        name={"analysis_type"} 
                        value={analysisType}
                        onChange={handleChangeAnalysisType}></Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CustomBarChart plotData={plotData} barmode={"stack"} unit={`${analysisType['label']} [${dataUtils.getAnalysisTypeUnit(analysisType['value'])}]`} title={"Scenarios"}/>
                    </Col>
                </Row>
                <Row>
                    <Col><CustomDisplayCard
                            cardTitle = {"Baseline"}
                            displayData = {baseCase["eui"]}
                            displaySmall = {"kBtu/sqft/year"}
                            badgeInfo = {"Base"} 
                            badgeColor = {"warning"}
                        >
                        </CustomDisplayCard>
                    </Col>
                    <Col><CustomDisplayCard
                            cardTitle = {"Max Tech"}
                            displayData = {maxTechCase["eui"]}
                            displaySmall = {"kBtu/sqft/year"}
                            badgeInfo = {"Max"} 
                            badgeColor = {"primary"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={"icard"}>
                            <div className={"icard-title"}>
                                <h3>Scenarios Detail</h3>
                                <Button 
                                    variant="success"
                                    type="button"
                                    href={`data:text/json;charset=utf-8, ${encodeURIComponent(
                                        dataUtils.downloadDesignScenarioToLocal(scenarioListState, scenarios)
                                        )}`}
                                    download={`${project}.csv`}
                                    className={"pull-right"}
                                    >Download Session</Button>
                            </div>
                            <div className={"icard-content"}>
                                <CustomResponsiveTable
                                    dataValue =  {dataUtils.makeResponsibleTableData(scenarioListState, floorArea)}
                                ></CustomResponsiveTable>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        </>
    )
}