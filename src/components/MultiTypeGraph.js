import React, {useState, useEffect} from 'react';
import {Bar, Scatter} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import {auth, removeConnectionPatientToTherapist} from "../firebase";
import {Plus} from "react-bootstrap-icons";

Chart.register(...registerables);

function MultiTypeGraph({appKey, data}) {
    console.log("data from liron: ", data)
    console.log("data from last played : ", typeof data['last_played'])
    console.log("AAAAA: ", data['options']['plugins']['tooltip'])
    console.log("label before: ", data['options']['plugins']['tooltip']['callbacks']['label'])
    console.log("label before type: ", typeof data['options']['plugins']['tooltip']['callbacks']['label'])
    console.log("tooltip_callback:", data['tooltip_callback'])

    data['options']['plugins']['tooltip']['callbacks']['label'] = Function("context", data['tooltip_callback'])
    // data['options']['plugins']['tooltip']['callbacks']['afterLabel'] = Function("context", data['tooltip_callback'])


    console.log("label after: ", data['options']['plugins']['tooltip']['callbacks']['label'])


    const rand = () => Math.round(Math.random() * 20 - 10)


    // const [data, setData] = useState({});

    // const x = {
    //     labels: [0,1,2,3,4,5,6,7,8,9,10],
    //     datasets: [
    //         {
    //             type: 'scatter',
    //             label: 'Dataset 1',
    //             borderColor: 'rgb(54, 162, 235)',
    //             borderWidth: 2,
    //             fill: false,
    //             data: data['points'],
    //         },
    //         {
    //             type: 'scatter',
    //             label: 'Dataset 1',
    //             borderColor: 'rgb(54, 162, 235)',
    //             borderWidth: 2,
    //             fill: false,
    //             data: data['points'],
    //         },
    //
    //     ],
    //
    // }

    // useEffect(() => {
    //     setData({
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [
    //             {
    //                 type: 'line',
    //                 label: 'Dataset 1',
    //                 borderColor: 'rgb(54, 162, 235)',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    //             },
    //             // {
    //             //     type: 'bar',
    //             //     label: 'Dataset 2',
    //             //     backgroundColor: 'rgb(255, 99, 132)',
    //             //     data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    //             //     borderColor: 'white',
    //             //     borderWidth: 2,
    //             // },
    //             // {
    //             //     type: 'bar',
    //             //     label: 'Dataset 3',
    //             //     backgroundColor: 'rgb(75, 192, 192)',
    //             //     data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    //             // },
    //         ],
    //     });
    // }, []);


    return (
        <div>
            <div className='header'>
                <h1 className='title'>דוח התקדמות ב {appKey}</h1>
            </div>
            <div>
                <Row><Form.Label className="p-2 m-1" style={{fontWeight: 'bold'}}>פרטים אישיים באפליקציה</Form.Label>
                </Row>
                <Row>
                    <Col md={1}></Col>
                    <Col className="p-2">
                        <Row>שם פרטי: {data['first_name']}</Row>
                        <Row>שם משפחה: {data['last_name']}</Row>
                        <Row>תאריך הרשמה: {data['date_registered']}</Row>
                    </Col>
                </Row>
            </div>
            <br/>
            <Scatter data={data['data']} options={data['options']} type={'scatter'}/>
        </div>
    )
}

export default MultiTypeGraph