import React, {useEffect, useState} from 'react'
import OptionParameter from './optionParameter';
import * as dataUtils from '../util/dataProcessor'
import {ScenarioContext, ProjectContext} from "../store/index";
import {getDefaultDataForStandard} from '../util/dataProcessor'
import {ListGroup} from "react-bootstrap"
import InputParameter from "./inputParameter"

//this class hold the list of data
export default function InputForm(props){

    const {id, onOutputChange, name} = props
    //TODO keep it for now, maybe can remove it later.
    const [state, dispatch] = React.useContext(ScenarioContext)
    const {bldgType, climateZone} = React.useContext(ProjectContext)
    const parameterMeta = dataUtils.getParameterMetaData()
    const defaultData = () => {
        if(state.hasOwnProperty(id)){
            return state[id]
        }else{
            //in this case, we are creating a new scenario
            let tempData = dataUtils.getDefaultDataForStandard(parameterMeta['standard']['default'], bldgType, climateZone)
            let keys = Object.keys(parameterMeta)
            for(var i=0; i<keys.length; i++){
                let key = keys[i]
                if(parameterMeta[key]['type'] === 'option'){
                    let optionType = parameterMeta[key]['optionsKey']
                    let optionArray = dataUtils.getData(optionType, bldgType, climateZone)
                    tempData[key] = optionArray.filter(option=>option['value'] === parameterMeta[key]['default'])[0]
                    if(tempData[key] === undefined){
                        //in this case, it is probably wrong default assigned for HVAC, change it to a new default
                        tempData[key] = optionArray[0]
                    }
                }
            }
            return tempData
        }
    }

    const defaultArray = defaultData()
    const [dataArray, setDataArray] = useState(defaultArray)

    const handleValueChange = (value, type, id) => {
        let newDataArray = {}
        if(type === "option"){
            let optionType = parameterMeta[id]['optionsKey']
            let optionArray = dataUtils.getData(optionType, bldgType, climateZone)
            //we pick the first one found in the options
            value = optionArray.filter(option=>option['value'] === value)[0]
        }

        if(id === "standard"){
            //in this case, we need to update the entire dta set.
            if(value['value'] === 'custom'){
                newDataArray = {
                    ...dataArray,
                    [id]: value
                }
            }else{
                let defaultData = getDefaultDataForStandard(value['value'], bldgType, climateZone)
                newDataArray = {
                    ...defaultData
                }
            }
        } else{
            newDataArray = {
                ...dataArray,
                [id]: value
            }
        }
        setDataArray(newDataArray)
    }

    useEffect(()=>{
        onOutputChange(dataArray, 'design', name)
    }, [dataArray])

    return (
        <>
        <ListGroup >
            {Object.keys(parameterMeta).sort(function(a,b){
                return parameterMeta[a].rank - parameterMeta[b].rank
            }).map((sortedKey) => {
                let meta = parameterMeta[sortedKey]
                let header = meta['header']
                let id = meta['id']
                let type = meta['type']
                let tooltips = meta['tool_tip']
                if(type === 'option'){
                    let optionUpdateMessage=meta["optionUpdateMessage"]
                    let optionType = meta['optionsKey']
                    let optionArray = dataUtils.getData(optionType, bldgType, climateZone)
                    if(optionArray.length > 0){
                        return (
                            <ListGroup.Item>                     
                                <OptionParameter header={header} id={id} type={type} value={dataArray[id]} options={optionArray} tooltips={tooltips} alertMessage={optionUpdateMessage} onValueChange={handleValueChange}></OptionParameter>
                            </ListGroup.Item>
                        );
                    }
                }else{
                    let unit = meta['unit']
                    let min = meta['min']
                    let max = meta['max']
                    //set each variable 100 steps
                    let step = (max-min) / 100
                    header = unit? header + " (" + unit + ")": header;
                    return (
                        <ListGroup.Item>
                            <InputParameter
                                header={header}
                                id={id}
                                type={type}
                                value={dataArray[id]}
                                min={min}
                                max={max}
                                step={step}
                                tooltips={tooltips}
                                onValueChange={handleValueChange}
                            
                            ></InputParameter>
                        </ListGroup.Item>
                    )
                }
            })}
        </ListGroup>
        </>
    );
}