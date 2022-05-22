import React, { useState, createContext} from 'react';
import { useLocalStorage } from 'react-use';
import { useScenarioListReducer, initialListState } from './scenarioListReducer';
import { useScenarioReducer, initialScenarioState } from './scenarioReducer';
import { getDefaultRates } from '../util/dataProcessor';
//Uses React Hooks Context API to provide a global store for state
export const ProjectContext = createContext();
export const ProjectProvider = ({children}) => {
    //provide global state hooks
    const[project, setProject] = useLocalStorage("project_name", "Sample Project")
    const[bldgType, setBldgType] = useLocalStorage("bldg_type", "") 
    const[climateZone, setClimateZone] = useLocalStorage("climate_zone", "")
    const[hvac, setHVAC] = useLocalStorage("hvac", "")
    const[standard, setStandard] = useLocalStorage("standard", "")
    const[floorArea, setFloorArea] = useLocalStorage("floor_area", "")
    //indicates whether a user is in design phase
    const[currentWorkingScenario, setCurrentWorkingScenario] = useLocalStorage("current_scenario", "")
    const[currentBaseCase, setCurrentBaseCase] = useLocalStorage("scenario_basecase","")

    const mainContext = {
        project,
        setProject,
        bldgType,
        setBldgType,
        climateZone,
        setClimateZone,
        hvac, setHVAC,
        standard, setStandard,
        currentWorkingScenario,
        setCurrentWorkingScenario,
        floorArea,
        setFloorArea,
        currentBaseCase,
        setCurrentBaseCase,
    };

    return <ProjectContext.Provider value={mainContext}>{children}</ProjectContext.Provider>
}

export const AdvancedConfigContext = createContext();
export const AdvancedConfigProvider = ({children}) => {
    //project config parameters
    const[electricityRate, setElectricityRate] = useLocalStorage("electricity_rate", getDefaultRates("electricity_rate"))
    const[natGasRate, setNatGasRate] = useLocalStorage("natgas_rate", getDefaultRates("natgas_rate"))
    const[electricityCarbon, setElectricityCarbon] = useLocalStorage("eletrcity_carbon", getDefaultRates("eletrcity_carbon"))
    const[natGasCarbon, setNatGasCarbon] = useLocalStorage("natgas_carbon", getDefaultRates("natgas_carbon"))
    const[electricitySourceToSite, setElectricitySourceToSite] = useLocalStorage("electricity_source_site", getDefaultRates("electricity_source_site"))
    const[natGasSourceToSite, setNatGasSourceToSite] = useLocalStorage("natgas_source_site", getDefaultRates("natgas_source_site"))

    const mainContext = {
        electricityRate, setElectricityRate,
        natGasRate, setNatGasRate,
        electricityCarbon, setElectricityCarbon,
        natGasCarbon, setNatGasCarbon,
        electricitySourceToSite, setElectricitySourceToSite,
        natGasSourceToSite, setNatGasSourceToSite,
    }

    return <AdvancedConfigContext.Provider value={mainContext}>{children}</AdvancedConfigContext.Provider>
}

export const ScenarioListContext = createContext({
    state: initialListState,
    dispatch: () => null
});

export const ScenarioListProvider = ({ children }) => {
    const [state, dispatch] = useScenarioListReducer()
  
    return (
      <ScenarioListContext.Provider value={[ state, dispatch ]}>
          { children }
      </ScenarioListContext.Provider>
    )
  }

export const ScenarioContext = createContext({
    state: initialScenarioState,
    dispatch: () => null
});

export const ScenarioProvider = ({ children }) => {
    const [state, dispatch] = useScenarioReducer()
    return (
        <ScenarioContext.Provider value={[state, dispatch]}>
            {children}
        </ScenarioContext.Provider>
    )
}
