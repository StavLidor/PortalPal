import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {Plus, Dash} from "react-bootstrap-icons";
import {auth, removeConnectionPatientToTherapist} from "../../firebase";
import TableData from "../tableEdit/TableData";

function PatientDetails({details, type, institute}) {
    const [showRemovePatientDialog, setShowRemovePatientDialog] = useState(false)
    return (<div>
            <ButtonGroup>
                <Form.Label style={{fontWeight: 'bold'}}>פרטי מטופל</Form.Label>

                {type === "therapist" && institute === "external" &&
                <Button className="m-2 p-1 text-center rounded-3" id="deletePatientButton" onClick={() => {
                    setShowRemovePatientDialog(true)
                    // await removeConnectionPatientToTherapist(auth.currentUser.uid, details.id, institute)
                }
                } style={{fontSize: 10, width: 80, height: 32}} variant="outline-primary"><Dash/> הסר מטופל</Button>}
            </ButtonGroup>
            {showRemovePatientDialog && <Modal show={showRemovePatientDialog} onHide={() => {
                setShowRemovePatientDialog(false)
            }}>
                <Modal.Header>
                    <Modal.Title>האם אתה בטוח שברצונך להסיר מטופל זה?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={async () => {
                        setShowRemovePatientDialog(false)
                        await removeConnectionPatientToTherapist(auth.currentUser.uid, details.id, institute)
                    }}>
                        כן
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        setShowRemovePatientDialog(false)
                    }}>
                        לא, אל תמחק
                    </Button>
                </Modal.Footer>
            </Modal>}
            <Col>
                <Row>
                    <Form.Label>
                        שם:
                        &nbsp;
                        {details.firstName + ' ' + details.lastName}
                    </Form.Label>
                </Row>

                <Row>
                    <Form.Label>
                        תאריך לידה:
                        &nbsp;
                        {new Date(details.dateOfBirth.seconds * 1000).toLocaleDateString()}
                        {/*{details.dateOfBirth.toDate().toDateString()}*/}
                    </Form.Label>
                </Row>

                <Row>
                    <Form.Label>
                        מגדר:
                        &nbsp;
                        {details.gender}
                    </Form.Label>
                </Row>
                {/*<Row>*/}
                {/*    <Form.Text>*/}
                {/*        טלפון:*/}
                {/*        &nbsp;*/}
                {/*        {details.phone}*/}
                {/*    </Form.Text>*/}
                {/*</Row>*/}
                <Row>
                    <Form.Label>
                        כתובת:
                        &nbsp;
                        {details.street + ' ' + details.buildingNumber + ', ' + details.city}
                    </Form.Label>
                </Row>
            </Col>
        </div>

    )
}

export default PatientDetails