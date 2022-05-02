import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {signOutCurrentUser} from "../../firebase";
import PatientList from "../sidebar/PatientList";
import PatientDetails from "../sidebar/PatientDetails";

function TherapistTabsBanner({type,currentPerson, setCurrentPage}){

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)



    // useEffect(()=> {
    //     console.log()
    //     setCurrentPath(currentPerson)
    //     console.log(currentPath);
    // },[currentPerson])



    useEffect(()=>{
        switch (type) {
            case "admin":
                setTabsComponent(
                    // <Nav justify variant="tabs" defaultActiveKey={'/#/'+ currentPerson +'/sessions'}>
                    <Container className="border border-secondary rounded">
                    <Nav justify variant="tabs" defaultActiveKey={currentPerson +'/sessions'}>
                        <Nav.Item>
                            <Link  to={'sessions'} onClick={()=>{
                                setCurrentPage('sessions')
                            }} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">הוספת משתמשי פורטל</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">הוספת תלמידים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">ניהול מסמכים</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Container>
                )
                break
            case "parent":


                setTabsComponent(
                    <Container className="border border-secondary rounded">

                    <Nav justify variant="tabs" /*defaultActiveKey={'sessions'}*/>

                        <Nav.Item>
                            <Link to='sessions' onClick={()=>{
                                setCurrentPage('sessions')
                                }}  className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to='exercises' onClick={()=>{
                                setCurrentPage('exercises')
                            }}  className="list-group-item list-group-item-action">תרגילים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">התקשרות</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Container>

                )
                break
            case "therapist":

                setTabsComponent(
                    <Container className="border border-secondary rounded">
                    <Nav justify variant="tabs" defaultActiveKey={'/#/'+ currentPerson +'/sessions'}>
                        <Nav.Item>
                            <Link onClick={()=>{
                                setCurrentPage('sessions')
                            }} to={'/#/'+ currentPerson +'/sessions'} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">תרגילים</Nav.Link>
                            {/*<Link to={'toko'} className="list-group-item list-group-item-action">sdfasfsd</Link>*/}
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">התקשרות</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Container>
                )
                break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    },[currentPerson])

    return(tabsComponent)
}
export default TherapistTabsBanner