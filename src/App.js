import "./App.css";
import React from "react";
import NavBar from "./components/navbar";
import Project from "./views/projectPage";
import Design from "./views/designPage";
import Scenario from "./views/scenarioPage";
import Visualizer from "./views/visualizationPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Manual from "./views/userDoc";

function App() {
  //GLOBAL VARIABLES

  //RENDERS
  return (
    <BrowserRouter basename="/simple-building-calculator">
      <NavBar />
      <div className="App container py-6" style={{ textAlign: "left" }}>
        <Routes>
          <Route path="/project" element={<Project />}></Route>
          <Route path="/design/:scenarioId" element={<Design />}></Route>
          <Route path="/scenario" element={<Scenario />}></Route>
          <Route path="/visual" element={<Visualizer />}></Route>
          <Route path="/manual" element={<Manual />}></Route>
          <Route path="/" element={<Navigate replace to="/project" />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
