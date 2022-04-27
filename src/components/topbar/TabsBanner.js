import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {signOutCurrentUser} from "../../firebase";
import PatientList from "../sidebar/PatientList";
import PatientDetails from "../sidebar/PatientDetails";

function TabsBanner({type,currentPerson}){

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)
    const [currentPath, setCurrentPath] = useState(useLocation())

    const Funcky =e=> {
        e.preventDefault()
        setCurrentPath(useLocation());
    }




    useEffect(()=>{
        switch (type) {
            case "admin":
                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey="#/sessions">
                        <Nav.Item>
                            <Link to='#/sessions' className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
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
                )
                break
            case "parent":


                // <Routes>
                //     {patientListData.map((item) => {
                //             let data = item.data()
                //             return (
                //                 <Route path={data.id.toString() + '/*'}
                //                        element={<PatientDetails details={data}/>}/>)
                //         }
                //     )}
                // </Routes>

                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey='#/sessions'>
                        <Nav.Item>
                            <Link to={'/sessions'} className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">תרגילים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">התקשרות</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">מסמכים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4">API</Nav.Link>
                        </Nav.Item>
                    </Nav>
                )
                break
            case "therapist":

                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey="#/sessions">
                        <Nav.Item>
                            <Link to='#/sessions' className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">תרגילים</Nav.Link>
                            {/*<Link to={'toko'} className="list-group-item list-group-item-action">sdfasfsd</Link>*/}
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">התקשרות</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">מסמכים</Nav.Link>
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
    },[])

    return(tabsComponent)
}
export default TabsBanner