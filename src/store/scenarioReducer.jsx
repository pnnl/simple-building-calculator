import { useLocalStorage } from 'react-use'
import { useCallback, useReducer } from 'react'

const LOCAL_STORAGE_KEY = "scenario-reducer-123"

const reducer = (state, action) => {
    const scenarioID = action.key
    switch (action.type){
        case "load":
            let loadData = action.payload
            return loadData
        case "duplicate":
            const newID = action.newKey
            const newValue = {...state[scenarioID]}
            return {
                ...state,
                [newID]: newValue
            }
        case "modify":
            const designValue = action.payload;
            return {
                ...state,
                [scenarioID]:{
                    ...state[scenarioID],
                    ...designValue
                }
            }
        //no action - set to default
        case "add":
            //add a new design scenario
            const payload = action.payload
            return {
                ...state,
                [scenarioID]:payload
            }
        case "reset":
            return initialScenarioState
            
        default:
            return state
    }
}

export const useScenarioReducer = () => {
    const [savedState, saveState] = useLocalStorage(
        LOCAL_STORAGE_KEY,
        initialScenarioState,
    )

    //wrap reducer with a memoized function that syncs the newStaet to localStorage before
    //returning newState.
    const reducerLocalStorage = useCallback(
        (state, action) => {
            const newState = reducer(state, action)
            saveState(newState)
            return newState
        },
        [saveState],
    )

    return useReducer(reducerLocalStorage, savedState)
}

export const initialScenarioState = {
}