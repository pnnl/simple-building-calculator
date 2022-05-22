import React, {useContext, useEffect} from "react";
// react-bootstrap components
import {Tabs, Tab} from "react-bootstrap";
import {ProjectContext} from "../store/index";
import {useNavigate} from "react-router-dom";
import ScenarioCompare from "../components/scenarioCompare";
import ScenarioReport from "../components/scenarioReport";
import ScenarioOpportunity from "../components/scenarioOpportunity";
import {useSpring, animated} from "react-spring"
import {ScenarioListContext} from "../store/index";

function Visualizer() {
  const {bldgType, climateZone} = useContext(ProjectContext)
  const [state, dispatch] = useContext(ScenarioListContext)
  const navigate = useNavigate()

  //FUNCTIONS
  useEffect(()=>{
    if(bldgType==="" || climateZone===""){
       //navigate back to project if the project is not initialized
      navigate("/simple-building-calculator/project")
    }
    if(state.cases.length === 2){
      //navigate back to scenario page if project has no cases
      navigate("/simple-building-calculator/scenario")
    }
  })

  //animation style
  const fadeInRight = useSpring({
    opacity: 1,
    config: {mass:1, tension:20, friction:3, clamp: true},
    transform: "translate(0px, 0px)",
    from: { opacity: 0, transform: "translate(20px, 0px)" }
  });

  if(bldgType==="" || climateZone===""){
    return (
      <></>
    )
  }

  if(state.cases.length === 2){
    return (
      <></>
    )
  }

  return (
    <animated.div style={fadeInRight}>
      <Tabs defaultActiveKey="compare" id="scenario-visualization" className="mb-3">
        <Tab eventKey="compare" title="Scenario Compare">
          <ScenarioCompare></ScenarioCompare>
        </Tab>
        <Tab eventKey="opportunity" title="Saving Opportunity">
          <ScenarioOpportunity></ScenarioOpportunity>
        </Tab>
        <Tab eventKey="report" title="Scenario Report">
          <ScenarioReport></ScenarioReport>
        </Tab>
      </Tabs>
    </animated.div>
  );
}

export default Visualizer;