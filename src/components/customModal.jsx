import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select"

export function CustomModal(props){

    const {buttonVariant, buttonSize, buttonStyle, buttonText, modalTitle, createAction, closeText, confirmText, options} = props
    const [inputText, setInputText] = useState(buttonText)
    const [selectValue, setSelectValue] = useState(options[0])

    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCreate = () => {createAction(inputText, selectValue); handleClose()};

    const handleOptionChange = (e) => {
        setSelectValue(e)
    }

    return (
        <>
            <Button variant={buttonVariant} size={buttonSize} style={buttonStyle} onClick={handleShow}>{buttonText}</Button>
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Scenario name </h4>
                    <input className="form-control" value={inputText} onChange={(e)=>{setInputText(e.target.value)}}></input>
                    <h4 style={{"marginTop": "25px"}}>Select a baseline</h4>
                    <Select 
                        options={[...options]}
                        name={"Select A Baseline"}
                        value={selectValue}
                        onChange={handleOptionChange}></Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {closeText}
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        {confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}