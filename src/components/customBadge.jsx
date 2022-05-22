import React from 'react'
import {Badge} from 'react-bootstrap'

export default function CustomBadge(props){
    if(props.status === "inactive"){
        return (
            <Badge bg="success">Done</Badge>
        );
    }else if(props.status === "active"){
        return (
            <Badge bg="primary">Active</Badge>
        );
    }
    return (
        <Badge bg="warning">Error</Badge>
    )
}