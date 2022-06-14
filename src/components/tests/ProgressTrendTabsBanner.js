import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {InfoCircle} from "react-bootstrap-icons";


import {isClick} from "../../useFunction";

function ProgressTrendTabsBanner({type, currentPerson, setCurrentPage, currentPage}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)

    useEffect(() => {
        switch (type) {
            case "therapist":
                setTabsComponent(
                    <Row className='align-items-center'>
                        <Container  style={{width: '90%'}}>
                            <Nav fill variant="pills" defaultActiveKey={'interpersonalConnection'}
                                 className='gap-4'>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='interpersonalConnection'
                                              id='inner-top-menu-button'
                                              onClick={() => {
                                                  setCurrentPage('ProgressTrend/interpersonalConnection')
                                              }} active={isClick('interpersonalConnection')}
                                              className="list-group-item list-group-item-action border">קשר בין
                                        אישי</Nav.Link>
                                </Nav.Item>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='groupDiscourse'
                                              id='inner-top-menu-button'
                                              onClick={() => {
                                                  setCurrentPage('ProgressTrend/groupDiscourse')
                                              }} active={isClick('groupDiscourse')}
                                              className="list-group-item list-group-item-action border">שיח
                                        קבוצתי</Nav.Link>
                                </Nav.Item>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='academic'
                                              id='inner-top-menu-button'
                                              onClick={() => {
                                                  setCurrentPage('ProgressTrend/academic')
                                              }} active={isClick('academic')}
                                              className="list-group-item list-group-item-action border">
                                        אקדמי
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='KeepingEyeContact'
                                              id='inner-top-menu-button'
                                              onClick={() => {
                                                  setCurrentPage('ProgressTrend/KeepingEyeContact')
                                              }} active={isClick('KeepingEyeContact')}
                                              className="list-group-item list-group-item-action border">
                                        שמירת קשר עין
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item id='inner-top-menu-button'>
                                    <Nav.Link as={Link} to='plots'
                                              id='inner-top-menu-button'
                                              onClick={() => {
                                                  setCurrentPage('ProgressTrend/plots')
                                              }} active={isClick('plots')}
                                              className="list-group-item list-group-item-action border">
                                        הכל
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Container>
                        <InfoCircle id='info-button' style={{width:'5%',height: '5%'}}/>
                    </Row>
                )
                break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    }, [currentPerson, currentPage])
    return <div className='p-4'>{tabsComponent}</div>
}

export default ProgressTrendTabsBanner