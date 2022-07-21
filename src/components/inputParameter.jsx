import React, {useState, useEffect} from 'react'
import {Row, Col, ToggleButton, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap'
import Slider from "./rangeSlider"
import * as dataUtils from '../util/dataProcessor';

export default function InputParameter(props){

    const{header, id, type, value, min, max, step, tooltips, onValueChange} = props
    const[inputText, setInputText] = useState(value)
    const[switchStatus, setSwitchStatus] = useState("true")

    const radios = [
        { name: 'Slider', value: "true"},
        { name: 'Input', value: "false"},
      ];

    //use effect hook to modify the selected option and rerender this component 
    //whenever the parent value is changed.
    useEffect(() => {
        if(value !== inputText) {
            setInputText(value);
        }
    },[value, inputText])

    const valueChangeHandler = (e) => {
        let val = e.target.value

        if(val.length === 0){
            val = "0"
        }

        if(val.endsWith(".") && val.split(".").length === 2){
            let output = parseFloat(val.replaceAll(",",""))
            let formated_output_str = dataUtils.format_num_to_string(output, 0)
            onValueChange(formated_output_str+".", type, id)
        }else if(/^[0-9.,]+$/.test(val)){
            let digits = val.indexOf('.') > -1 ? val.split(".")[1].length : 0
            let output = parseFloat(val.replaceAll(",",""))
            let formated_output_str = dataUtils.format_num_to_string(output, digits)
            onValueChange(formated_output_str, type, id)
        }
    }

    function conditionalRender(){

        if(switchStatus==="true"){
            return (
                <>
                    <p style={{marginTop:"12px"}}><strong style={{marginLeft:"5px"}}>{min}</strong><strong className={"pull-right"} style={{marginRight:"5px"}}>{max}</strong></p>
                    <Slider
                        value={value} 
                        onChange={onValueChange}
                        step={step}
                        max={max}
                        min={min}
                        type={type}
                        id={id}
                        orientation="horizontal"
                        reversed={true}
                        >
                    </Slider>
                </>
            )
        }else{
            return(
                <>
                    <InputGroup style={{marginTop:"20px", marginBottom: "10px"}}>
                        <InputGroup.Text><strong>{min}</strong></InputGroup.Text>
                            <FormControl id={id} value={inputText} onChange={valueChangeHandler}></FormControl>
                        <InputGroup.Text><strong>{max}</strong></InputGroup.Text>
                    </InputGroup>
                </>
            )
        }
    }

    return(
        <Row>
            <Col>
                <Row>
                    <Col xs={8}>
                        <h6 data-toggle="tooltip" data-placement="top" title={tooltips} style={{marginTop:"5px"}}>{header}</h6>
                    </Col>
                    <Col xs={4}>
                        <ButtonGroup className="pull-right">
                            {
                                radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={`${id}-key-${idx}`}
                                        id={`${id}-${idx}`}
                                        type="radio"
                                        size="sm"
                                        variant={idx%2 ? 'outline-success': 'outline-danger'}
                                        name= {id}
                                        value={radio.value}
                                        checked={switchStatus === radio.value}
                                        onChange={(e) => setSwitchStatus(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))
                            }
                        </ButtonGroup>
                    </Col>
                </Row>
                {
                    conditionalRender()
                }
            </Col>
        </Row>
    );
}