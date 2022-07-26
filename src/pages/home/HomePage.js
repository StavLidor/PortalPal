import {Button, Form, Row, Col, Container, ButtonGroup,NavDropdown} from 'react-bootstrap'
import {Animated} from 'react-animated-css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useRef} from "react";
import {signOutCurrentUser} from '../../firebase'
import {Link, Route, Routes} from "react-router-dom";
// component of children list
import PatientList from "../../components/patientsSidebar/PatientList";
// component of list of parent
import PatientDetails from "../../components/patientsSidebar/PatientDetails";
// component of tab of chosen up
import TabsBanner from "../../components/topbar/TabsBanner";
import FileSystem from "../../components/fileSystem/FileSystem";
// component of therapist list of the child
import TherapistsList from "../../components/listTherapists/TherapistsList";
// component of list of meeting
import SessionsList from "../../components/listMeetingSummries/SessionsList";
// component of tab banner of all the thing therapist manage that parent can be share with it
import TherapistTabsBanner from "../../components/topbar/TherapistTabsBanner";
// component of exercise of the patient
import PatientExercises from "../../components/exercises/PatientExercises";
// chat component between current user to other person according chose
import Chat from "../../components/chat/Chat";
// aq smart model
import AQ from "../../components/aq/AQ";
// parent list of child
import ParentList from "../../components/parentList/ParentList";
// page of admin
import SecretaryPage from "../secretary/SecretaryPage";
// my profile mange component
import MyProfile from "../../components/myProfile/MyProfile";
//code of child to connect with external therapist
import GetPersonalCode from "../../components/code/GetPersonalCode";
// api management with autido
import CheckHasAPICode from "../../components/api/checkHasAPICode";
// test list of child
import TestsList from "../../components/tests/TestsList";
// links to differnt test banner
import ProgressTrendTabsBanner from "../../components/tests/ProgressTrendTabsBanner";
import Logo from "../../images/Portapel.png";
import ContactUs from "../../components/contactUs/ContactUs"
import AboutUs from "../../components/aboutUs/AboutUs"

import {useReactToPrint} from 'react-to-print'


import {isClick} from "../../useFunction";



