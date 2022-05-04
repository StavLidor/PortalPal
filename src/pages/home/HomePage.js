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
import TherapistsDetails from "../../therapistsDetails";
import TherapistsList from "../../TherapistsList";
import SessionsList from "../../meetingSummaries/listMeetingSummries/SessionsList";
import TherapistTabsBanner from "../../components/topbar/TherapistTabsBanner";
import Exercises from "../../components/exercises/Exercises";
import PatientExercises from "../../components/exercises/PatientExercises";
import AQ from "../../AQ";
// import "./HomePage.CSS"
import styles from "./HomePage.CSS"
import Chat from "../../Chat";
import AQ1 from "../../AQ1";

function HomePage({userDetails, type, institute}) {
    const [patientListData, setPatientListData] = useState([])
    const [therapistListData, setTherapistListData] = useState([])
    const [sideListComponent, setSideListComponent] = useState(<h3>משהו השתבש...</h3>)
    const [currentPerson, setCurrentPerson] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [currentTherapist, setCurrentTherapist] = useState({id: '', index: ''})


    async function onLogout() {
        await signOutCurrentUser()
    }

    useEffect(() => {
        // console.log("currentTherapist: ", currentTherapist)
        switch (type) {
            case "admin":
                // TODO: change the given list here
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

    return (<div><h3>{currentTherapist.id}</h3>
            <Container className="p-4" fluid>
                <Row className='gap-4 '>
                    <Col md='2' className="border border-secondary rounded">פורטלי</Col>
                    <Col md='3' className="w-auto border border-secondary rounded">
                        <ButtonGroup className="gap-4 p-2">
                            <Form.Text>שלום, {userDetails.firstName} {userDetails.lastName}<br/>{type}</Form.Text>
                            <Button className="rounded-3" variant="outline-primary">החשבון שלי</Button>
                            <Button href={'/'} className="rounded-3" variant="outline-primary" onClick={onLogout}>התנתק</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md='5' className="border border-secondary rounded">
                        {/*<Routes>*/}
                        {/*    <Route path={data.id.toString() + '/' + index.toString() + '/*'}*/}
                        {/*           element={<TabsBanner type={type}*/}
                        {/*                                         currentPerson={currentPerson}*/}
                        {/*                                         setCurrentPage={setCurrentPage}/>}/>*/}
                        {/*</Routes>*/}
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
                <Col md='2' className="border border-secondary rounded  ">
                    <Row className="p-2 border border-secondary rounded  mb-4 ">

                        {patientListData.map((item) => {
                                let data = item.data()
                                return (
                                    <Routes>
                                        {/*<Route path={/#/ + data.id.toString() + '/*'}*/}
                                        <Route path={data.id.toString() + '/*'}
                                               element={<PatientDetails details={data}/>}/>

                                    </Routes>)
                            }
                        )}

                    </Row>
                    <Row className="border border-secondary rounded" style={{minHeight: 300}}>
                        {/*{(type==='parent') &&*/}
                        {/*<Routes>*/}
                        {/*    <Route path={"sessions"}*/}
                        {/*           element={<h4>אנא בחר ילד מהרשימה</h4>}/>*/}
                        {/*</Routes>}*/}
                        {(type==='parent') &&
                            patientListData.map((item) => {
                                let data = item.data()
                                return (
                                    <Routes>
                                        {/*<Route path={'/#/' + data.id.toString() + '/sessions/*'}*/}
                                        <Route path={data.id.toString() + '/*'}
                                               element={<TherapistsList details={data} currentPage={currentPage}
                                                                        setCurrentTherapist={setCurrentTherapist}
                                                                        setTherapistListData={setTherapistListData}
                                                                        currentPerson={currentPerson}/>}/>
                                    </Routes>)
                            }
                        )}


                    </Row>
                </Col>
                <Col md='7' className="border border-secondary rounded">
                    {/*<Chats/>*/}
                    <Routes>
                        <Route path={currentPerson.toString() +'/documentation'} element={<FileSystem user={userDetails.id} patient={currentPerson}/>} />
                    </Routes>


                    {type === 'parent' && patientListData.map((item) => {
                        let data = item.data()
                        return (
                            therapistListData.map((therapist, index) => {
                                    console.log('PATH:', '/' + data.id.toString() + '/' + index.toString())
                                    return (
                                            <div>
                                                <Routes>
                                                <Route path={data.id.toString() + '/' + index.toString() + '/*'}
                                                       element={<TherapistTabsBanner type={type}
                                                                                     currentPerson={currentPerson}
                                                                                     setCurrentPage={setCurrentPage}/>}
                                                       // element={<TabsBanner type={type}
                                                       //                               currentPerson={currentPerson}
                                                       //                               setCurrentPage={setCurrentPage}/>}
                                                />
                                            </Routes>
                                                {/*<Routes>*/}
                                                {/*    <Route path={data.id.toString() + '/' + index.toString()  +'/communication'} element={<Chat*/}
                                                {/*        otherUser={therapist} patient={data.id}/>} />*/}
                                                {/*</Routes>*/}
                                                <Routes>
                                                    <Route path={data.id.toString() + '/' + index.toString() + '/*'}
                                                           element={<AQ1/>}
                                                        // element={<TabsBanner type={type}
                                                        //                               currentPerson={currentPerson}
                                                        //                               setCurrentPage={setCurrentPage}/>}
                                                    />
                                                </Routes>
                                            <Routes>
                                                <Route path={data.id.toString() + '/' + index.toString() + '/sessions'}
                                                    // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                       element={<SessionsList patientId={currentPerson}
                                                                              therapistId={currentTherapist.id}
                                                                              type={type}/>}/>

                                                <Route path={data.id.toString() + '/' + index.toString() + '/exercises'}
                                                    // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                       element={<PatientExercises  patient={currentPerson}
                                                                                   therapist={currentTherapist.id}
                                                                              type={type}/>}/>
                                            </Routes>
                                        </div>
                                    )
                                }
                            )
                        )
                    })}


                    {type === 'therapist' && patientListData.map((item) => {
                        let data = item.data()
                        return(
                                        <div >
                                            <Routes>
                                                <Route path={data.id.toString() + '/*'}
                                                       element={<TherapistTabsBanner type={type}
                                                                                     currentPerson={currentPerson}
                                                                                     setCurrentPage={setCurrentPage}/>}/>
                                            </Routes>
                                            <Routes>
                                                <Route path={data.id.toString() + '/sessions'}
                                                    // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                       element={<SessionsList patientId={currentPerson}
                                                                              therapistId={userDetails.id}
                                                                              type={type}/>}/>

                                                <Route path={data.id.toString() +  '/exercises'}
                                                    // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                       element={<PatientExercises  patient={currentPerson}
                                                                                   therapist={userDetails.id}
                                                                                   type={type}/>}/>
                                            </Routes>
                                        </div>
                                    )
                                }
                        )
                    }
                </Col>
            </Row>
            {/*<Row className="border border-secondary rounded m-3 w-auto"></Row>*/}

        </div>
    )
}

export default HomePage
