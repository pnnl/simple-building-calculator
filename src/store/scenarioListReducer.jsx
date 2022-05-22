import { useCallback, useReducer } from "react";
import { useLocalStorage } from "react-use";

const LOCAL_STORAGE_KEY = "scenario-list-reducer-123"

const reducer = (state, action) => {
    let refreshedScenarioState = [...state.cases]

    switch (action.type){
        case "load":
            // this action is used to load the user data
            refreshedScenarioState = action.payload
            return {
                "cases": refreshedScenarioState["cases"]
            }
        case "duplicate":
            // Duplicate feature - 
            const scenarioID = action.payload
            const newID = action.newKey
            let index = refreshedScenarioState.findIndex(scenario => scenario.id === scenarioID)
            let newScenario = {...refreshedScenarioState[index], "id": newID}
            refreshedScenarioState.push(newScenario)
            return {
                "cases": refreshedScenarioState
            }

        case "add":
            const new_scenario = action.payload
            //TODO we need to check whether the new_scenario has ID that is same as the existing ID.
            refreshedScenarioState.push(new_scenario)
            return {
                "cases": refreshedScenarioState
            }
        case "modify":
            const modify_scenario = action.payload
            const id = action.key
            let modify_index = refreshedScenarioState.findIndex(scenario => scenario.id === id)
            refreshedScenarioState[modify_index] = {...refreshedScenarioState[modify_index], ...modify_scenario}
            return {
                "cases": refreshedScenarioState
            }
        case "del":
            const remove_id = action.payload
            const deleteScenarioCases = [...state.cases];
            let deleteIndex = deleteScenarioCases.findIndex(scenario => scenario.id === remove_id)
            deleteScenarioCases[deleteIndex] = {...deleteScenarioCases[deleteIndex], "status":"inactive"}
            return {
                "cases": deleteScenarioCases
            }
        case "reset":
            //clean up the state
            return initialListState
        default:
            return state
    }
}

export const useScenarioListReducer = () => {
    //grab saved value from 'localstoraeg' and a function to update it, if no value is retrieved, use initial state
    const [savedState, saveState] = useLocalStorage(
        LOCAL_STORAGE_KEY,
        initialListState,
    )

    //wrap `reducer` with a memoized function that syncs the `newState` to `localStorage` before
    //returning `newState`.
    const reducerLocalStorage = useCallback(
        (state, action)=>{
            const newState = reducer(state, action)
            saveState(newState)
            return newState
        },
        [saveState],
    )
    //use wrapped reducer and the saved value from `localStorage` as params to `useReducer`.
    return useReducer(reducerLocalStorage, savedState)
}

export const initialListState = {
    cases:[]
}

const initialListState_copy = {
    cases: [
        {
            "id": 1,
            "name": "Baseline-IECC 2021",
            "status": "done",
            "time": "12/12/2021",
            "eui": "44",
            "unit": "kBtu/ft2-year",
            "Electricity-General": 123456,
            "Electricity-Auxiliary": 123456,
            "Electricity-Cooling": 123456,
            "Electricity-Heating": 123456,
            "Natural Gas-Heating": 123456
        },
        {
            "id": 2,
            "name": "Scenario 1 - Net Zero",
            "status": "active",
            "time": "12/31/2021",
            "eui": "-1.2",
            "unit": "kBtu/ft2-year",
            "Electricity-General": 123456,
            "Electricity-Auxiliary": 123456,
            "Electricity-Cooling": 123456,
            "Electricity-Heating": 123456,
            "Natural Gas-Heating": 123456
        },
        {
            "id": 3,
            "name": "Test inactive",
            "status": "inactive",
            "time": "12/31/2021",
            "eui": "-1.2",
            "unit": "kBtu/ft2-year",
            "Electricity-General": 123456,
            "Electricity-Auxiliary": 123456,
            "Electricity-Cooling": 123456,
            "Electricity-Heating": 123456,
            "Natural Gas-Heating": 123456
        },
    ]
}