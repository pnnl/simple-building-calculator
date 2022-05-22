import React, {useState, useEffect} from "react";
import {ProjectContext, ScenarioContext, ScenarioListContext, AdvancedConfigContext} from "../store/index";
import InputForm from "../components/inputForm";
import CustomBarChart from "../components/customBarChart";
import CustomTable from "../components/customTable";
import { Row, Col, Button, Card, Modal } from "react-bootstrap";
import * as dataUtils from "../util/dataProcessor.jsx";
import * as alg from '../util/algorithmLoader.jsx'
import {Link, useParams, useNavigate} from "react-router-dom"
import {CustomModal} from '../components/customModal'
import Select from "react-select"
import {useSpring, animated} from "react-spring"

//GLOBAL CONSTANTE / Enum
const tableInit = {
  base: {
    rowName: "base",
    "Electricity-Auxiliary": 1.07,
    "Electricity-Cooling": 0.6,
    "Electricity-General": 18.27,
    "Electricity-Heating": 12.46,
    "Natural Gas-Heating": 4.03,
    total: 0.0,
  },
  design: {
    rowName: "design",
    "Electricity-Auxiliary": 0.0,
    "Electricity-Cooling": 0.0,
    "Electricity-General": 0.0,
    "Electricity-Heating": 0.0,
    "Natural Gas-Heating": 0.0,
    total: 0.0,
  },
  savings: {
    rowName: "Savings",
    "Electricity-Auxiliary": 0.0,
    "Electricity-Cooling": 0.0,
    "Electricity-General": 0.0,
    "Electricity-Heating": 0.0,
    "Natural Gas-Heating": 0.0,
    total: 0.0,
  },
  savePercent: {
    rowName: "Percent Savings",
    "Electricity-Auxiliary": 0.0,
    "Electricity-Cooling": 0.0,
    "Electricity-General": 0.0,
    "Electricity-Heating": 0.0,
    "Natural Gas-Heating": 0.0,
    total: 0.0,
  },
};

