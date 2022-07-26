import {ButtonGroup, Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Printer, Telephone,People} from 'react-bootstrap-icons';


function TabsBanner({type, currentPerson, setCurrentPage, currentPage,handlePrint,setCurrentPerson}) {

    const [tabsComponent, setTabsComponent] = useState(<h3>משהו השתבש...</h3>)

    useEffect(() => {
        switch (type) {
            case "admin":
                setTabsComponent(
                    <Nav justify variant="tabs" defaultActiveKey={currentPerson + '/sessions'}>

                        <Nav.Item>
                            <Button as={Link} id='aq-button' to={'/students'} onClick={() => {
                                setCurrentPage('students')
                            }} className="list-group-item list-group-item-action">תלמידים</Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button as={Link} id='aq-button' to={'/employees'} onClick={() => {
                                setCurrentPage('employees')
                            }} className="list-group-item list-group-item-action">עובדים</Button>
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
                        <Button id='top-menu-button' variant='primary' onClick={handlePrint}
                                 className="btn-secondary rounded-3 list-group-item list-group-item-action v">
                            <Printer/>
                        </Button>
                        <Button id='top-menu-button' as={Link} title='אודות' variant='primary' to={'AboutUs'} onClick={() => {
                            setCurrentPage('AboutUs')
                            setCurrentPerson('')
                        }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
                            <People/>
                        </Button>


                        <Button id='top-menu-button' as={Link} to={'ContactUs'} title='צרו קשר' onClick={() => {
                            setCurrentPage('ContactUs')
                            setCurrentPerson('')
                        }} className="btn-secondary rounded-3 list-group-item list-group-item-action v">
                            <Telephone/>
                        </Button>
                    </ButtonGroup>
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