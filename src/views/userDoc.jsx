import { Row, Col, Nav, Tab, ListGroup } from "react-bootstrap";
import DocumentationPage from "../userdoc/documentation";
import OverviewPage from "../userdoc/overview"

function Manual(){
    return(
        <>
        <div className="icard">
            <div className="icard-title"><h3>PNNL Simple Building Calculator Tool</h3> <p style={{color: "#767171"}}>Official documentation website</p></div>
            <div className="icard-content">
                <Tab.Container id="user_doc" defaultActiveKey="#overview">
                    <Row>
                        <Col sm={2}>
                            <ListGroup>
                                <ListGroup.Item action href="#overview">
                                    Overview
                                </ListGroup.Item>
                                <ListGroup.Item action href="#documentation">
                                    Documentation
                                </ListGroup.Item>
                                {/*<ListGroup.Item action href="#limitations">
                                    Limitations</ListGroup.Item>*/}
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#overview">
                                    <OverviewPage/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#documentation">
                                    <DocumentationPage/>
                                </Tab.Pane>
                                {/*<Tab.Pane eventKey="#limitations">
                                    <p>Placeholder</p>
                                </Tab.Pane>*/}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
        </>
    )
} 

export default Manual