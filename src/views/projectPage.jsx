import React, {useContext} from "react";
import GlobalForm from "../components/globalForm";
// react-bootstrap components
import {ScenarioContext, ScenarioListContext} from "../store/index";
import * as dataUtils from "../util/dataProcessor.jsx";
import {useNavigate} from "react-router-dom"
import {Row, Col} from "react-bootstrap"
import * as alg from '../util/algorithmLoader.jsx'
import { animated, useSpring } from "react-spring";

function Home() {
  const [scenarioState, scenarioDispatch] = useContext(ScenarioContext)
  const [scenarioListState, scenarioListDispatch] = useContext(ScenarioListContext)

  const navigate = useNavigate()

  // OPTION VARIABLES INITIALIZATIONS
  const bldgTypeOptions = dataUtils.getBuildingTypeData();
  const climateZoneOptions = dataUtils.getClimateZoneData();

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

    // HANDLER FUNCTIONS
  //determine the global variables for algorithm selection
  const handleSubmitGlobalVariable = (e, bldgType, climateZone) => {
    if(e.target.id === "start" || e.target.id === "confirm"){
        // CHECK PASS, Navigate to /scenario
        //preload project baseline
        let dataArray = dataUtils.getProjectBaseline(bldgType, climateZone)
        let payLoad = {}
        let scenarioId = "baseline"
        scenarioDispatch({type:"add", payload: dataArray, key: scenarioId})
        payLoad["id"] = scenarioId
        //take out the standard label from the project baseline model
        payLoad['name'] = dataArray["standard"]["label"]
        payLoad['status'] = "inactive"
        payLoad['type'] = "base"
        payLoad['time'] = new Date().toISOString()

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

        //preload project max_tech
        dataArray = dataUtils.getProjectMaxTech(bldgType, climateZone)
        payLoad = {}
        scenarioId = "max_tech"
        scenarioDispatch({type:"add", payload: dataArray, key: scenarioId})
        payLoad["id"] = scenarioId
        payLoad['name'] = "Max Tech"
        payLoad['status'] = "inactive"
        payLoad['type'] = "max_tech"
        payLoad['time'] = new Date().toISOString()

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

        navigate('/scenario')
    }else if(e.target.id === "update"){
        scenarioDispatch({type: "reset"})
        scenarioListDispatch({type: "reset"})

        navigate('/scenario')
    }else if(e.target.id === "continue"){
      navigate('/scenario')
    }
  };

  return (
    <>
      <div className="mb-5 bg-light rounded-3">
        <Row>
          <Col sm={6}>
            <animated.div className="icard" style={fadeInLeft}>
              <div className="icard-title">
                <h3>Simple Building Calculator</h3>
              </div>
              <div className="icard-content">
                <p><strong>Simple Building Calculator (SBC)</strong> is a tool for small and simple commercial buildings to generate quick and interactive estimates of energy efficiency measures. </p>
                <p>SBC can evaluate whole-building or single measure savings in new or existing buildings, compare measure package choices, or provide simplified performance modeling for energy codes and utility incentives. </p>
                <p>The tool combines physical (annual whole building prototype simulation) and statistical modeling techniques to predict annual energy performance. It supports a variety of building characteristics for envelope, HVAC, and lighting with parameters ranging from vintage to max tech configurations, as well as support for single-zone and simple multi-zone HVAC systems. </p>
                <img src="/simple-building-calculator/img/diagram_intro.PNG" alt="intro of the tornado diagram" style={{width:"100%", height:"auto"}}/>
                <p><i><mark>Sample of the sensitivity analysis diagram</mark></i></p>
                <p>The Simple Building Calculator is designed to provide immediate feedback for otherwise computationally intensive tasks like measure comparison, development of multiple measure package combinations, or verification that measures meet efficiency targets—all with the goal of providing a tool for quick annual energy simulation of simple commercial buildings.</p>
                <img src="/simple-building-calculator/img/compare_with_standard.PNG" alt="Compare with standards" style={{width:"100%", height:"auto"}}/>
                <p><i><mark>Compare results with the Standard</mark></i></p>
                <br></br>
                <h4>For detailed information:</h4>
                <p>Nambiar, Chitra, and Reid Hart. "SIMPLE BUILDING CALCULATOR." In <i>ASHRAE Topical Conference Proceedings</i>, pp. 423-430. American Society of Heating, Refrigeration and Air Conditioning Engineers, Inc., 2020. <a href="/simple-building-calculator/doc/d-bsc20-c051.pdf">Read</a></p>
                <p>Hart, Reid, Chitra Chandrasekharan Nambiar, Jeremiah Williams, and Michael Reiner. "An Energy Calculator for Simple Commercial Buildings." (2020). <a href="/simple-building-calculator/doc/143_0376_0549_000237.pdf">Read</a></p>
                <h5>Feedbacks:</h5>
                <p>Click the <a href="https://docs.google.com/forms/d/10R37Dqbc-T80NYIk-7JumZ8OISeIEyZsmQy_wWvre1M/viewform?edit_requested=true">Feedback form</a> to request the features you would like to see in SBC!</p>
              </div>
            </animated.div>
          </Col>
          <Col sm={6}>
            <animated.div className="icard" style={fadeInRight}>
              <div className="icard-title">
                <h3>Project Info</h3>
              </div>
              <div className="icard-content">
                <GlobalForm
                    bldgTypeOptions={bldgTypeOptions}
                    climateZonesOptions={climateZoneOptions}
                    onSubmitGlobalVariable={handleSubmitGlobalVariable}
                  />
              </div>
            </animated.div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;