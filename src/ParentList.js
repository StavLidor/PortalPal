import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "./firebase";
import firebase from "firebase/compat/app";
import styles from "./pages/home/HomePage.CSS"

function ParentList({details, setCurrentParent, currentPage, setParentsListData, currentPerson}) {
    console.log("in therapist!!!!!!!!")
    const [parents, setParents] = useState([])

    console.log('therapistLIstt')
    //console.log(talkersIds)
    useEffect(async () => {

            // let dict = {}
            // const collectionRef = query(collection(db, "patients/" + details.id + ))
            // const querySnapshot = await getDocs(docRef)
            // getDocs(collectionRef).then((d) => {
            //     const therapistIds = []
            //
            //     d.forEach((doc) => {
            //         // console.log('therapistLIstt',doc.data())
            //         therapistIds.push(doc.id)
            //         dict[doc.id] = {institute: doc.data().institute, connection: doc.data().connection}
            //     });
            if (details.parents.length > 0) {
                const unsubscribe = query(collection(db, "users"),
                    where(firebase.firestore.FieldPath.documentId(), 'in', details.parents)
                )
                getDocs(
                    unsubscribe).then((querySnapshot) => {

                    let data = []
                    querySnapshot.forEach((doc) => {
                        // console.log(doc)
                        if (doc.id !== auth.currentUser.uid) {
                            data.push({
                                id: doc.id, ...doc.data()
                                // firstName: doc.data().firstName, lastName: doc.data().lastName,
                                /*institute: dict[doc.id].institute,*/
                            })
                        }
                        // console.log()
                    })
                    setParents(data)
                    setParentsListData(data)
                    console.log("my data: ", data)
                })
            }
        }
        , [])

    return (
        <div>
            <Form.Label style={{fontWeight: 'bold'}}>הורי המטופל</Form.Label>
                {parents.map((item, index) => {
                        let data = item

                        return (
                            // <div>{data.firstName + " " + data.lastName+', '+data.connection}</div>
                            <Link to={'parent' + '/' + index.toString() + '/' + currentPage.toString()}
                                  className="list-group-item list-group-item-action" style={{fontSize: 14}}
                                  onClick={(e) => {
                                      // e.preventDefault()
                                      // setCurrentPerson(data.id.toString())

                                      setCurrentParent({id: data.id, index: index.toString()})

                                  }}>{data.firstName + " " + data.lastName}</Link>
                        )
                    }
                )}
        </div>

    )
}

export default ParentList