import React, {useState, useContext} from "react";
import {ProjectContext } from "../store/index";
import {Card, Row, Col, ListGroup, Form, FormControl, Container, InputGroup, ButtonGroup, ToggleButton, Table, DropdownButton, Dropdown} from "react-bootstrap"
import {ScenarioListContext} from "../store/index";
import CustomListGroupItem from "../components/customListGroupItem";
import {useNavigate} from "react-router-dom"
import {genID} from '../util/strUtil'
import {CustomModal} from '../components/customModal'
import { useEffect } from "react";
import * as dataUtils from "../util/dataProcessor"
import {useSpring, animated} from "react-spring";
import Scroll from "../components/scroll"
import CustomPieChart from '../components/customPieChart';

const scenarioStatus=[
  {name: 'Active', value: '1'},
  {name: 'All', value: '2'}
]

function Scenario() {
  //SET UPS
  //animation style
  const fadeInRight = useSpring({
    opacity: 1,
    config: {mass:1, tension:20, friction:3, clamp: true},
    transform: "translate(0px, 0px)",
    from: { opacity: 0, transform: "translate(20px, 0px)" }
  });
  const { bldgType, climateZone, floorArea, setCurrentWorkingScenario, setCurrentBaseCase} = useContext(ProjectContext)
  //state format check scenarioReducer.jsx
  const [state, dispatch] = useContext(ScenarioListContext)
  //we can later use this to update the search results - use deep copy first.
  const[currentState, setCurrentState] = useState(state.cases)
  //search related
  const[searchWords, setSearchWords] = useState("")
  const[sortWords, setSortWords] = useState("time")
  const[displayStatusValue, setDisplayStatusValue] = useState("1")
  const[selectedCase, setSelectedCase] = useState({})

  const navigate = useNavigate()
 
  //FUNCTIONS
  //update the currentState (the list of the scenarios)
  //used for duplicate case
  useEffect(()=>{
    if(currentState !== state.cases){
      setCurrentState(state.cases)
    }
    if(bldgType==="" || climateZone===""){
       //navigate back to project
      navigate("/project")
    }
  }, [state.cases])

  const createNewScenario = (e, base) => {
    let linkDesign = '/design/' + genID()
    setCurrentWorkingScenario(e)
    setCurrentBaseCase(base["value"])
    navigate(linkDesign)
  }

  const handleMouseClick = (selectedCase) => {
    setSelectedCase(selectedCase)
  }

  /*
  utility function that sorts the list of scenarios in a time order
  */
  function order(a, b) {
    if(sortWords === "time"){
      return (new Date(b.props.valueStatus.time) - new Date(a.props.valueStatus.time))
    }else if(sortWords === "name"){
      return b.props.valueStatus.name - a.props.valueStatus.name
    }else if(sortWords === "eui"){
      return b.props.valueStatus.eui - a.props.valueStatus.eui
    }
  }

  function searchScenarioList(){
    return currentState.filter(scenario => scenario.name.toLowerCase().includes(searchWords.toLowerCase())).map((scenario, index) => (
      <CustomListGroupItem valueStatus={scenario} index={index} key={index} displayStatus={displayStatusValue} handleMouseClick={handleMouseClick}/>
    )).sort(order)
  }

  function scenarioSnapshotRender(){
    if(Object.keys(selectedCase).length > 0){
      return (
        <>
          <Row>
          <Col>
            <Table size="sm">
              <tbody>
                <tr>
                  <td>
                    Name: <strong>{selectedCase["name"]}</strong>
                  </td>
                </tr>
                <tr>
                  <td> 
                    Floor Area: <strong>{floorArea}</strong> (ft2)
                  </td>
                </tr>
                <tr>
                  <td>
                    Building Type: <strong>{bldgType["value"]}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Climate Zone: <strong>{climateZone["value"]}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    EUI: <strong>{`${selectedCase["eui"]} (${selectedCase["unit"]})`}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Status: <strong>{selectedCase["status"]}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Time: <strong>{selectedCase["time"]}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          </Row>
          <Row>
            <Col>
              <CustomPieChart
                scenarioData = {[selectedCase['Electricity-Cooling'], selectedCase['Electricity-General'], selectedCase['Electricity-Auxiliary'], selectedCase['Electricity-Heating'], selectedCase['Natural Gas-Heating']]}
                scenarioLabels= {[`Cool (kBtu/ft2)`,`General (kBtu/ft2)`, `Auxiliary (kBtu/ft2)`, `Heating (Electricity) (kBtu/ft2)`, `Heating (Natural Gas) (kBtu/ft2)`]}
                width= {320}
                height= {600}
                colors={['rgb(2,117,216)', 'rgb(91,192,222)', 'rgb(92, 184, 92)', 'rgb(240, 173, 78)', 'rgb(217, 83, 79)']}
              >
              </CustomPieChart>
            </Col>
          </Row>
        </>
        
      )
    }
  }

  if(currentState.length === 2){
    //Temp fix - every new project will have minimum 2 cases.
    return(
      <animated.div style={fadeInRight}>
        <Row style={{marginTop: "30px"}}>
          <Col xs={12}>
            <Card>
              <Card.Header>
                <Row>
                  <Col><h3>Scenarios</h3></Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Container style={{position: "relative", width: "50%"}}>
                  <img src="/simple-building-calculator/img/bldg_background.png" alt="building" style={{width:"100%", height:"auto"}}/>
                  <CustomModal
                    buttonVariant={"secondary"}
                    buttonSize={"lg"}
                    buttonStyle={{position: "absolute", top:"45%", left:"40%"}}
                    buttonText={"New Scenario"}
                    modalTitle={"Enter the name of the new scenario"}
                    createAction={createNewScenario}
                    closeText={"Close"}
                    confirmText={"Create"}
                    options = {dataUtils.convert_scenario_list_to_option_list(state)}
                  ></CustomModal>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </animated.div>
    )
  }

  return (
    <animated.div style={fadeInRight}>
      <Row style={{marginTop: "30px"}}>
        <Col xs={8}>
          <Card>
            <Card.Header>
              <Row>
                <Col><h3 style={{marginTop:"6px"}}>Scenarios</h3></Col>
                <Col><CustomModal
                    buttonVariant={"secondary"}
                    buttonSize={"lg"}
                    buttonStyle={{float: "right", marginTop:"0px"}}
                    buttonText={"New Scenario"}
                    modalTitle={"Enter the name of the new scenario"}
                    createAction={createNewScenario}
                    closeText={"Close"}
                    confirmText={"Create"}
                    options = {dataUtils.convert_scenario_list_to_option_list(state)}
                  ></CustomModal></Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col md={10}>
                    <Form className="d-flex">
                      <InputGroup>
                        <DropdownButton
                          variant="outline-secondary"
                          title={`Sort by: ${sortWords}`}
                          id="scenario_sort"
                          onSelect={(event) => setSortWords(event)}
                        >
                          <Dropdown.Item eventKey="time">Time</Dropdown.Item>
                          <Dropdown.Item eventKey="eui">EUI</Dropdown.Item>
                          <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                        </DropdownButton>
                        <FormControl
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          value={searchWords}
                          onChange={(event) => setSearchWords(event.target.value)}
                        />
                      </InputGroup>
                    </Form>
                  </Col>
                  <Col md={2}>
                  <ButtonGroup className={"pull-right"}>
                    {
                      scenarioStatus.map((status, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`display-status-${idx}`}
                          type="radio"
                          variant={idx%2 ? 'outline-success' : 'outline-danger'}
                          name="status"
                          value={status.value}
                          checked={displayStatusValue === status.value}
                          onChange={(e) => setDisplayStatusValue(e.currentTarget.value)}
                        >
                          {status.name}
                        </ToggleButton>
                      ))
                    }
                  </ButtonGroup>
                  </Col>
                </Row>
              </Card.Title>
              <br></br>      
              <ListGroup>
                <Scroll>
                  {searchScenarioList()}
                </Scroll>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <animated.div className="icard" style={fadeInRight}>
            <div className="icard-title">
              <h4>Scenario Snapshot</h4>
            </div>
            <div className="icard-content">
              {
                scenarioSnapshotRender()
              }
            </div>
          </animated.div>
        </Col>
      </Row>
    </animated.div>
  );
}

export default Scenario;