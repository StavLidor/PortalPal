import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, matchPath, Route, useNavigate, useLocation, Routes} from "react-router-dom";

import {isClick} from "./useFunction";

function ProgressTrendTabsBanner({type, currentPerson, setCurrentPage}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)


    // useEffect(()=> {
    //     console.log()
    //     setCurrentPath(currentPerson)
    //     console.log(currentPath);
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
            case "therapist":
                setTabsComponent(
                    <Container className="border border-secondary rounded">

                        <Nav fill justify variant="tabs" defaultActiveKey={'interpersonalConnection'}>

                            <Nav.Item>
                                <Nav.Link as={Link} to='interpersonalConnection' onClick={() => {
                                    setCurrentPage('ProgressTrend/interpersonalConnection')
                                }} active={isClick('interpersonalConnection')} className="list-group-item list-group-item-action">קשר בין אישי</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='groupDiscourse' onClick={() => {
                                    setCurrentPage('ProgressTrend/groupDiscourse')
                                }} active={isClick('groupDiscourse')} className="list-group-item list-group-item-action">שיח קבוצתי</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='academic' onClick={() => {
                                    setCurrentPage('ProgressTrend/academic')
                                }} active={isClick('academic')} className="list-group-item list-group-item-action">
                                    אקדמי
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='KeepingEyeContact' onClick={() => {
                                    setCurrentPage('ProgressTrend/KeepingEyeContact')
                                }} active={isClick('KeepingEyeContact')} className="list-group-item list-group-item-action">
                                    שמירת קשר עין
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to='plots' onClick={() => {
                                    setCurrentPage('ProgressTrend/plots')
                                }} active={isClick('plots')} className="list-group-item list-group-item-action">
                                    הכל
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

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
            //                             style={{borderRadius: 10}} id='sessions-side-button'>סיכומי
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
    }, [currentPerson])

    return (tabsComponent)
}

export default ProgressTrendTabsBanner