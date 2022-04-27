import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import firebaseApp, {signOutCurrentUser} from '../../firebase'
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../patient/Patient";
import PatientList from "../../components/sidebar/PatientList";
import PatientDetails from "../../components/sidebar/PatientDetails";
import TopBanner from "../../components/topbar/TopBanner";

function HomePage({userDetails, type, institute}) {
    const [patientListData, setPatientListData] = useState([])
    const [sideListComponent, setSideListComponent] = useState(<h3>משהו השתבש...</h3>)


    async function onLogout() {
        await signOutCurrentUser()
    }
// 0544617812 Pleasent

    switch (type) {
        case "admin":
            setSideListComponent( <PatientList list={userDetails.students_arr} setPatientListData={setPatientListData} listTitle={"רשימת מטופלים"}/>)
            break
        case "parent":
            setSideListComponent( <PatientList list={userDetails.childrenIds} setPatientListData={setPatientListData} listTitle={"רשימת ילדים"}/>)
            break
        case "therapist":

            break
        default:
            <h3>משהו השתבש...</h3>
    }


    // function onPatiantListItemClick(e) {
    //     const previous = this.closest(".list-group").children(".active");
    //     previous.removeClass('active'); // previous list-item
    //     e.target.addClass('active'); // activated list-item
    // }

    console.log(patientListData)
    return (<div>
            <Container className="p-4" fluid>
                <Row className='gap-4 '>
                    <Col md='2' className="border border-secondary rounded">פורטלי</Col>
                    <Col md='3' className="w-auto border border-secondary rounded">
                        <ButtonGroup className="gap-4 p-2">
                            <Form.Text>שלום, {userDetails.firstName} {userDetails.lastName}<br/>{type}</Form.Text>
                            <Button className="rounded-3" variant="outline-primary">החשבון שלי</Button>
                            <Button className="rounded-3" variant="outline-primary" onClick={onLogout}>התנתק</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md='5' className="border border-secondary rounded">
                        <TopBanner/>
                    </Col>
                </Row>
            </Container>
            {/*<Container className='vh-100'>*/}
            <Row className='p-4 gap-4 vh-100'>
                <Col md='2' className="p-3 border border-secondary rounded">
                    {/*<PatientList list={userDetails.students_arr} setPatientListData={setPatientListData} listTitle={"רשימת מטופלים"}/>*/}
                    {sideListComponent}

                </Col>
                <Col md='3' className="w-25 border border-secondary rounded ">
                    <Row className="p-2 border border-secondary rounded h-25 m-3">
                        <Routes>
                            {patientListData.map((item) => {
                                    let data = item.data()
                                console.log(data)
                                    return (
                                        <Route path={data.id.toString() + '/*'}
                                               // element={<h2>{data.firstName + " " + data.lastName}</h2>}/>)
                                element={<PatientDetails details={data}/>}/>)
                                }
                            )}
                        </Routes>
                    </Row>
                    <Row className="border border-secondary rounded h-50 m-3"></Row>
                </Col>
                <Col md='5' className="border border-secondary rounded">CCCCC</Col>
            </Row>
            <Row className="border border-secondary rounded m-3 w-auto"></Row>

        </div>
    )
}

export default HomePage