/*home page after login with all the thing that offer */
function HomePage({userDetails, type, institute, setConnectNow,dictInstitutes}) {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const [patientListData, setPatientListData] = useState([])
    const dictTypes={therapist:'מטפל',parent:'הורה',admin:'מנהל'}
    const [activeTherapistListData, setActiveTherapistListData] = useState([])
    const [notActiveTherapistListData, setNotActiveTherapistListData] = useState([])
    const [parentsListData, setParentsListData] = useState([])
    const [currentPerson, setCurrentPerson] = useState((() => {
        const pathSpilt = window.location.pathname.split("/")

        if (pathSpilt.length === 1)
            return ""
        if (localStorage.getItem("currentPerson") !== null && pathSpilt[1] === localStorage.getItem("currentPerson")) {
            return pathSpilt[1]
        }
        return ""
    })())
    const [currentPage, setCurrentPage] = useState((() => {
        const saveCurrentPage = localStorage.getItem("currentPage")
        const pathSpilt = window.location.pathname.split("/")
        const len = pathSpilt.length
        if (saveCurrentPage !== null && (pathSpilt[len - 1] === saveCurrentPage ||
            len > 2 && ((pathSpilt[len - 2] + '/' + pathSpilt[len - 1] === saveCurrentPage) || (pathSpilt[len - 2] === saveCurrentPage
                && pathSpilt[len - 1] === '*')))) {
            return saveCurrentPage
        }
        if (saveCurrentPage === 'therapist' || saveCurrentPage === 'parent') {
            return saveCurrentPage
        }
        return ''
    })())
    const [currentTherapist, setCurrentTherapist] = useState({id: '', index: '', active: true})
    const [currentParent, setCurrentParent] = useState({id: '', index: ''})
    const [children, setChildren] = useState([])

    async function onLogout() {
        setCurrentPerson("")
        setCurrentPage('')
        setConnectNow(false)
        await signOutCurrentUser()

    }
    /*management on change */
    useEffect(() => {
        localStorage.setItem("currentPerson", currentPerson)
    }, [currentPerson])
    useEffect(() => {
        localStorage.setItem("currentPage", currentPage)
    }, [currentPage])

    useEffect(() => {
        if (type === "therapist") {
            return
        }
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
        if (userDetails.institutes[institute].findIndex((s) => s === currentPerson) === -1) {
            setCurrentPerson("")
        }
    }, [userDetails.institutes[institute]])
    useEffect(() => {
        const pathSpilt = window.location.pathname.split("/")
        if (pathSpilt.length > 1 && patientListData.length > 0 &&
            patientListData.findIndex((s) => s.id === pathSpilt[1]) !== -1) {
            setCurrentPerson(pathSpilt[1])

        }
    }, [patientListData])
    // view home page
    const componentsTherapists = (list, isActive, data) => {

        return (list.map((therapist, index) => {
            return (
                <div>
                    <Routes>
                        <Route
                            path={data.id.toString() + '/' + 'therapist' + '/' + isActive.toString() + '/' + index.toString() + '/*'}
                            element={<TherapistTabsBanner therapistInstitute={therapist.institute}
                                                          therapistId={therapist.id}
                                                          therapistIsActive={isActive === 'active'}
                                                          type={type}
                                                          currentPerson={currentPerson}
                                                          setCurrentPage={setCurrentPage}
                                                          currentPage={currentPage}/>}
                        />
                    </Routes>
                    <Routes>
                        <Route
                            path={data.id.toString() + '/' + 'therapist' + '/' + isActive.toString() + '/' + index.toString() + '/communication'}
                            element={<Chat
                                otherUser={therapist} patient={data.id} isActive={isActive}/>}/>
                    </Routes>

                    <Routes>
                        <Route
                            path={data.id.toString() + '/' + 'therapist' + '/' + isActive.toString() + '/' + index.toString() + '/sessions'}
                            element={<SessionsList patientId={currentPerson}
                                                   therapistId={currentTherapist.id}
                                                   type={type}/>}/>

                        <Route
                            path={data.id.toString() + '/' + 'therapist' + '/' + isActive.toString() + '/' + index.toString() + '/exercises'}
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
                <Row className='gap-4'>
                    <Col md='2' style={{maxWidth: '250px'}}><img src={Logo} alt='toko' style={{width: '240px'}}/></Col>

                    <Col className="align-self-center" id='top-banner'>
                        <Animated animationIn="slideInLeft" animationInDuration={1000} isVisible={true}>
                            <Row>
                                <Col
                                    md='2' className="w-auto rounded justify-content-center">
                                    <ButtonGroup className="gap-4 align-items-center">
                                        <Form.Label>
                                            שלום, {userDetails.firstName} {userDetails.lastName}<br/>{dictTypes[type]}
                                        </Form.Label>
                                        {type !== 'admin' &&
                                        <Button as={Link} to="/myProfile" variant='secondary'
                                                className="rounded-3"
                                                id='account-button'
                                                onClick={() => {
                                                    setCurrentPerson('')
                                                    setCurrentPage('myProfile')
                                                }}>החשבון
                                            שלי</Button>
                                        }
                                        {/*</Link>*/}
                                        <Button href={'/'} className="rounded-3" variant='secondary'
                                                id='account-button'
                                                onClick={onLogout}>התנתק</Button>
                                    </ButtonGroup>
                                </Col>
                                <Col style={{width: '100%'}}/>
                                <Col md='3' className=" align-self-center w-auto">

                                    <TabsBanner type={type} currentPerson={currentPerson}
                                                setCurrentPage={setCurrentPage}
                                                currentPage={currentPage} handlePrint={handlePrint}
                                                setCurrentPerson={setCurrentPerson}/>
                                </Col>
                            </Row>
                        </Animated>
                    </Col>
                </Row>
            </Container>
            {(type === 'admin') ? (
                    <SecretaryPage data={userDetails} dictInstitutes={dictInstitutes}/>) :
                <Row className='gap-4 justify-content-center'>
                    <Col md='2' style={{width: "13%", maxWidth: '350px'}} id='right-floating-box'
                         className="p-3" /*onMouseEnter={()=>setA(true)} onMouseLeave={()=>setA(false)}*/>
                        {type === 'parent' && <PatientList list={children} setPatientListData={setPatientListData}
                                                           listTitle={"רשימת ילדים"}
                                                           setCurrentPerson={setCurrentPerson}
                                                           currentPerson={currentPerson}
                                                           currentPage={currentPage}
                                                           institute={institute}
                                                           type={type}
                                                           setCurrentPage={setCurrentPage}/>}

                        {type === 'therapist' && <PatientList list={userDetails.institutes[institute]}
                                                              setPatientListData={setPatientListData}
                                                              listTitle={"רשימת מטופלים"}
                                                              setCurrentPerson={setCurrentPerson}
                                                              currentPerson={currentPerson}
                                                              currentPage={currentPage}
                                                              institute={institute}
                                                              setCurrentPage={setCurrentPage}
                                                              type={type}/>}

                    </Col>
                    <Col md='2' style={{width: "13%", maxWidth: '350px'}}>
                        <Animated animationIn="fadeInRight" animationOut="fadeOutRight" animationInDuration={500}
                                  animationOutDuration={500} isVisible={currentPerson !== ''}>
                            <Row className="p-2 mb-4 patient-details" id='middle-floating-box' style={{minHeight: 200}}>

                                {patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                <Route path={data.id.toString() + '/*'}
                                                       element={<PatientDetails type={type} institute={institute}
                                                                                details={data}/>}/>

                                            </Routes>)
                                    }
                                )}

                            </Row>

                            <Row className="mb-4 " style={(() => {
                                if (type === 'parent') {
                                    return {minHeight: 300}
                                }
                                return {minHeight: 100}

                            })()} id='middle-floating-box'>

                                {(type === 'parent') &&
                                patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                <Route path={data.id.toString() + '/*'}
                                                       element={<TherapistsList details={data} currentPage={currentPage}
                                                                                setCurrentTherapist={setCurrentTherapist}
                                                                                setActiveTherapistListData={setActiveTherapistListData}
                                                                                setNotActiveTherapistListData={setNotActiveTherapistListData}
                                                                                type={type} institute={institute}
                                                                                setCurrentPage={setCurrentPage} dictInstitutes={dictInstitutes}
                                                       />}/>
                                            </Routes>)
                                    }
                                )}

                                {(type === 'therapist') &&
                                patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <Routes>
                                                <Route path={data.id.toString() + '/*'}
                                                       element={
                                                           <Col>
                                                               <Row>
                                                                   <Button as={Link} to='sessions'
                                                                           active={currentPage === 'sessions'}
                                                                           onClick={() => {
                                                                               setCurrentPage('sessions')
                                                                           }}
                                                                           className="list-group-item list-group-item-action"
                                                                           id='selected-patient-menu-top-button'>סיכומי
                                                                       טיפולים</Button>
                                                               </Row>

                                                               <Row>
                                                                   <Button as={Link} to='exercises'
                                                                           active={currentPage === 'exercises'}
                                                                           onClick={() => {
                                                                               setCurrentPage('exercises')
                                                                           }}
                                                                           className="list-group-item list-group-item-action"
                                                                           id='selected-patient-menu-middle-button'>תרגילים</Button>
                                                               </Row>

                                                               <Row>
                                                                   <Button as={Link} to='ProgressTrend/*'
                                                                           active={currentPage === 'ProgressTrend' || currentPage === 'ProgressTrend/interpersonalConnection'
                                                                           || currentPage === 'ProgressTrend/groupDiscourse' ||
                                                                           currentPage === 'ProgressTrend/academic' || currentPage === 'ProgressTrend/KeepingEyeContact' ||
                                                                           currentPage === 'ProgressTrend/plots'
                                                                           }

                                                                           onClick={() => {
                                                                               setCurrentPage('ProgressTrend')
                                                                           }}
                                                                           className="list-group-item list-group-item-action"
                                                                           id='selected-patient-menu-middle-button'>מגמת
                                                                       התקדמות</Button>
                                                               </Row>

                                                               <Row>
                                                                   <NavDropdown drop='start' title={"אפליקציות צד שלישי"}
                                                                                id='selected-patient-menu-bottom-button'
                                                                                active={isClick('AUTIDO') || isClick('KAZABUBU')}>
                                                                       <NavDropdown.Item as={Link} to={'AUTIDO'}
                                                                                         onClick={() => {
                                                                                             setCurrentPage('AUTIDO')
                                                                                         }}>AutiDo</NavDropdown.Item>
                                                                       <NavDropdown.Item as={Link} to={'KAZABUBU'}
                                                                                         onClick={() => {
                                                                                             setCurrentPage('KAZABUBU')
                                                                                         }}>
                                                                           KAZABUBU
                                                                       </NavDropdown.Item>
                                                                   </NavDropdown>
                                                               </Row>
                                                           </Col>
                                                       }/>
                                            </Routes>
                                        )
                                    }
                                )}


                            </Row>

                            <Row
                                id='middle-floating-box'>
                                {type === 'parent' && currentPerson !== '' &&
                                    <Col>
                                        {institute === 'external' && <Row>
                                            <Button as={Link} to={currentPerson + '/code'} onClick={() => {
                                                setCurrentPage('code')
                                            }} active={currentPage === 'code'}
                                                    className="text-center"
                                                    variant="outline-secondary"
                                                    id='personal-code-button'>קבל קוד אישי</Button></Row>}

                                        <Row>
                                            <NavDropdown drop='start' title={"אפליקציות צד שלישי"}
                                                         id='selected-patient-menu-bottom-button'
                                                         active={currentPage==='AUTIDO'}>
                                                <NavDropdown.Item as={Link} to={currentPerson + '/AUTIDO'}
                                                                  onClick={() => {
                                                                      setCurrentPage('AUTIDO')
                                                                  }}>AutiDo</NavDropdown.Item>
                                                <NavDropdown.Item /*as={Link} to={'KAZABUBU'}*/
                                                    /*onClick={() => {
                                                        setCurrentPage('KAZABUBU')
                                                    }*}*/>
                                                    KAZABUBU
                                                </NavDropdown.Item>
                                            </NavDropdown></Row>
                                    </Col>
                                }


                                {(type === 'therapist') &&
                                patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            <>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/*'}
                                                           element={<TherapistsList details={data} currentPage={currentPage}
                                                                                    setCurrentTherapist={setCurrentTherapist}
                                                                                    setActiveTherapistListData={setActiveTherapistListData}
                                                                                    setNotActiveTherapistListData={setNotActiveTherapistListData}
                                                                                    type={type} institute={institute}
                                                                                    setCurrentPage={setCurrentPage}
                                                                                    dictInstitutes={dictInstitutes}
                                                           />

                                                           }/>
                                                </Routes>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/*'}
                                                           element={<ParentList  details={data}
                                                                                setCurrentPage={setCurrentPage}
                                                                                setParentsListData={setParentsListData}
                                                                                setCurrentParent={setCurrentParent}/>}/>
                                                </Routes>
                                            </>)
                                    }
                                )
                                }
                            </Row>
                        </Animated>
                    </Col>
                    <Col md='8' className="border border-secondary rounded" id='display-window'>

                        <div>
                            {currentPerson.toString() !== '' && <Routes>
                                <Route path={currentPerson.toString()}
                                       element={
                                           <div>
                                               <Row className='align-content-start p-5'
                                                    style={{fontSize: 20, width: '70%'}}>
                                                   באפשרותך ללחוץ על אחת מהאפשרויות מהתפריט מימין כדי להשיג מידע נוסף.
                                               </Row>
                                           </div>
                                       }/>
                            </Routes>}
                            <Routes>
                                <Route path={'/'}
                                       element={
                                           <div>
                                               <Row className='align-content-start p-1'> <Form.Label
                                                   className="text-center fs-1"
                                                   style={{fontWeight: "bold", width: "100%"}}>
                                                   ברוך/ה הבא/ה לפורטפל!
                                               </Form.Label> </Row>
                                               <Col md={"auto"} className="gap-1">
                                                   <Row className='align-content-start justify-content-center p-1'
                                                        style={{fontSize: 20}}>
                                                       החוט המקשר בין מטפלים והורים.
                                                   </Row>
                                                   <br/>
                                                   {type === 'parent' && <Row className='justify-content-center p-5'
                                                                              style={{fontSize: 20}}>
                                                       לחץ על אחת מהרשומות שמימין על מנת לצפות בפרטים על הילד שלך.
                                                   </Row>}
                                                   {type === 'therapist' && <Row className='justify-content-center p-5'
                                                                                 style={{fontSize: 20}}>
                                                       לחץ על אחת מהרשומות שמימין על מנת לצפות בפרטים על המטופל שלך.
                                                   </Row>}
                                               </Col></div>


                                       }/>
                            </Routes>
                            <Routes>
                                <Route path={'ContactUs'}
                                       element={
                                           <ContactUs/>
                                       }/>
                            </Routes>
                            <Routes>
                                <Route path={'AboutUs'}
                                       element={
                                           <AboutUs/>
                                       }/>
                            </Routes>
                            <Routes>
                                <Route path={currentPerson.toString() + '/documentation'}
                                       element={
                                           (() => {
                                               if (currentPerson !== '') {
                                                   return <FileSystem user={userDetails.id} patient={currentPerson}/>
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
                            <div ref={componentRef}>

                                <Routes>
                                    <Route path={currentPerson.toString() + '/AQform'}
                                           element={(() => {
                                               return <AQ/>
                                           })()
                                           }/>
                                    <Route path={'/AQform'}
                                           element={(() => {
                                               return <AQ/>
                                           })()

                                           }/>
                                </Routes>
                                <Routes>
                                    <Route path={currentPerson.toString() + '/AUTIDO'}
                                           element={(() => {
                                               if (currentPerson !== '') {
                                                   const index = patientListData.findIndex((s) => s.id === currentPerson)
                                                   if (index === -1) {
                                                       return <div></div>
                                                   }
                                                   return <CheckHasAPICode appKey={'AutiDo'}
                                                                           patientDetails={patientListData[index].data()}/>
                                               }
                                               return <h2>אנא בחר מטופל כדי לראות דוחות קיימים</h2>

                                           })()

                                           }/>
                                </Routes>

                                {type === 'parent' && currentPerson !== '' && patientListData.length > 0 && <Routes>
                                    <Route path={currentPerson.toString() + '/code'}
                                           element={<GetPersonalCode type={type} id={currentPerson}
                                                                     detailsChild={patientListData[patientListData.findIndex((p) => p.id === currentPerson)
                                                                         ].data()}/>}/>
                                </Routes>}


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

                                {type === 'therapist' && patientListData.map((item) => {
                                        let data = item.data()
                                        return (
                                            parentsListData.map((parent, index) => {
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
                                                    return (
                                                        <div>
                                                            <Routes>
                                                                <Route
                                                                    path={data.id.toString() + '/' + 'therapist' + '/' + index.toString() + '/*'}
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
                                            <>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/sessions'}
                                                           element={<SessionsList patientId={currentPerson}
                                                                                  therapistId={userDetails.id}
                                                                                  type={type}/>}/>
                                                    {currentTherapist.id !== '' && ((currentTherapist.active && activeTherapistListData.length > parseInt(currentTherapist.index)) ||
                                                        (!currentTherapist.active && notActiveTherapistListData.length > parseInt(currentTherapist.index)))
                                                    && <Route path={data.id.toString() + '/therapist'}
                                                              element={<Chat patient={currentPerson} otherUser={
                                                                  (() => {
                                                                      if (currentTherapist.active) {
                                                                          return activeTherapistListData[parseInt(currentTherapist.index)]
                                                                      }
                                                                      return notActiveTherapistListData[parseInt(currentTherapist.index)]
                                                                  })()
                                                              } type={type}
                                                                             isActive={(() => {
                                                                                 if (currentTherapist.active) {
                                                                                     return 'active'
                                                                                 }
                                                                                 return 'noActive'
                                                                             })()}

                                                              />}/>}
                                                    {currentParent.id !== '' && parentsListData.length > parseInt(currentParent.index) &&
                                                    <Route path={data.id.toString() + '/parent'}
                                                           element={<Chat patient={currentPerson}
                                                                          otherUser={parentsListData[parseInt(currentParent.index)]
                                                                          } type={type} isActive={'active'}
                                                           />}/>}

                                                    <Route path={data.id.toString() + '/exercises'}
                                                           element={<PatientExercises patient={currentPerson}
                                                                                      therapist={userDetails.id}
                                                                                      type={type}/>}/>
                                                    <Route path={data.id.toString() + '/ProgressTrend/*'}
                                                           element={
                                                               <ProgressTrendTabsBanner type={type}
                                                                                        currentPerson={currentPerson}
                                                                                        setCurrentPage={setCurrentPage}
                                                                                        currentPage={currentPage}/>
                                                           }/>


                                                </Routes>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/ProgressTrend/groupDiscourse'}
                                                           element={
                                                               <TestsList patientId={currentPerson}

                                                                          type={type} category={'שיח קבוצתי'}/>
                                                           }/>
                                                </Routes>
                                                <Routes>
                                                    <Route
                                                        path={data.id.toString() + '/ProgressTrend/interpersonalConnection'}
                                                        element={
                                                            <TestsList patientId={currentPerson}

                                                                       type={type} category={'קשר בין אישי'}/>
                                                        }/>
                                                </Routes>
                                                <Routes>

                                                    <Route path={data.id.toString() + '/ProgressTrend/academic'}
                                                           element={
                                                               <TestsList patientId={currentPerson}

                                                                          type={type} category={'אקדמי'}/>
                                                           }/>
                                                </Routes>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/ProgressTrend/KeepingEyeContact'}
                                                           element={
                                                               <TestsList patientId={currentPerson}

                                                                          type={type} category={'שמירת קשר עין'}/>
                                                           }/>
                                                </Routes>
                                                <Routes>
                                                    <Route path={data.id.toString() + '/ProgressTrend/plots'}
                                                           element={
                                                               <TestsList patientId={currentPerson}

                                                                          type={type} category={null}/>
                                                           }/>/>
                                                </Routes>
                                            </>
                                        )
                                    }
                                )
                                }
                            </div>
                        </div>
                    </Col>
                </Row>

            }
        </div>
    )
}

export default HomePage