import React, { useState, useContext, useEffect } from 'react'
import {ListGroup} from 'react-bootstrap'
import CustomBadge from './customBadge';
import CustomListDropDownButton from './customListDropDownButton'
import {ScenarioListContext, ScenarioContext} from "../store/index";
import {genID, strTruncate} from '../util/strUtil'

export default function CustomListGroupItem(props){
    const {valueStatus, displayStatus, handleMouseClick} = props
    const [scenarioListSate, scenarioListDispatch] = useContext(ScenarioListContext)
    const [scenario, scenarioDispatch] = useContext(ScenarioContext)
    const [showScenario, setShowScenario] = useState(valueStatus.status)

    const requestHandler = (e, id) => {
        if(e === 'del'){
            scenarioListDispatch({type:'del', payload: id})
        }else if(e==='dup'){
            const newKey = genID()
            scenarioDispatch({type: 'duplicate', key: id, newKey: newKey})
            scenarioListDispatch({type:'duplicate', payload: id, newKey: newKey})
        }
    }

    //update each individual scenario display / none status.
    //used for delete case
    useEffect(()=>{
        if(valueStatus.status !== showScenario){
            setShowScenario(valueStatus.status)
        }
      }, [valueStatus.status, showScenario])

    const handleClick = (e) => {
        handleMouseClick(valueStatus)
    }

    return (
        <>
            <ListGroup.Item as="li" action onClick={handleClick} style={{display: showScenario === 'inactive' && displayStatus === '1' ? 'none' : 'block'}}>
                <div className="d-flex justify-content-between align-items-start">
                    <CustomBadge status={valueStatus.status}></CustomBadge>
                    <div className="ms-2">
                        <p className="fw-bold" style={{overflow: 'hidden', textOverflow:'ellipsis', marginBottom: '0px'}} data-toggle="tooltip" data-placement="top" title={valueStatus.name}>{strTruncate(valueStatus.name, 22)}</p>
                        <p style={{marginBottom: '0px'}}><small>{valueStatus.time}</small></p>
                    </div>
                    <div>
                        <p style={{marginBottom: '0px'}}>{valueStatus.eui} ({valueStatus.unit})</p>
                    </div>
                    <div>
                        <CustomListDropDownButton dataKey={valueStatus.id} changeHandler={requestHandler}/>
                    </div>
                </div>
            </ListGroup.Item>
        </>
    );
}