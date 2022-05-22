import React from "react";
import ReactDOM from "react-dom";
import {
  AdvancedConfigContext,
  AdvancedConfigProvider,
  ProjectProvider,
  ScenarioListProvider,
  ScenarioProvider,
} from "./store/index";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <ProjectProvider>
    <AdvancedConfigProvider>
      <ScenarioListProvider>
        <ScenarioProvider>
          <App />
        </ScenarioProvider>
      </ScenarioListProvider>
    </AdvancedConfigProvider>
  </ProjectProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
