import NavBar from "./components/navbar";

import Project from "./views/homePage.jsx";
import Design from "./views/designPage.jsx";
import Scenario from "./views/scenarioPage";
import Visualizer from "./views/visualizationPage";

const routes = [
  {
    path: "/simple-building-calculator/project",
    name: "Project",
    icon: "fa fa-superpowers",
    component: Project,
    layout: "/main",
  },
  {
    path: "/simple-building-calculator/design",
    name: "Design",
    icon: "fa fa-linode",
    component: Design,
    layout: "/main",
  },
  {
    path: "/simple-building-calculator/scenario",
    name: "ScenarioList",
    icon: "fa fa-list-alt",
    component: Scenario,
    layout: "/main",
  },
  {
    path: "/simple-building-calculator/visualization",
    name: "Visualization",
    icon: "fa fa-area-chart",
    component: Visualizer,
    layout: "/main",
  },
];

export default routes;
