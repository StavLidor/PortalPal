
import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {db} from "./firebase";
import firebase from "firebase/compat/app";

function TherapistsList({details,setCurrentTherapist,currentPage,setTherapistListData, currentPerson}){
    console.log("in therapist!!!!!!!!")
    const [therapists,setTherapists]=useState([])

    console.log('therapistLIstt')
    //console.log(talkersIds)
    useEffect( async () => {

        let dict = {}
        const collectionRef = query(collection(db, "patients/" + details.id + "/therapists"))
        // const querySnapshot = await getDocs(docRef)
        getDocs(collectionRef).then((d) => {
            const therapistIds = []

            d.forEach((doc) => {
                // console.log('therapistLIstt',doc.data())
                therapistIds.push(doc.id)
                dict[doc.id] = {institute: doc.data().institute, connection: doc.data().connection}
            });
            if (therapistIds.length > 0) {
                const unsubscribe = query(collection(db, "users"),
                    where(firebase.firestore.FieldPath.documentId(), 'in', therapistIds)
                )
                getDocs(
                    unsubscribe).then((querySnapshot)=>{

                    let data = []
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)
                        data.push({id: doc.id,
                            firstName: doc.data().firstName, lastName: doc.data().lastName,
                            /*institute: dict[doc.id].institute,*/ connection: dict[doc.id].connection
                        })
                        // console.log()
                    ))
                    setTherapists(data)
                    setTherapistListData(data)
                    console.log("my data: " , data)
                })
            }

        })},[])
    return(
        <div>
            <Form.Label style={{fontWeight:'bold'}}>רשימת מטפלים</Form.Label>
            <ListGroup as="ul">
                {/*{therapists}*/}
                {therapists.map((item, index) =>{
                    let data = item
                    console.log("data to show : ", data)
                    // <ListGroup.Item style={{backgroundColor: "beige"}}
                    //                 as="li">{item.data().firstName + " " + item.data().lastName}</ListGroup.Item>
                    //  return(<Link to={'/#/' + data.id.toString() + '/' + currentPage} className="list-group-item list-group-item-action" onClick={(e)=> {
                    return(
                        // <div>{data.firstName + " " + data.lastName+', '+data.connection}</div>
                        <Link to={index.toString()} className="list-group-item list-group-item-action" onClick={(e)=> {
                        // e.preventDefault()
                        // setCurrentPerson(data.id.toString())
                            setCurrentTherapist({id:data.id, index:index.toString()})

                    }}>{data.firstName + " " + data.lastName+', '+data.connection}</Link>
                    )}
                )}
            </ListGroup>
        </div>

    )
}
export default TherapistsList