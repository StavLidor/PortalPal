import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {signOutCurrentUser} from "../../firebase";
import PatientList from "../sidebar/PatientList";
import PatientDetails from "../sidebar/PatientDetails";

function TabsBanner({type,currentPerson, setCurrentPage}){

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
                    // <Nav justify variant="tabs" defaultActiveKey={currentPerson +'/sessions'}>
                    //     <Nav.Item>
                    //         <Link  to={ 'sessions'} onClick={()=>{
                    //             setCurrentPage('sessions')
                    //         // }} to={'/#/'+ currentPerson +'/sessions'} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                    //         // }} to={ currentPerson +'/sessions'} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                    //         }} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                    //     </Nav.Item>
                    //     <Nav.Item>
                    //         <Nav.Link eventKey="link-1">הוספת משתמשי פורטל</Nav.Link>
                    //     </Nav.Item>
                    //     <Nav.Item>
                    //         <Nav.Link eventKey="link-2">הוספת תלמידים</Nav.Link>
                    //     </Nav.Item>
                    //     <Nav.Item>
                    //         <Nav.Link eventKey="link-3">ניהול מסמכים</Nav.Link>
                    //     </Nav.Item>
                    // </Nav>

                    <Nav justify variant="tabs" defaultActiveKey={currentPerson +'/sessions'}>

                        <Nav.Item>
                            <Link to={'/students'} onClick={()=>{
                                setCurrentPage('students')
                            }}  className="list-group-item list-group-item-action">תלמידים</Link>
                            {/*<Nav.Link eventKey="link-1">תלמידים</Nav.Link>*/}
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={'/employees'} onClick={()=>{
                                setCurrentPage('employees')
                            }}  className="list-group-item list-group-item-action">עובדים</Link>
                            {/*<Nav.Link eventKey="link-2">עובדים</Nav.Link>*/}
                        </Nav.Item>
                    </Nav>
                )
                break
            case "parent":


                setTabsComponent(

                    // <Nav justify variant="tabs" defaultActiveKey={'/#/'+ currentPerson +'/sessions'}>
                    <Nav justify variant="tabs" /*defaultActiveKey={'sessions'}*/>
                        <Nav.Item>
                            <Link to={currentPerson + '/documentation'} onClick={()=>{
                         setCurrentPage('documentation')
                                }}  className="list-group-item list-group-item-action">מסמכים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={currentPerson + '/AQform'} onClick={()=>{
                                setCurrentPage('AQform')
                            }}  className="list-group-item list-group-item-action">מילוי טופס AQ</Link>
                        </Nav.Item>
                        <Nav.Item>

                            <Nav.Link eventKey="link-4">API</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )
                break
            case "therapist":

                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey={'/#/'+ currentPerson +'/sessions'}>
                        <Nav.Item>
                            <Link to={currentPerson + '/documentation'} onClick={()=>{
                                setCurrentPage('documentation')
                            }}  className="list-group-item list-group-item-action">מסמכים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={currentPerson + '/AQform'} onClick={()=>{
                                setCurrentPage('AQform')
                            }}  className="list-group-item list-group-item-action">מילוי טופס AQ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4">API</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )
                break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    },[currentPerson])

    return(tabsComponent)
}
export default TabsBanner