function Design() {
  const navigate = useNavigate()
  const {scenarioId}= useParams()

  //animation style
  const fadeInRight = useSpring({
    opacity: 1,
    config: {mass:1, tension:20, friction:3, clamp: true},
    transform: "translate(0px, 0px)",
    from: { opacity: 0, transform: "translate(20px, 0px)" }
  });

  const fadeInLeft = useSpring({
    opacity: 1,
    config: {mass:1, tension:20, friction:3, clamp: true},
    transform: "translate(0px, 0px)",
    from: { opacity: 0, transform: "translate(-20px, 0px)" }
  });

  //modal function
  const[show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //GLOBAL STATES
  const {bldgType, climateZone, currentWorkingScenario, setCurrentWorkingScenario, floorArea, currentBaseCase, setCurrentBaseCase} = React.useContext(ProjectContext)
  const {electricityRate,natGasRate,electricityCarbon,natGasCarbon,electricitySourceToSite,natGasSourceToSite} = React.useContext(AdvancedConfigContext)
  const [scenarioState, scenarioDispatch] = React.useContext(ScenarioContext)
  const [scenarioListState, scenarioListDispatch] = React.useContext(ScenarioListContext)

  let defaultArray = (scenarioState.hasOwnProperty(scenarioId))? scenarioState[scenarioId]: {}
  //let defaultBaseCaseTemp = (scenarioListState.cases.length > 0)? {"value": scenarioListState.cases[0].id, "label": scenarioListState.cases[0].name}: {"value":"", "label": ""}
  //let defaultBaseCase = dataUtils.getDefaultDataForStandard('ashrae9012019', bldgType, climateZone)
  let defaultBaseCase = scenarioState[currentBaseCase]
  //local state to set base case for generating tornado diagram
  //TODO 
  const analysisTypeArray = dataUtils.getAnalysisType()
  const [baseCase, setBaseCase] = useState(defaultBaseCase)
  const [dataArray, setDataArray] = useState(defaultArray)
  const [scenarioName, setScenarioName] = useState(currentWorkingScenario)
  const [analysisType, setAnalysisType] = useState(analysisTypeArray[0])
  const [electricConvertFactor, setElectricConvertFactor] = useState(1.0)
  const [natGasConvertFactor, setNatGasConvertFactor] = useState(1.0)
  //VISUAL DATA STATES
  const [plotData, setPlotData] = useState(dataUtils.makeBasePlotData(scenarioListState.cases.filter(scenario => scenario["id"] === currentBaseCase)[0]));

  const [tableData, setTableData] = useState(tableInit);
  const tableColumns = React.useMemo(() => dataUtils.makeTableColumn());

  //update the currentState (the list of the scenarios)
  //used for duplicate case
  useEffect(()=>{
    if(scenarioName !== currentWorkingScenario){
      setCurrentWorkingScenario(scenarioName)
    }
  }, [scenarioName])

  
  //Updates graph
  const updateGraph = (keyWord, output) => {
    //update the graph
    let x_array = [];
    let y_array = [];
    for (let key in output) {
      y_array.push(output[key]);
      x_array.push(key);
    }

    var trace = {
      x: x_array,
      y: y_array,
      name: keyWord,
      type: "bar",
    };

    const plotDataTemp = { ...plotData };
    if (keyWord in plotData) {
      //NESTED STATE UPDATE METHOD
      plotDataTemp[keyWord].x = x_array;
      plotDataTemp[keyWord].y = y_array;
      setPlotData(plotDataTemp);
    } else {
      //this code will only be called when initializing the page
      plotDataTemp[keyWord] = trace;
      setPlotData(plotDataTemp);
    }

    //update table
    const tableDataTemp = { ...tableData };
    if (keyWord in tableData) {
      for (let key in output) {
        tableDataTemp[keyWord][key] = output[key];
      }
      tableDataTemp[keyWord]["rowName"] = keyWord;
    } else {
      //this code will only be called when initializing the page
      output["rowName"] = keyWord;
      tableDataTemp[keyWord] = output;
    }
    dataUtils.makeTableData(tableDataTemp);
    setTableData(tableDataTemp);
  }

  // output is the calculated energy consumption
  // keyWord is design or base
  const handleOutputChange = (value, keyWord) => {
    //calculate the output:
    let output = {}
    if(keyWord === 'design'){
      output['Electricity-General'] = alg.calculateGen(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Electricity-Auxiliary'] = alg.calculateAux(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Electricity-Cooling'] = alg.calculateCool(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Electricity-Heating'] = alg.calculateELHeat(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Natural Gas-Heating'] = alg.calculateNGHeat(bldgType.value, climateZone.value, value, natGasConvertFactor)
  
      //update the dataArray
      let newDataArray = {
          ...dataArray,
          ...value
      }
      setDataArray(newDataArray)
    }else{
      //its base case - update output to basecase
      //in this case, the value is the key to the scenario list
      //const results = scenarioListState.cases.filter(scenario => scenario.id === value)[0]
      output['Electricity-General'] = alg.calculateGen(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Electricity-Auxiliary'] = alg.calculateAux(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Electricity-Cooling'] = alg.calculateCool(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Electricity-Heating'] = alg.calculateELHeat(bldgType.value, climateZone.value, value, electricConvertFactor)
      output['Natural Gas-Heating'] = alg.calculateNGHeat(bldgType.value, climateZone.value, value, natGasConvertFactor)
  
      let newBaseCase = {
        ...baseCase,
        ...value
      }
      setBaseCase(newBaseCase)
    }
    updateGraph(keyWord, output)
    
  };

  //CONDITIONAL rendering to prevent link guessing
  if(bldgType===undefined && climateZone === undefined){
    //prevent rendering if global variables are empty
    return(<></>)
  }

  //Reducer DISPTACHER function
  const dispatchCombined = () => {
    if(scenarioState.hasOwnProperty(scenarioId)){
      scenarioDispatch({type:"modify", payload: dataArray, key:scenarioId})
    }else{
      scenarioDispatch({type:"add", payload: dataArray, key: scenarioId})
    }

    const scenarioList = scenarioListState.cases.filter(scenario => scenario.id === scenarioId)
    let payLoad = {}
    const dateTime = new Date()
    if(scenarioList === undefined || scenarioList.length === 0){
      payLoad["id"] = scenarioId
      payLoad['name'] = scenarioName
      payLoad['status'] = "active"
      payLoad['type'] = "user"
      payLoad['time'] = dateTime.toISOString()

      payLoad['Electricity-General'] = alg.calculateGen(bldgType.value, climateZone.value, dataArray)
      payLoad['Electricity-Auxiliary'] = alg.calculateAux(bldgType.value, climateZone.value, dataArray)
      payLoad['Electricity-Cooling'] = alg.calculateCool(bldgType.value, climateZone.value, dataArray)
      payLoad['Electricity-Heating'] = alg.calculateELHeat(bldgType.value, climateZone.value, dataArray)
      payLoad['Natural Gas-Heating'] = alg.calculateNGHeat(bldgType.value, climateZone.value, dataArray)

      payLoad['eui'] = dataUtils.fixed_2(payLoad['Electricity-General'] + payLoad['Electricity-Auxiliary'] + 
        payLoad['Electricity-Cooling'] + payLoad['Electricity-Heating'] +
        payLoad['Natural Gas-Heating'])
      payLoad['unit'] = "kBtu/ft2-year"
      scenarioListDispatch({type:"add", payload: payLoad})
    }else{
      //in this case, we only update the time and eui
      payLoad['time'] = dateTime.toISOString()
      payLoad['name'] = scenarioName
      payLoad['Electricity-General'] = alg.calculateGen(bldgType.value, climateZone.value, dataArray)
      payLoad['Electricity-Auxiliary'] = alg.calculateAux(bldgType.value, climateZone.value, dataArray)
      payLoad['Electricity-Cooling'] = alg.calculateCool(bldgType.value, climateZone.value, dataArray)
      payLoad['Electricity-Heating'] = alg.calculateELHeat(bldgType.value, climateZone.value, dataArray)
      payLoad['Natural Gas-Heating'] = alg.calculateNGHeat(bldgType.value, climateZone.value, dataArray)
      payLoad['eui'] = dataUtils.fixed_2(payLoad['Electricity-General'] + payLoad['Electricity-Auxiliary'] + 
        payLoad['Electricity-Cooling'] + payLoad['Electricity-Heating'] +
        payLoad['Natural Gas-Heating'])
      scenarioListDispatch({type:"modify", payload:payLoad, key:scenarioId})
    }
  }

  const handleChangeScenarioNameAndBaseCase = (e, baseObject) => {
    setScenarioName(e)
    let scenario = scenarioState[baseObject["value"]]
    handleOutputChange(scenario, "base")
  }

  const handleChangeAnalysisType = (value) => {
    if(value['value'] !== analysisType['value']){
      setAnalysisType(value)
    }
    let tempElectricFactor = electricConvertFactor
    let tempNatGasFactor = natGasConvertFactor

    //need to update the base case.
    if(value['value'] === 'source_eui'){
      tempElectricFactor = 1 * electricitySourceToSite['value'] / dataUtils.getConversionFactor("kwh", "kbtu")
      tempNatGasFactor = 1 * natGasSourceToSite['value'] /dataUtils.getConversionFactor("therm", "kbtu")
    }else if(value['value'] === 'site_energy'){
      tempElectricFactor = floorArea
      tempNatGasFactor = floorArea
    }else if(value['value'] === 'source_energy'){
      tempElectricFactor = floorArea * electricitySourceToSite['value']/ dataUtils.getConversionFactor("kwh", "kbtu")
      tempNatGasFactor = floorArea * natGasSourceToSite['value'] /dataUtils.getConversionFactor("therm", "kbtu")
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

    let output={ }
    output['Electricity-General'] = alg.calculateGen(bldgType.value, climateZone.value, dataArray, tempElectricFactor)
    output['Electricity-Auxiliary'] = alg.calculateAux(bldgType.value, climateZone.value, dataArray, tempElectricFactor)
    output['Electricity-Cooling'] = alg.calculateCool(bldgType.value, climateZone.value, dataArray, tempElectricFactor)
    output['Electricity-Heating'] = alg.calculateELHeat(bldgType.value, climateZone.value, dataArray, tempElectricFactor)
    output['Natural Gas-Heating'] = alg.calculateNGHeat(bldgType.value, climateZone.value, dataArray, tempNatGasFactor)

    updateGraph('design', output)

    //update base case
    output['Electricity-General'] = alg.calculateGen(bldgType.value, climateZone.value, baseCase, tempElectricFactor)
    output['Electricity-Auxiliary'] = alg.calculateAux(bldgType.value, climateZone.value, baseCase, tempElectricFactor)
    output['Electricity-Cooling'] = alg.calculateCool(bldgType.value, climateZone.value, baseCase, tempElectricFactor)
    output['Electricity-Heating'] = alg.calculateELHeat(bldgType.value, climateZone.value, baseCase, tempElectricFactor)
    output['Natural Gas-Heating'] = alg.calculateNGHeat(bldgType.value, climateZone.value, baseCase, tempNatGasFactor)

    updateGraph('base', output)

    
    setElectricConvertFactor(tempElectricFactor)
    setNatGasConvertFactor(tempNatGasFactor)
  }

  //Updates the basecase
  const baseCaseUpdate = (scenario_id) => {
    handleOutputChange(scenario_id, 'base')
  }

  return (
    <>
      <Row>
        <Col xs={6}>
          <CustomModal
              buttonVariant={"secondary"}
              buttonSize={""}
              buttonStyle={{}}
              buttonText={scenarioName}
              modalTitle={"Enter a new name for the scenario"}
              createAction={handleChangeScenarioNameAndBaseCase}
              closeText={"Close"}
              confirmText={"Confirm"}
              options={dataUtils.convert_scenario_list_to_option_list(scenarioListState)}
            >
            </CustomModal>
        </Col>
        <Col xs={6}>
          <Link to="/simple-building-calculator/scenario"><Button className="pull-right" variant="warning" id="exit" onClick={dispatchCombined} style={{marginRight:"26px"}}>Exit</Button></Link>
          <Button className="pull-right" variant="danger" id="cancel" onClick={()=>{if(window.confirm("Do you want to cancel your changes?")){navigate('/scenario')}}}>Cancel</Button>
          <Button className="pull-right" variant="success" id="save" onClick={dispatchCombined}>Save</Button>{' '}
        </Col>
      </Row>
      <Row>
      <div className="row align-items-md-stretch">
        <animated.div className="col-md-6" style={fadeInLeft}>
          <Card style={{height: "1280px"}}>
            <div className={"scrollable"}>
              <Card.Body>
                <InputForm
                id={scenarioId}
                onOutputChange={handleOutputChange}
                key={scenarioId}
              />
              </Card.Body>
            </div>
          </Card>
        </animated.div>
        <animated.div className="col-md-6" style={fadeInRight}>
          <Row>
            <Col>
            <Select 
              options={[...analysisTypeArray]} 
              name={"analysis_type"} 
              value={analysisType}
              onChange={handleChangeAnalysisType}></Select>
            </Col>
          </Row>
          <div className="card">
            <CustomBarChart plotData={plotData} barmode={"group"} unit={`${analysisType['label']} [${dataUtils.getAnalysisTypeUnit(analysisType['value'])}]`} title={analysisType['label']}/>
          </div>
          <div className="icard" style={{marginBottom: "0px"}}>
            <div className="icard-title">
              <h3>Legend</h3>
            </div>
            <div className="icard-content">
            <p><strong>Electricity General:</strong> Include interior lighting, exterior lighting, interior equipment, exterior equipment, refrigeration, generators.</p>
                  <p><strong>Electricity HVAC Auxiliary:</strong> Include fans, pumps and heat recovery.</p>
                  <p><strong>Space Cooling:</strong> Include cooling and heat rejection.</p>
                  <p><strong>Electricity space heating:</strong> Heating and Humidification.</p>
                  <p><strong>Natural Gas space heating:</strong> Heating.</p>
            </div>
          </div>
          <div className={"icard"}>
            <div className={"icard-title"}>
              <h3>Table</h3>
              <Button variant="success" onClick={handleShow} className={"pull-right"}>Help</Button>
              <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>How to?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p><strong>Electricity General:</strong> Include interior lighting, exterior lighting, interior equipment, exterior equipment, refrigeration, generators.</p>
                  <p><strong>Electricity HVAC Auxiliary:</strong> Include fans, pumps and heat recovery.</p>
                  <p><strong>Space Cooling:</strong> Include cooling and heat rejection.</p>
                  <p><strong>Electricity space heating:</strong> Heating and Humidification.</p>
                  <p><strong>Natural Gas space heating:</strong> Heating.</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                      Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="icard-content">
              <CustomTable columns={tableColumns} data={tableData} />
            </div>
          </div>
        </animated.div>
      </div>
      </Row>
    </>
  );
}

export default Design;