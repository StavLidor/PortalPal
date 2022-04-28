import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {db} from "../../firebase";

export let patientList =[]

function PatientList({list,setPatientListData,listTitle,setCurrentPerson,currentPage}) {

    const [listData, setListData] = useState([])
    useEffect(getListData,[])

    function getListData() {
        const queryRequest = query(collection(db, "patients"), where('id', 'in', list))
        onSnapshot(
            queryRequest,
            (snapshot) => {
                setListData(snapshot.docs)
                setPatientListData(snapshot.docs)},
            (error) => {
                // TODO: Handle errors!
                console.log('error!!', error)

            })
    }

    return (
        <div>
            <Form.Label style={{fontWeight:'bold'}}>{listTitle}</Form.Label>
            <ListGroup as="ul">
                {listData.map((item) =>{
                    let data = item.data()
                    // <ListGroup.Item style={{backgroundColor: "beige"}}
                    //                 as="li">{item.data().firstName + " " + item.data().lastName}</ListGroup.Item>
                     return(<Link to={'#/'+ data.id.toString() + '/' + currentPage} className="list-group-item list-group-item-action" onClick={(e)=> {
                         // e.preventDefault()
                         setCurrentPerson(data.id.toString())
                     }}>{data.firstName + " " + data.lastName}</Link>)}
                )}
            </ListGroup>
        </div>
    )
}

export default PatientList