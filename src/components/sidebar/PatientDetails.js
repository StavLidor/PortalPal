import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {Plus} from "react-bootstrap-icons";
import {auth, removeConnectionPatientToTherapist} from "../../firebase";

function PatientDetails({details, type, institute}) {
    console.log("in patient!!!!!!!!")
    return (<div>
            <Row><Col><Form.Label style={{fontWeight: 'bold'}}>פרטי מטופל</Form.Label></Col>
                <Col>{type === "therapist" && institute === "external" &&
                <Button className="m-2 p-1 text-center" onClick={async () => {
                    await removeConnectionPatientToTherapist(auth.currentUser.uid, details.id, institute)
                }
                }
                        style={{fontSize: 10, height: 30}} variant="outline-primary"><Plus/>הסר
                    מטופל</Button>}</Col>

            </Row>
            <Col>
                <Row>
                    <Form.Text>
                        שם:
                        &nbsp;
                        {details.firstName + ' ' + details.lastName}
                    </Form.Text>
                </Row>

                <Row>
                    <Form.Text>
                        תאריך לידה:
                        &nbsp;
                        {new Date(details.dateOfBirth.seconds * 1000).toLocaleDateString()}
                        {/*{details.dateOfBirth.toDate().toDateString()}*/}
                    </Form.Text>
                </Row>

                <Row>
                    <Form.Text>
                        מגדר:
                        &nbsp;
                        {details.gender}
                    </Form.Text>
                </Row>
                {/*<Row>*/}
                {/*    <Form.Text>*/}
                {/*        טלפון:*/}
                {/*        &nbsp;*/}
                {/*        {details.phone}*/}
                {/*    </Form.Text>*/}
                {/*</Row>*/}
                <Row>
                    <Form.Text>
                        כתובת:
                        &nbsp;
                        {details.street + ' ' + details.buildingNumber + ', ' + details.city}
                    </Form.Text>
                </Row>
            </Col>
        </div>

    )
}

export default PatientDetails