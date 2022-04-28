import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import firebaseApp, {signOutCurrentUser} from '../../firebase'
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../patient/Patient";
import PatientList from "../../components/sidebar/PatientList";
import PatientDetails from "../../components/sidebar/PatientDetails";
import TabsBanner from "../../components/topbar/TabsBanner";
import FileSystem from "../../components/fileSystem/FileSystem";

function HomePage({userDetails, type, institute}) {
    const [patientListData, setPatientListData] = useState([])
    const [sideListComponent, setSideListComponent] = useState(<h3>משהו השתבש...</h3>)
    const [currentPerson, setCurrentPerson] = useState('')
    const [currentPage, setCurrentPage] = useState('')


    async function onLogout() {
        await signOutCurrentUser()
    }

    useEffect(() => {
        switch (type) {
            case "admin":
                setSideListComponent(<PatientList list={userDetails.students_arr}
                                                  setPatientListData={setPatientListData} listTitle={"רשימת תלמידים"}
                                                  setCurrentPerson={setCurrentPerson}
                                                  currentPage={currentPage}/>)
                break
            case "parent":
                setSideListComponent(<PatientList list={userDetails.childrenIds} setPatientListData={setPatientListData}
                                                  listTitle={"רשימת ילדים"}
                                                  setCurrentPerson={setCurrentPerson}
                                                  currentPage={currentPage}/>)
                break
            case "therapist":
                setSideListComponent(<PatientList list={userDetails.institutes[institute]}
                                                  setPatientListData={setPatientListData} listTitle={"רשימת מטופלים"}
                                                  setCurrentPerson={setCurrentPerson}
                                                  currentPage={currentPage}/>)
                break
            default:
                <h3>משהו השתבש...</h3>
        }
    }, [currentPage])

    return (<div>
            <h2>TEST</h2>
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
                        <TabsBanner type={type} currentPerson={currentPerson} setCurrentPage={setCurrentPage}/>
                        {/*{tabsComponent}*/}
                    </Col>
                </Row>
            </Container>
            {/*<Container className='vh-100'>*/}
            <Row className='p-4 gap-4 vh-100'>
                <Col md='2' className="p-3 border border-secondary rounded">
                    {sideListComponent}
                </Col>
                <Col md='3' className="w-25 border border-secondary rounded ">
                    <Row className="p-2 border border-secondary rounded h-25 m-3">
                        <Routes>
                            {patientListData.map((item) => {
                                    let data = item.data()
                                    return (
                                        <Route path={data.id.toString() + '/*'}
                                               element={<PatientDetails details={data}/>}/>)
                                }
                            )}
                        </Routes>
                    </Row>
                    <Row className="border border-secondary rounded h-50 m-3">
                        <Routes>
                            <Route path={"sessions"}
                                   element={<h4>אנא בחר ילד מהרשימה</h4>}/>

                            {patientListData.map((item) => {
                                    let data = item.data()
                                    return (
                                        <Route path={data.id.toString() + '/sessions/*'}
                                               element={<PatientDetails details={data}/>}/>)
                                }
                            )}
                        </Routes>
                    </Row>
                </Col>
                <Col md='5' className="border border-secondary rounded">

                    <Routes>
                        {patientListData.map((item) => {
                                let data = item.data()
                                return (
                                    <Route path={data.id.toString() + '/*'}
                                           element={<FileSystem/>}/>)
                            }
                        )}
                    </Routes>


                </Col>
            </Row>
            <Row className="border border-secondary rounded m-3 w-auto"></Row>

        </div>
    )
}

export default HomePage
