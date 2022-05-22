import React, {useContext} from "react";
import {NavLink} from "react-router-dom"
import {Navbar, Container, Nav, Button} from "react-bootstrap"
import {ProjectContext, ScenarioListContext} from "../store/index";
import {downloadDataFromLocal} from "../util/dataProcessor"

//Stateless Functional Component
const NavBar = () => {

  const [scenarioListState, scenarioListDispatch] = useContext(ScenarioListContext)
  const {project} = useContext(ProjectContext)

  const fileConditionRender = () => {
    if(scenarioListState!= undefined && "cases" in scenarioListState && scenarioListState.cases.length > 2){
      return (
        <Button 
        variant="success"
        type="button"
        href={`data:text/json;charset=utf-8, ${encodeURIComponent(
          JSON.stringify(downloadDataFromLocal())
        )}`}
        download={`${project}.json`}
        >Download Session</Button>
      )
    }
  }

  return (
    <React.Fragment>
      <Navbar bg="dark" fixed="top" variant="dark">
        <Container>
        <Navbar.Brand href="/simple-building-calculator/project"><img src="favicon.ico" style={{"width": "32px", "marginBottom": "7px"}}></img>  Simple Commercial Building Calculator</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/simple-building-calculator/project" className={isActive => "nav-link" + (!isActive? "unselected":"")}>Project</NavLink>
          <NavLink to="/simple-building-calculator/scenario" className={isActive => "nav-link" + (!isActive? "unselected":"")}>Scenario</NavLink>
          <NavLink to="/simple-building-calculator/visual" className={isActive => "nav-link" + (!isActive? "unselected":"")}>Visualization</NavLink>
        </Nav>
        {fileConditionRender()}
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;