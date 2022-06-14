import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";
import {auth, removeConnectionPatientToTherapist, signOutCurrentUser} from "../../firebase";
import {Plus} from "react-bootstrap-icons";
import {isClick} from "../../useFunction";

function TherapistTabsBanner({therapistId, therapistInstitute, type, currentPerson, setCurrentPage, currentPage,
                                 therapistIsActive}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)


    // useEffect(()=> {
    //     setCurrentPath(currentPerson)
    // },[currentPerson])


    useEffect(() => {
        switch (type) {
            // case "admin":
            //     setTabsComponent(
            //         // <Nav justify variant="tabs" defaultActiveKey={'/#/'+ currentPerson +'/sessions'}>
            //         <Container className="border border-secondary rounded" >
            //         <Nav fill justify variant="tabs" defaultActiveKey={currentPerson +'/sessions'}>
            //             <Nav.Item>
            //                 <Link  to={'sessions'} onClick={()=>{
            //                     setCurrentPage('sessions')
            //                 }} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
            //             </Nav.Item>
            //             <Nav.Item>
            //                 <Nav.Link eventKey="link-1">הוספת משתמשי פורטל</Nav.Link>
            //             </Nav.Item>
            //             <Nav.Item>
            //                 <Nav.Link eventKey="link-2">הוספת תלמידים</Nav.Link>
            //             </Nav.Item>
            //             <Nav.Item>
            //                 <Nav.Link eventKey="link-3">ניהול מסמכים</Nav.Link>
            //             </Nav.Item>
            //         </Nav>
            //         </Container>
            //     )
            //     break
            case "parent":
                setTabsComponent(
                    <Container style={{width: '90%'}} className='p-4'>
                        <Row className="w-100">
                            <Col md={10}>
                            <Nav fill variant="pills" className='gap-4' defaultActiveKey={'sessions'}>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='sessions' onClick={() => {
                                        setCurrentPage('sessions')
                                    }} active={isClick('sessions')} id='inner-top-menu-button'
                                              className="list-group-item list-group-item-action border">סיכומי
                                        טיפולים</Nav.Link>
                                </Nav.Item>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='exercises' id='inner-top-menu-button' onClick={() => {
                                        setCurrentPage('exercises')
                                    }} active={isClick('exercises')}
                                              className="list-group-item list-group-item-action border">תרגילים</Nav.Link>
                                </Nav.Item>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='communication' id='inner-top-menu-button' onClick={() => {
                                        setCurrentPage('communication')
                                    }} className="list-group-item list-group-item-action border"
                                              active={isClick('communication')}>התקשרות</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            {therapistInstitute === 'external' &&therapistIsActive&&
                            <Col md={2}><Button id="deleteExternalTherapist" className="text-center" onClick={async () => {
                                await removeConnectionPatientToTherapist(therapistId, currentPerson, therapistInstitute)
                            }
                            }  variant="outline-primary"><Plus/>הסר
                                מטפל חיצוני</Button>
                            </Col>}
                        </Row>
                    </Container>
                )
                break
            // case "therapist":
            //     setTabsComponent(
            //         <Container className="border border-secondary rounded m-3">
            //             <Nav justify variant="tabs" defaultActiveKey={'sessions'}>
            //                 <Nav.Item>
            //                     <Button as={Link} active={isClick('sessions')}onClick={() => {
            //                         setCurrentPage('sessions')
            //                     }} to={'sessions'} className="list-group-item list-group-item-action"
            //                               style={{borderRadius: 10}} id='sessions-side-button'>סיכומי
            //                         טיפולים</Button>
            //                 </Nav.Item>
            //                 <Nav.Item>
            //                     <Nav.Link as={Link} to='exercises' active={isClick('exercises')} onClick={() => {
            //                         setCurrentPage('exercises')
            //                     }} className="list-group-item list-group-item-action">תרגילים</Nav.Link>
            //                 </Nav.Item>
            //                 <Nav.Item>
            //                     <Nav.Link as={Link} to='communication' active={isClick('communication')} onClick={() => {
            //                         setCurrentPage('communication')
            //                     }} className="list-group-item list-group-item-action">התקשרות</Nav.Link>
            //                 </Nav.Item>
            //             </Nav>
            //         </Container>
            //     )
            //     break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    }, [currentPerson, currentPage])

    return (tabsComponent)
}

export default TherapistTabsBanner