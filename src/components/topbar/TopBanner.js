import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";

function TopBanner(){
    return(
        <Nav justify variant="tabs" defaultActiveKey="#/sessions">
        <Nav.Item>
            <Link to='#/sessions' className="list-group-item list-group-item-action">סיכומי טיפולים</Link>
            {/*<Nav.Link to="/home">Active</Nav.Link>*/}
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2">Disabled</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-3">API</Nav.Link>
        </Nav.Item>
    </Nav>
    )
}
export default TopBanner