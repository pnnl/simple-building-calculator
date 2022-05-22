import React, {useState, useEffect} from 'react'
import {Row, Col, ToggleButton, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap'
import Slider from "./rangeSlider"

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
    },[value])

    const valueChangeHandler = (e) => {
        let val = e.target.value
        if(val.startsWith("0") && !val.endsWith(".") && val.length===2){
            val = "0." + val.slice(1)
        }
        
        if(val.length === 0){
            val = "0"
        }

        if(/^\d*\.?\d*$/.test(val)){
            let output = parseFloat(val)
            onValueChange(output, type, id)
        }
    }

    function conditionalRender(){

        if(switchStatus==="true"){
            return (
                <>
                    <p><strong style={{marginLeft:"5px"}}>{min}</strong><strong className={"pull-right"} style={{marginRight:"5px"}}>{max}</strong></p>
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
                    <InputGroup>
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
            <hr></hr>
                {
                    conditionalRender()
                }
            </Col>
        </Row>
    );
}