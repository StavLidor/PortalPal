import React, {useState, useEffect} from 'react';
import {Bar, Scatter, Bubble,Line, Radar} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import {auth, removeConnectionPatientToTherapist} from "../../../firebase";
import {Plus} from "react-bootstrap-icons";

Chart.register(...registerables);

function MultiTypeGraph({appKey, data}) {

    let listOfTags = []

    for (let i = 0; i < data['amount_graphs']; i++) {
        if (data['tooltip_callback'][i] !== '') {
            data['options'][i]['plugins']['tooltip']['callbacks']['label'] = Function("context", data['tooltip_callback'][i])
        }

        switch (data['type'][i]){
            case 'scatter':
                listOfTags.push(<Scatter type={data['type'][i]} options={data['options'][i]} data={data['data'][i]}/>)
                break
            case 'bar':
                listOfTags.push(<Bar type={data['type'][i]} options={data['options'][i]}  data={data['data'][i]}/>)
                break
            case 'bubble':
                listOfTags.push(<Bubble type={data['type'][i]} options={data['options'][i]}  data={data['data'][i]}/>)
                break
            case 'line':
                listOfTags.push(<Line type={data['type'][i]} options={data['options'][i]}  data={data['data'][i]}/>)
                break
            case 'radar':
                listOfTags.push(<Radar type={data['type'][i]} options={data['options'][i]}  data={data['data'][i]}/>)
                break
        }
        listOfTags.push(<br/>)
        listOfTags.push(<br/>)
    }

    window.onload = function () {
    }
    return (
        <div>
            <Col className="justify-content-center">
            {/*<div id="graphs"></div>*/}
            <div className='header'>
                <h1 className='title text-center'>דוח התקדמות ב {appKey}</h1>
            </div>
            <div id="graphs">
                <Row><Form.Label className="p-2 m-1" style={{fontWeight: 'bold'}}>פרטים אישיים באפליקציה</Form.Label>
                </Row>
                <Row>
                    <Col md={1}/>
                    <Col className="p-2">
                        <Row>שם פרטי: {data['first_name']}</Row>
                        <Row>שם משפחה: {data['last_name']}</Row>
                        <Row>תאריך הרשמה: {data['date_registered']}</Row>
                    </Col>
                </Row>
            </div>
            <br/>

            {listOfTags.map((tag)=>{
                return tag
            })}
            </Col>
        </div>
    )
}

export default MultiTypeGraph