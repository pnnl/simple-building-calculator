import React, { useEffect, useState } from 'react'
import Select from "react-select"

export default function OptionParameter(props){

    const {header, id, type, value, options, tooltips, alertMessage, onValueChange} = props
    const[selectedOption, setSelectedOption] = useState(value)

    //use effect hook to modify the selected option and rerender this component 
    //whenever the parent value is changed.
    useEffect(() => {
        if(value !== selectedOption) {
            setSelectedOption(value);
        }
    }, [value])

    const valueChangeHandler = (event) => {
        if(alertMessage){
            if(window.confirm(alertMessage)){
                onValueChange(event.value, type, id)
            }
        }
    }

    return(
        <div className="row g-3">
            <div className="col-sm-12">
                <h6 data-toggle="tooltip" data-placement="top" title={tooltips}>{header}</h6>
                <hr></hr>
                <Select options={[...options]} name={id} value={selectedOption} onChange={valueChangeHandler}></Select>
            </div>
        </div>
    );

}