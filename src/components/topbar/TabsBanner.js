import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {signOutCurrentUser} from "../../firebase";
import PatientList from "../sidebar/PatientList";
import PatientDetails from "../sidebar/PatientDetails";
import {Dropdown} from "bootstrap";

function TabsBanner({type, currentPerson, setCurrentPage}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)
    const [APIClicked, setAPIClicked] = useState(false)


    // useEffect(()=> {
    //     console.log()
    //     setCurrentPath(currentPerson)
    //     console.log(currentPath);
    // },[currentPerson])


    useEffect(() => {
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

                    <Nav justify variant="tabs" defaultActiveKey={currentPerson + '/sessions'}>

                        <Nav.Item>
                            <Link to={'/students'} onClick={() => {
                                setCurrentPage('students')
                            }} className="list-group-item list-group-item-action">תלמידים</Link>
                            {/*<Nav.Link eventKey="link-1">תלמידים</Nav.Link>*/}
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={'/employees'} onClick={() => {
                                setCurrentPage('employees')
                            }} className="list-group-item list-group-item-action">עובדים</Link>
                            {/*<Nav.Link eventKey="link-2">עובדים</Nav.Link>*/}
                        </Nav.Item>
                    </Nav>
                )
                break
            case "parent":
                setTabsComponent(
                    // <ul className="nav nav-tabs">
                    //     <li className="nav-item">
                    //         <a className="nav-link active" aria-current="page" href="#">Active</a>
                    //     </li>
                    //     <li className="nav-item dropdown">
                    //         <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                    //            aria-expanded="false">Dropdown</a>
                    //         <ul className="dropdown-menu">
                    //             <li><a className="dropdown-item" href="#">Action</a></li>
                    //             <li><a className="dropdown-item" href="#">Another action</a></li>
                    //             <li><a className="dropdown-item" href="#">Something else here</a></li>
                    //             <li>
                    //                 <hr className="dropdown-divider"/>
                    //             </li>
                    //             <li><a className="dropdown-item" href="#">Separated link</a></li>
                    //         </ul>
                    //     </li>
                    //     <li className="nav-item">
                    //         <a className="nav-link" href="#">Link</a>
                    //     </li>
                    //     <li className="nav-item">
                    //         <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                    //     </li>
                    // </ul>
                    <Nav justify variant="tabs" /*defaultActiveKey={'sessions'}*/>
                        <Nav.Item>
                            <Link to={currentPerson + '/documentation'} onClick={() => {
                                setCurrentPage('documentation')
                            }} className="list-group-item list-group-item-action">מסמכים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={currentPerson + '/AQform'} onClick={() => {
                                setCurrentPage('AQform')
                            }} className="list-group-item list-group-item-action">מילוי טופס AQ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="אפליקציות צד שלישי">
                                <NavDropdown.Item as={Link} to={currentPerson + '/AUTIDO'} onClick={() => {
                                    setCurrentPage('AUTIDO')
                                }}>AutiDo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={currentPerson + '/KAZABUBU'}  onClick={() => {
                                    setCurrentPage('KAZABUBU')
                                }}>
                                    KAZABUBU
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                )
                break
            case "therapist":

                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey={'/#/' + currentPerson + '/sessions'}>
                        <Nav.Item>
                            <Link to={currentPerson + '/documentation'} onClick={() => {
                                setCurrentPage('documentation')
                            }} className="list-group-item list-group-item-action">מסמכים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={currentPerson + '/AQform'} onClick={() => {
                                setCurrentPage('AQform')
                            }} className="list-group-item list-group-item-action">מילוי טופס AQ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={currentPerson + '/API'} onClick={() => {
                                setCurrentPage('API')
                            }} className="list-group-item list-group-item-action">אפליקציות צד שלישי</Link>
                        </Nav.Item>
                    </Nav>
                )
                break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    }, [currentPerson])

    return (tabsComponent)
}

export default TabsBanner