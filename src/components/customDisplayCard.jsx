import React from 'react'
import {Badge} from 'react-bootstrap'
import { convert_num_to_percent, format_num_to_string } from '../util/dataProcessor'


export default function CustomDisplayCard(props){
    const {cardTitle, displayData, displaySmall, badgeInfo, badgeColor, compareMetrics} = props

    const renderCompareIcon = () => {
        if(compareMetrics === undefined || compareMetrics === ""){
            return (<></>)
        }else{
            if(compareMetrics > 0){
                return (<div className="pull-right font-bold text-success">{convert_num_to_percent(compareMetrics)}<i className="fa fa-bolt"></i></div>)
            }else{
                return (<div className="pull-right font-bold text-warning">{convert_num_to_percent(compareMetrics)}<i className="fa fa-bolt"></i></div>)
            }
        }
    }

    return(
        <>
            <div className={"icard"}>
                <div className={"icard-title"}>
                    <Badge bg={badgeColor} className="pull-right">{badgeInfo}</Badge>
                    <h5>{cardTitle}</h5>
                </div>
                <div className={"icard-content"}>
                    <h1 className={"no-margins"}>{format_num_to_string(displayData)}</h1>
                    {renderCompareIcon()}
                    <small>{displaySmall}</small>
                </div>
            </div>
        </>
    )
}