import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup, Image} from 'react-bootstrap'
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
// import AQold from "../../AQold";
// import "./HomePage.CSS"
import styles from "./HomePage.CSS"
import Chat from "../../Chat";
import AQ from "../../AQ";
import ParentList from "../../ParentList";
import Secretary from "../secretary/Secretary";
import SecretaryPage from "../../SecretaryPage";
import MyProfile from "../../MyProfile";
import GetPersonalCode from "../../components/code/GetPersonalCode";
import Logo from "../../Portapel.png";

function HomePage({userDetails, type, institute}) {
    const [patientListData, setPatientListData] = useState([])
    const [therapistListData, setTherapistListData] = useState([])
    const [parentsListData, setParentsListData] = useState([])
    const [showDialogCode, setShowDialogCode] = useState(false)
    const [sideListComponent, setSideListComponent] = useState(<h3>משהו השתבש...</h3>)
    const [currentPerson, setCurrentPerson] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [currentTherapist, setCurrentTherapist] = useState({id: '', index: ''})
    const [currentParent, setCurrentParent] = useState({id: '', index: ''})


    async function onLogout() {
        await signOutCurrentUser()
    }


    // useEffect(() => {
    //     // console.log("currentTherapist: ", currentTherapist)
    //     switch (type) {
    //         case "admin":
    //             // // TODO: change the given list here
    //             // setSideListComponent(<PatientList list={userDetails.students_arr}
    //             //                                   setPatientListData={setPatientListData} listTitle={"רשימת תלמידים"}
    //             //                                   setCurrentPerson={setCurrentPerson}
    //             //                                   currentPage={currentPage}/>)
    //             break
    //         case "parent":
    //             setSideListComponent(<PatientList list={userDetails.childrenIds} setPatientListData={setPatientListData}
    //                                               listTitle={"רשימת ילדים"}
    //                                               setCurrentPerson={setCurrentPerson}
    //                                               currentPage={currentPage}
    //                                               institute={institute}/>)
    //             break
    //         case "therapist":
    //             setSideListComponent(<PatientList list={userDetails.institutes[institute]}
    //                                               setPatientListData={setPatientListData} listTitle={"רשימת מטופלים"}
    //                                               setCurrentPerson={setCurrentPerson}
    //                                               currentPage={currentPage}
    //                                               institute={institute}/>)
    //             break
    //         default:
    //             <h3>משהו השתבש...</h3>
    //     }
    // }, [currentPage])

    const handleMyProfile = () => {

    }

    return (

        <div><h3>{currentTherapist.id}</h3>
            <Container className="p-4" fluid>
                <Row className='gap-4 '>
                    <Col md='2' className="border border-secondary rounded">פורטלי</Col>
                    <Col md='3' className="w-auto border border-secondary rounded">
                        <ButtonGroup className="gap-4 p-2">
                            <Form.Text>שלום, {userDetails.firstName} {userDetails.lastName}<br/>{type}</Form.Text>
                            <Link to="/myProfile">
                                {type !== 'admin' &&
                                <Button style={{height: 40}} className="rounded-3 h-auto" variant="outline-primary"
                                        onClick={handleMyProfile}>החשבון
                                    שלי</Button>
                                }
                            </Link>
                            <Button style={{height: 40}} href={'/'} className="rounded-3 " variant="outline-primary"
                                    onClick={onLogout}>התנתק</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md='5' className="border align-self-center">
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
            {(type === 'admin') ? (
                    <SecretaryPage data={userDetails}/>) :
                <div>
                    <Row className='p-4 gap-4 vh-100'>
                        <Col md='2' className="p-3 border border-secondary rounded">
                            {type==='parent' && <PatientList list={userDetails.childrenIds} setPatientListData={setPatientListData}
                                                             listTitle={"רשימת ילדים"}
                                                             setCurrentPerson={setCurrentPerson}
                                                             currentPage={currentPage}
                                                             institute={institute}/>}

                            {type==='therapist' && <PatientList list={userDetails.institutes[institute]}
                                                                setPatientListData={setPatientListData} listTitle={"רשימת מטופלים"}
                                                                setCurrentPerson={setCurrentPerson}
                                                                currentPage={currentPage}
                                                                institute={institute}/>}

                            {/*{sideListComponent}*/}
                        </Col>
                        <Col md='2' className="border border-secondary rounded  ">
                            <Row className="p-2 border border-secondary rounded  mb-4 ">

                                {patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                {/*<Route path={/#/ + data.id.toString() + '/*'}*/}
                                                <Route path={data.id.toString() + '/*'}
                                                       element={<PatientDetails type={type} institute={institute} details={data}/>}/>

                                            </Routes>)
                                    }
                                )}

                            </Row>
                            <Row className="border border-secondary rounded" style={{minHeight: 300}}>

                                {(type === 'parent') &&
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
                                {(type === 'therapist') &&
                                patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <>
                                                <Routes>
                                                    {/*<Route path={'/#/' + data.id.toString() + '/sessions/*'}*/}
                                                    <Route path={data.id.toString() + '/*'}
                                                           element={<TherapistsList details={data} currentPage={currentPage}
                                                                                    setCurrentTherapist={setCurrentTherapist}
                                                                                    setTherapistListData={setTherapistListData}
                                                                                    currentPerson={currentPerson}/>

                                                           }/>
                                                </Routes>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/*'}
                                                           element={<ParentList currentPage={currentPage} details={data}
                                                                                currentPerson={currentPerson}
                                                                                setParentsListData={setParentsListData}
                                                                                setCurrentParent={setCurrentParent}/>}/>
                                                </Routes>
                                            </>)
                                    }
                                )}


                            </Row>

                            <Row className="border border-secondary rounded" style={{minHeight: 300}}>
                                {type === 'parent' && currentPerson !== '' && <Link to={currentPerson + '/code'}>
                                    <Button onClick={() => setShowDialogCode(true)} className="text-center"
                                            style={{width: 150, fontWeight: "bold", height: 50, fontSize: 10}}
                                            variant="outline-primary">קבל קוד אישי</Button>
                                </Link>}
                                {/*{type === 'therapist' && institute==='external' && currentPerson !== '' && <Link to={currentPerson + '/code'}>*/}
                                {/*    <Button onClick={() => setShowDialogCode(true)} className="text-center"*/}
                                {/*            style={{width: 150, fontWeight: "bold", height: 50, fontSize: 10}}*/}
                                {/*            variant="outline-primary">הסר מטופל</Button>*/}
                                {/*</Link>}*/}

                                {(type === 'therapist') &&
                                patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                {/*<Route path={'/#/' + data.id.toString() + '/sessions/*'}*/}
                                                <Route path={data.id.toString() + '/*'}
                                                       element={
                                                           <Col>
                                                               <Row>
                                                                   <Link to='sessions' onClick={() => {
                                                                       setCurrentPage('sessions')
                                                                   }} className="list-group-item list-group-item-action">סיכומי
                                                                       טיפולים</Link>
                                                               </Row>
                                                               <Row>
                                                                   <Link to='exercises' onClick={() => {
                                                                       setCurrentPage('exercises')
                                                                   }}
                                                                         className="list-group-item list-group-item-action">תרגילים</Link>
                                                               </Row>
                                                           </Col>
                                                       }/>
                                            </Routes>
                                        )
                                    }
                                )}


                            </Row>
                        </Col>
                        <Col md='7' className="border border-secondary rounded">
                            {/*<Chats/>*/}
                            <Routes>
                                <Route path={currentPerson.toString() + '/documentation'}
                                       element={<FileSystem user={userDetails.id} patient={currentPerson}/>}/>
                            </Routes>
                            <Routes>
                                <Route path={currentPerson.toString() + '/AQform'}
                                       element={(() => {
                                           if (currentPerson !== '') {
                                               return <AQ/>
                                           }
                                           return <h2>אנא בחר מטופל כדי למלא עבורו את הטופס</h2>

                                       })()

                                       }/>
                            </Routes>
                            <Routes>
                                <Route path={'/myProfile'}
                                       element={(() => {
                                           return <MyProfile userDetails={userDetails}/>
                                       })()
                                       }/>
                            </Routes>
                            <Routes>
                                <Route path={currentPerson.toString() + '/code'}
                                       element={<GetPersonalCode type={type} id={currentPerson}/>}/>
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
                                                                   element={<TherapistTabsBanner therapistInstitute={therapist.institute}
                                                                                                 therapistId={therapist.id}
                                                                                                 type={type}
                                                                                                 currentPerson={currentPerson}
                                                                                                 setCurrentPage={setCurrentPage}/>}
                                                            />
                                                        </Routes>
                                                        <Routes>
                                                            <Route
                                                                path={data.id.toString() + '/' + index.toString() + '/communication'}
                                                                element={<Chat
                                                                    otherUser={therapist} patient={data.id}/>}/>
                                                        </Routes>
                                                        <Routes>
                                                            <Route
                                                                path={data.id.toString() + '/' + index.toString() + '/sessions'}
                                                                // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                                element={<SessionsList patientId={currentPerson}
                                                                                       therapistId={currentTherapist.id}
                                                                                       type={type}/>}/>

                                                            <Route
                                                                path={data.id.toString() + '/' + index.toString() + '/exercises'}
                                                                // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                                element={<PatientExercises patient={currentPerson}
                                                                                           therapist={currentTherapist.id}
                                                                                           type={type}/>}/>
                                                        </Routes>
                                                    </div>
                                                )
                                            }
                                        )
                                    )
                                }
                            )}


                            {type === 'therapist' && patientListData.map((item) => {
                                    let data = item.data()
                                    return (
                                        parentsListData.map((parent, index) => {
                                                console.log('PATH:', '/' + data.id.toString() + '/' + index.toString())
                                                return (
                                                    <div>


                                                        <Routes>
                                                            <Route
                                                                path={data.id.toString() + '/parent/' + index.toString() + '/*'}
                                                                element={<Chat otherUser={parent} patient={data.id}/>}
                                                            />
                                                        </Routes>
                                                    </div>
                                                )
                                            }
                                        )
                                    )
                                }
                            )}

                            {type === 'therapist' && patientListData.map((item) => {
                                    let data = item.data()
                                    return (
                                        therapistListData.map((therapist, index) => {
                                                console.log('PATH:', '/' + data.id.toString() + '/' + index.toString())
                                                return (
                                                    <div>
                                                        <Routes>
                                                            <Route path={data.id.toString() + '/' + index.toString() + '/*'}
                                                                   element={<Chat otherUser={therapist} patient={data.id}/>}
                                                            />
                                                        </Routes>
                                                    </div>
                                                )
                                            }
                                        )
                                    )
                                }
                            )}


                            {type === 'therapist' && patientListData.map((item) => {
                                    let data = item.data()
                                    return (
                                        // <Routes>
                                        //     <Route path={data.id.toString() + '/*'}
                                        //            element={currentPage !== 'documentation' && currentPage !== 'AQform' &&
                                        //            <TherapistTabsBanner type={type}
                                        //                                 currentPerson={currentPerson}
                                        //                                 setCurrentPage={setCurrentPage}/>}/>
                                        // </Routes>
                                        <Routes>
                                            <Route path={data.id.toString() + '/sessions'}
                                                // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                   element={<SessionsList patientId={currentPerson}
                                                                          therapistId={userDetails.id}
                                                                          type={type}/>}/>

                                            <Route path={data.id.toString() + '/exercises'}
                                                // element={<SessionsList patientId={currentPerson} therapistId={currentTherapist.id} type={type}/>}/>)
                                                   element={<PatientExercises patient={currentPerson}
                                                                              therapist={userDetails.id}
                                                                              type={type}/>}/>
                                        </Routes>
                                    )
                                }
                            )
                            }

                        </Col>
                    </Row>
                </div>

            }
        </div>
    )
}

export default HomePage
