import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {Link} from "react-router-dom"

export default function CustomListDropDownButton(props){
    const {dataKey, changeHandler} = props

    return (
        <DropdownButton title="Options" variant="outline-primary">
            <Dropdown.Item as={Link} to={`/simple-building-calculator/design/${dataKey}`}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={()=>changeHandler('dup', dataKey)}>Duplicate</Dropdown.Item>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Item onClick={() => changeHandler("del", dataKey)}>Archive</Dropdown.Item>
        </DropdownButton>
    )
}