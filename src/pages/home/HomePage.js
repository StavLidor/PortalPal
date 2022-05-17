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
import MultiType from "../../components/MultiTypeGraph";
import MultiTypeGraph from "../../components/MultiTypeGraph";
import ReportsPage from "../../ReportsPage";
import CheckHasAPICode from "../../checkHasAPICode";

function HomePage({userDetails, type, institute}) {
    // const [patientListData, setPatientListData] = useState((() => {
    //     if (JSON.parse(localStorage.getItem("currentPatientsListData")) === "") {
    //         return []
    //     }
    //     return JSON.parse(localStorage.getItem("currentPatientsListData"))
    // })())
    const [patientListData, setPatientListData] = useState([])
    const [activeTherapistListData, setActiveTherapistListData] = useState([])
    const [notActiveTherapistListData, setNotActiveTherapistListData] = useState([])
    const [parentsListData, setParentsListData] = useState([])
    const [showDialogCode, setShowDialogCode] = useState(false)
    const [sideListComponent, setSideListComponent] = useState(<h3>משהו השתבש...</h3>)
    const [currentPerson, setCurrentPerson] = useState((() => {
        if (localStorage.getItem("currentPerson") === null)
            return ""
        return localStorage.getItem("currentPerson")
    })())
    const [currentPage, setCurrentPage] = useState('')
    const [currentTherapist, setCurrentTherapist] = useState({id: '', index: ''})
    const [currentParent, setCurrentParent] = useState({id: '', index: ''})
    const [children, setChildren] = useState([])
    console.log('Currents', currentPerson)

    async function onLogout() {
        await signOutCurrentUser()
    }

    useEffect(() => {
        console.log("patients: ", patientListData)
        console.log("current person: ", currentPerson)
        localStorage.setItem("currentPerson", currentPerson)
    }, [currentPerson])

    useEffect(() => {
        if (type === "therapist") {
            return
        }
        console.log("children: ", children)
        const childrenList = []
        for (const [key, value] of Object.entries(userDetails.childrenIds)) {
            if (value.findIndex((i) => i === institute) !== -1) {
                childrenList.push(key)

            }
        }
        setChildren(childrenList)
    }, [userDetails.childrenIds])

    useEffect(() => {
        if (type === "parent") {
            return
        }
        console.log("in use effect: ", userDetails.institutes[institute])
        if (userDetails.institutes[institute].findIndex((s) => s === currentPerson) === -1) {
            setCurrentPerson("")
        }
    }, [userDetails.institutes[institute]])

    const handleMyProfile = () => {
    }

    const componentsTherapists = (list, isActive, data) => {

        return (list.map((therapist, index) => {
            // let data = item.data()
            console.log('PATH:', '/' + data.id.toString() + '/' + index.toString())
            return (
                <div>
                    <Routes>
                        <Route path={data.id.toString() + '/' + isActive.toString() + '/' + index.toString() + '/*'}
                               element={<TherapistTabsBanner therapistInstitute={therapist.institute}
                                                             therapistId={therapist.id}
                                                             type={type}
                                                             currentPerson={currentPerson}
                                                             setCurrentPage={setCurrentPage}/>}
                        />
                    </Routes>
                    <Routes>
                        <Route
                            path={data.id.toString() + '/' + isActive.toString() + '/' + index.toString() + '/communication'}
                            element={<Chat
                                otherUser={therapist} patient={data.id} isActive={isActive}/>}/>
                    </Routes>
                    <Routes>
                        <Route
                            path={data.id.toString() + '/' + isActive.toString() + '/' + index.toString() + '/sessions'}
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
        }))
    }


    return (

        <div>
            <Container className="p-4" fluid>
                <Row className='gap-4 '>
                    <Col md='2'><img src={Logo} alt='toko' style={{width: '240px'}}/></Col>
                    {/*<Col md='2' className="border border-secondary rounded">פורטלי</Col>*/}
                    {/*<Col md='3' className="w-auto border border-secondary rounded">*/}
                    <Col md='3' className="w-auto rounded align-self-center">
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
                    <Col md='5' className="border align-self-center" id='floating-tabs-bar'>
                        {/*<Routes>*/}
                        {/*    <Route path={data.id.toString() + '/' + index.toString() + '/*'}*/}
                        {/*           element={<TabsBanner type={type}*/}
                        {/*                                         currentPerson={currentPerson}*/}
                        {/*                                         setCurrentPage={setCurrentPage}/>}/>*/}
                        {/*</Routes>*/}
                        <Container className='p-2'>
                        <TabsBanner type={type} currentPerson={currentPerson} setCurrentPage={setCurrentPage}/>
                        </Container>
                        {/*{tabsComponent}*/}
                    </Col>
                </Row>
            </Container>
            {(type === 'admin') ? (
                    <SecretaryPage data={userDetails}/>) :
                <div>
                    <Row className='p-4 gap-4' >
                        <Col md='2' style={{width:"13%"}}  id='right-floating-box' className="p-3">
                            {type === 'parent' && <PatientList list={children} setPatientListData={setPatientListData}
                                                               listTitle={"רשימת ילדים"}
                                                               setCurrentPerson={setCurrentPerson}
                                                               currentPage={currentPage}
                                                               institute={institute}/>}

                            {type === 'therapist' && <PatientList list={userDetails.institutes[institute]}
                                                                  setPatientListData={setPatientListData}
                                                                  listTitle={"רשימת מטופלים"}
                                                                  setCurrentPerson={setCurrentPerson}
                                                                  currentPage={currentPage}
                                                                  institute={institute}/>}

                            {/*{sideListComponent}*/}
                        </Col>
                        <Col md='2' style={{width:"13%"}}>
                            <Row className="p-2 mb-4" id='middle-floating-box'>

                                {patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                {/*<Route path={/#/ + data.id.toString() + '/*'}*/}
                                                <Route path={data.id.toString() + '/*'}
                                                       element={<PatientDetails type={type} institute={institute}
                                                                                details={data}/>}/>

                                            </Routes>)
                                    }
                                )}

                            </Row>
                            <Row className="mb-4 " style={{minHeight: 300}} id='middle-floating-box'>

                                {(type === 'parent') &&
                                patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                {/*<Route path={'/#/' + data.id.toString() + '/sessions/*'}*/}
                                                <Route path={data.id.toString() + '/*'}
                                                       element={<TherapistsList details={data} currentPage={currentPage}
                                                                                setCurrentTherapist={setCurrentTherapist}
                                                                                setActiveTherapistListData={setActiveTherapistListData}
                                                                                setNotActiveTherapistListData={setNotActiveTherapistListData}
                                                                                currentPerson={currentPerson}
                                                                                type={type} institute={institute}
                                                       />}/>
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
                                                                                    setActiveTherapistListData={setActiveTherapistListData}
                                                                                    setNotActiveTherapistListData={setNotActiveTherapistListData}
                                                                                    currentPerson={currentPerson}
                                                                                    type={type} institute={institute}/>

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

                            <Row style={{minHeight: 300}} id='middle-floating-box'>
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
                                <Route path={currentPerson.toString() + '/AUTIDO'}
                                       element={(() => {
                                           if (currentPerson !== '') {
                                               // return <ReportsPage appKey={'AutiDo'}/>
                                               const index = patientListData.findIndex((s) => s.id === currentPerson)
                                               if (index === -1) {
                                                   return <div></div>
                                               }
                                               // console.log("index: ", index)
                                               // console.log("patientListData: ", patientListData)
                                               // console.log("patientListData[index]: ", patientListData[index].data())
                                               return <CheckHasAPICode appKey={'AutiDo'}
                                                                       patientDetails={patientListData[index].data()}/>
                                           }
                                           return <h2>אנא בחר מטופל כדי לראות דוחות קיימים</h2>

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
                                        <div>
                                            {activeTherapistListData.length > 0 && componentsTherapists(activeTherapistListData, 'active', data)}
                                            {notActiveTherapistListData.length > 0 && componentsTherapists(notActiveTherapistListData, 'notActive', data)}

                                        </div>
                                    )
                                }
                            )}

                            {/*{activeTherapistListData.length > 0 && componentsTherapists(activeTherapistListData, 'active')}*/}
                            {/*{notActiveTherapistListData.length > 0 && componentsTherapists(notActiveTherapistListData, 'notActive')}*/}


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
                                                                element={<Chat otherUser={parent} patient={data.id}
                                                                               isActive={"active"}/>}
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
                                        activeTherapistListData.map((therapist, index) => {
                                                console.log('PATH:', '/' + data.id.toString() + '/' + index.toString())
                                                return (
                                                    <div>
                                                        <Routes>
                                                            <Route path={data.id.toString() + '/' + index.toString() + '/*'}
                                                                   element={<Chat otherUser={therapist} patient={data.id}
                                                                                  isActive={"active"}/>}
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
