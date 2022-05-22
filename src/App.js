import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import Project from "./views/projectPage";
import Design from "./views/designPage";
import Scenario from "./views/scenarioPage";
import Visualizer from "./views/visualizationPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  //GLOBAL VARIABLES

  //RENDERS
  return (
    <BrowserRouter>
      <div className="App container py-6" style={{ textAlign: "left" }}>
        <NavBar />
        <Routes>
          <Route
            path="/simple-building-calculator/project"
            element={<Project />}
          ></Route>
          <Route
            path="/simple-building-calculator/design/:scenarioId"
            element={<Design />}
          ></Route>
          <Route
            path="/simple-building-calculator/scenario"
            element={<Scenario />}
          ></Route>
          <Route
            path="/simple-building-calculator/visual"
            element={<Visualizer />}
          ></Route>
          <Route
            path="/simple-building-calculator/"
            element={
              <Navigate replace to="/simple-building-calculator/project" />
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
