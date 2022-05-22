import {ButtonGroup, Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";


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
            case "therapist":
                setTabsComponent(
                    <ButtonGroup className='gap-2'>
                        {/*<Nav.Item>*/}
                        {/*    <Link to={currentPerson + '/documentation'} onClick={() => {*/}
                        {/*        setCurrentPage('documentation')*/}
                        {/*    }} className="list-group-item list-group-item-action">מסמכים</Link>*/}
                        {/*</Nav.Item>*/}
                        <Button  id='aq-button' as={Link} to={currentPerson + '/AQform'} onClick={() => {
                            setCurrentPage('AQform')
                        }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
                            מילוי טופס AQ
                        </Button>

                        <Button id='top-menu-button' as={Link} variant='primary' to={currentPerson + '/AQform'} onClick={() => {
                            setCurrentPage('AQform')
                        }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
                            אודות
                        </Button>

                        <Button id='top-menu-button' as={Link} to={currentPerson + '/AQform'} onClick={() => {
                            setCurrentPage('AQform')
                        }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
                            צרו קשר
                        </Button>
                        {/*<Nav.Item>*/}
                        {/*    <NavDropdown title="אפליקציות צד שלישי">*/}
                        {/*        <NavDropdown.Item as={Link} to={currentPerson + '/AUTIDO'} onClick={() => {*/}
                        {/*            setCurrentPage('AUTIDO')*/}
                        {/*        }}>AutiDo</NavDropdown.Item>*/}
                        {/*        <NavDropdown.Item as={Link} to={currentPerson + '/KAZABUBU'} onClick={() => {*/}
                        {/*            setCurrentPage('KAZABUBU')*/}
                        {/*        }}>*/}
                        {/*            KAZABUBU*/}
                        {/*        </NavDropdown.Item>*/}
                        {/*    </NavDropdown>*/}
                        {/*</Nav.Item>*/}
                    </ButtonGroup>
                )
                break
            // case "therapist":
            //
            //     setTabsComponent(
            //         <ButtonGroup className='gap-5'>
            //             <Button id='top-menu-button' as={Link} to={currentPerson + '/AQform'} onClick={() => {
            //                 setCurrentPage('AQform')
            //             }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
            //                 מילוי טופס AQ
            //             </Button>
            //             <Button id='top-menu-button' as={Link} to={currentPerson + '/AQform'} onClick={() => {
            //                 setCurrentPage('AQform')
            //             }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
            //                 אודות
            //             </Button>
            //
            //             <Button id='top-menu-button' as={Link} to={currentPerson + '/AQform'} onClick={() => {
            //                 setCurrentPage('AQform')
            //             }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
            //                 צרו קשר
            //             </Button>
            //             {/*<Nav.Item>*/}
            //             {/*    <NavDropdown title="אפליקציות צד שלישי">*/}
            //             {/*        <NavDropdown.Item as={Link} to={currentPerson + '/AUTIDO'} onClick={() => {*/}
            //             {/*            setCurrentPage('AUTIDO')*/}
            //             {/*        }}>AutiDo</NavDropdown.Item>*/}
            //             {/*        <NavDropdown.Item as={Link} to={currentPerson + '/KAZABUBU'} onClick={() => {*/}
            //             {/*            setCurrentPage('KAZABUBU')*/}
            //             {/*        }}>*/}
            //             {/*            KAZABUBU*/}
            //             {/*        </NavDropdown.Item>*/}
            //             {/*    </NavDropdown>*/}
            //             {/*</Nav.Item>*/}
            //         </ButtonGroup>
            //             {/*<Nav.Item>*/}
            //             {/*    <NavDropdown title="אפליקציות צד שלישי">*/}
            //             {/*        <NavDropdown.Item as={Link} to={currentPerson + '/AUTIDO'} onClick={() => {*/}
            //             {/*            setCurrentPage('AUTIDO')*/}
            //             {/*        }}>AutiDo</NavDropdown.Item>*/}
            //             {/*        <NavDropdown.Item as={Link} to={currentPerson + '/KAZABUBU'} onClick={() => {*/}
            //             {/*            setCurrentPage('KAZABUBU')*/}
            //             {/*        }}>*/}
            //             {/*            KAZABUBU*/}
            //             {/*        </NavDropdown.Item>*/}
            //             {/*    </NavDropdown>*/}
            //             {/*</Nav.Item>*/}
            //     )
            //     break
            default:
                setTabsComponent(<h3>משהו השתבש...</h3>)
                break
        }
    }, [currentPerson,currentPage])

    return (tabsComponent)
}

export default TabsBanner