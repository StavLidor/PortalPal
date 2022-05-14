import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "./firebase";
import firebase from "firebase/compat/app";
import styles from "./pages/home/HomePage.CSS"

function TherapistsList({details, setCurrentTherapist, currentPage, setTherapistListData, currentPerson,type,institute}) {
    console.log("in therapist!!!!!!!!")
    const [therapists, setTherapists] = useState([])

    console.log('therapistLIstt')
    //console.log(talkersIds)
    useEffect(async () => {

        console.log('TYPEE',type)
        if(type ==='parent'){
            const collectionRef = query(collection(db, "patients/" + details.id + "/therapists"),
                where('institute','==',institute))
            if(institute === 'external'){
                onSnapshot(
                    collectionRef,
                    (snapshot) => {
                        console.log('INNNNN',snapshot.docs[0])
                        getData(snapshot)

                    })
            }
            else {
                getDocs(collectionRef).then((d) => {
                    getData(d)
                })
            }
        }
        else{
            const collectionRef = query(collection(db, "patients/" + details.id + "/therapists"))

            // const querySnapshot = await getDocs(docRef)

            getDocs(collectionRef).then((d) => {
                getData(d)
            })
        }

    }, [])
    const getData = (d) => {
        const therapistIds = []
        let dict = {}

        d.forEach((doc) => {
            if (doc.id !== auth.currentUser.uid) {
                // console.log('therapistLIstt',doc.data())
                therapistIds.push(doc.id)
                dict[doc.id] = {institute: doc.data().institute, connection: doc.data().connection,
                active:doc.data().active}
            }
        });
        if (therapistIds.length > 0) {
            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', therapistIds)
            )
            getDocs(
                unsubscribe).then((querySnapshot) => {

                let data = []
                querySnapshot.forEach((doc) => (
                    // console.log(doc)
                    data.push({
                        id: doc.id,
                        firstName: doc.data().firstName, lastName: doc.data().lastName,
                        institute: dict[doc.id].institute, connection: dict[doc.id].connection,
                        active:(()=>{
                            if(dict[doc.id].active)
                                return 'פעיל'
                            return 'לא פעיל'
                        })()
                    })
                    // console.log()
                ))
                setTherapists(data)
                setTherapistListData(data)
                console.log("my data: ", data)
            })
        }

    }
    return (
        <div>
            <Form.Label style={{fontWeight: 'bold'}}>רשימת מטפלים</Form.Label>
            <ListGroup as="ul">
                {/*{therapists}*/}
                {therapists.map((item, index) => {
                        let data = item

                        return (
                            // <div>{data.firstName + " " + data.lastName+', '+data.connection}</div>
                            <Link to={index.toString() + '/' + currentPage.toString()}
                                  className="list-group-item list-group-item-action" style={{fontSize: 14}}
                                  onClick={(e) => {
                                      // e.preventDefault()
                                      // setCurrentPerson(data.id.toString())

                                      setCurrentTherapist({id: data.id, index: index.toString()})

                                  }}>{data.firstName + " " + data.lastName + ','+data.active +','}<br/>{data.connection}</Link>
                        )
                    }
                )}
            </ListGroup>
        </div>

    )
}

export default TherapistsList