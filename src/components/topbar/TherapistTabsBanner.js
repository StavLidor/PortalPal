import {Button, Form, Row, Col, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {removeConnectionPatientToTherapist} from "../../firebase";
import {Plus} from "react-bootstrap-icons";
import {isClick} from "../../useFunction";

function TherapistTabsBanner({therapistId, therapistInstitute, type, currentPerson, setCurrentPage, currentPage,
                                 therapistIsActive}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)



    useEffect(() => {
        switch (type) {
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
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    }, [currentPerson, currentPage])

    return (tabsComponent)
}

export default TherapistTabsBanner