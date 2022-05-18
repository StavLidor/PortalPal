import {Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link} from "react-router-dom";
import {isClick} from "../../useFunction"


function TabsBanner({type, currentPerson, setCurrentPage, currentPage}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)
    const [selectedTab, setSelectedTab] = useState(false)


    useEffect(() => {
        switch (type) {
            case "admin":
                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey={currentPerson + '/sessions'}>

                        <Nav.Item>
                            <Link to={'/students'} onClick={() => {
                                setCurrentPage('students')
                            }}
                                  active={isClick('students')} className="list-group-item list-group-item-action">תלמידים</Link>
                            {/*<Nav.Link eventKey="link-1">תלמידים</Nav.Link>*/}
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={'/employees'} onClick={() => {
                                setCurrentPage('employees')
                            }} active={isClick('employees')} className="list-group-item list-group-item-action">עובדים</Link>
                            {/*<Nav.Link eventKey="link-2">עובדים</Nav.Link>*/}
                        </Nav.Item>
                    </Nav>
                )
                break
            case "parent":
                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey={'sessions'}>
                        <Nav.Item>
                            <Link to={currentPerson + '/documentation'} onClick={() => {
                                setCurrentPage('documentation')
                            }} active={isClick('documentation')} className="list-group-item list-group-item-action">מסמכים</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={currentPerson + '/AQform'} onClick={() => {
                                setCurrentPage('AQform')
                            }} active={isClick('AQform')} className="list-group-item list-group-item-action">מילוי טופס AQ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="אפליקציות צד שלישי">
                                <NavDropdown.Item as={Link} to={currentPerson + '/AUTIDO'} onClick={() => {
                                    setCurrentPage('AUTIDO')
                                }}active={isClick('AUTIDO')}>AutiDo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={currentPerson + '/KAZABUBU'}
                                                  active={isClick('KAZABUBU')} onClick={() => {
                                    setCurrentPage('KAZABUBU')
                                }} >
                                    KAZABUBU
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                )
                break
            case "therapist":

                setTabsComponent(
                    <Nav justify variant="tabs"
                         defaultActiveKey={'/#/' + currentPerson + '/sessions'}>
                        <Nav.Item>
                            <Nav.Link as={Link} to={currentPerson + '/documentation'} onClick={() => {
                                setCurrentPage('documentation')
                            }}
                                      active={isClick('documentation')}
                            >מסמכים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to={currentPerson + '/AQform'} onClick={() => {
                                setCurrentPage('AQform')
                            }}
                                      active={isClick('AQform')}>מילוי טופס AQ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <NavDropdown title="אפליקציות צד שלישי">
                                <NavDropdown.Item as={Link} active={isClick('AQform')} to={currentPerson + '/AUTIDO'} onClick={() => {
                                    setCurrentPage('AUTIDO')
                                }}>AutiDo</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={currentPerson + '/KAZABUBU'} onClick={() => {
                                    setCurrentPage('KAZABUBU')
                                }} active={isClick('AQform')}>
                                    KAZABUBU
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                )
                break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    }, [currentPerson,currentPage])

    return (tabsComponent)
}

export default TabsBanner