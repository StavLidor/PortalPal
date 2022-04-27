import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";

function PatientDetails({details}){
    return(<div>
        <Form.Label style={{fontWeight:'bold'}} >פרטי מטופל</Form.Label>
        <Col>
            <Row>
                <Form.Text>
                    שם:
                    &nbsp;
                    {details.firstName +' '+details.lastName}
                </Form.Text>
            </Row>

            <Row>
                <Form.Text>
                    תאריך לידה:
                    &nbsp;
                    {new Date(details.dateOfBirth.seconds*1000).toLocaleDateString()}
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
                    {details.street +' '+details.buildingNumber+', '+details.city}
                </Form.Text>
            </Row>
        </Col>
        </div>

    )
}
export default PatientDetails