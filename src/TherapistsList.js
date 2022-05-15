import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "./firebase";
import firebase from "firebase/compat/app";
import styles from "./pages/home/HomePage.CSS"

function TherapistsList({
                            details,
                            setCurrentTherapist,
                            currentPage,
                            setActiveTherapistListData,
                            setNotActiveTherapistListData,
                            currentPerson,
                            type,
                            institute
                        }) {
    console.log("in therapist!!!!!!!!")
    const [activeTherapistsList, setActiveTherapistsList] = useState([])
    const [notActiveTherapistsList, setNotActiveTherapistList] = useState([])

    console.log('therapistLIstt')
    //console.log(talkersIds)
    useEffect(async () => {

        console.log('TYPEE', type)
        if (type === 'parent') {
            const collectionRef = query(collection(db, "patients/" + details.id + "/therapists"),
                where('institute', '==', institute))
            if (institute === 'external') {
                onSnapshot(
                    collectionRef,
                    (snapshot) => {
                        console.log('INNNNN', snapshot.docs[0])
                        getData(snapshot)

                    })
            } else {
                getDocs(collectionRef).then((d) => {
                    getData(d)
                })
            }
        } else {
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
                if ((type === "therapist" && doc.data().active) || type === "parent") {
                    therapistIds.push(doc.id)
                    dict[doc.id] = {
                        institute: doc.data().institute, connection: doc.data().connection,
                        active: doc.data().active
                    }
                }

            }
        });
        console.log("therapistIds: ", therapistIds)
        console.log("therapistIds.length: ", therapistIds.length)
        if (therapistIds.length > 0) {
            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', therapistIds)
            )
            getDocs(
                unsubscribe).then((querySnapshot) => {

                let activeTherapists = []
                let notActiveTherapists = []
                querySnapshot.forEach((doc) => {
                    if (dict[doc.id].active)
                        // console.log(doc)
                    {
                        activeTherapists.push({
                            id: doc.id,
                            firstName: doc.data().firstName, lastName: doc.data().lastName,
                            institute: dict[doc.id].institute, connection: dict[doc.id].connection,
                            // active: (() => {
                            //     if (dict[doc.id].active)
                            //         return 'פעיל'
                            //     return 'לא פעיל'
                            // })()
                        })
                    } else {
                        notActiveTherapists.push({
                            id: doc.id,
                            firstName: doc.data().firstName, lastName: doc.data().lastName,
                            institute: dict[doc.id].institute, connection: dict[doc.id].connection,
                            // active: (() => {
                            //     if (dict[doc.id].active)
                            //         return 'פעיל'
                            //     return 'לא פעיל'
                            // })()
                        })
                    }
                    // console.log()
                })
                setActiveTherapistsList(activeTherapists)
                console.log("activeTherapists", activeTherapists)
                setActiveTherapistListData(activeTherapists)
                setNotActiveTherapistList(notActiveTherapists)
                setNotActiveTherapistListData(notActiveTherapists)
            })
        }

    }
    const showList = (list, isActive) => {
        let path = ''
        let showInstitute = ''
        return (list.map((item, index) => {
            let data = item
            if (type === 'parent') {
                path = isActive.toString() + '/' + index.toString() + '/' + currentPage.toString();
            } else {
                path = index.toString() + '/' + currentPage.toString();
                showInstitute = ', ' + institute
            }
            return (
                <div>

                    {type === 'parent' && isActive === 'active' && <Form.Label>מטפלים פעילים:</Form.Label>}
                    {type === 'parent' && isActive === 'notActive' && <Form.Label>מטפלים לא פעילים:</Form.Label>}
                    <Link to={path}
                          className="list-group-item list-group-item-action" style={{fontSize: 14}}
                          onClick={(e) => {
                              // e.preventDefault()
                              // setCurrentPerson(data.id.toString())

                              setCurrentTherapist({id: data.id, index: index.toString()})

                          }}>{data.firstName + " " + data.lastName + ','}<br/>{data.connection + showInstitute}
                    </Link>
                </div>
            )
        }))
    }
    return (
        <div>
            <Form.Label style={{fontWeight: 'bold'}}>רשימת מטפלים</Form.Label>
            <ListGroup as="ul">
                {/*{therapists}*/}
                {activeTherapistsList.length > 0 && showList(activeTherapistsList, 'active')}
                {notActiveTherapistsList.length > 0 && showList(notActiveTherapistsList, 'notActive')}
                {/*{notActiveTherapistsList !== [] && notActiveTherapistsList.map((item, index) => {*/}
                {/*        let data = item*/}

                {/*        return (*/}
                {/*            // <div>{data.firstName + " " + data.lastName+', '+data.connection}</div>*/}
                {/*            <Link to={index.toString() + '/' + currentPage.toString()}*/}
                {/*                  className="list-group-item list-group-item-action" style={{fontSize: 14}}*/}
                {/*                  onClick={(e) => {*/}
                {/*                      // e.preventDefault()*/}
                {/*                      // setCurrentPerson(data.id.toString())*/}

                {/*                      setCurrentTherapist({id: data.id, index: index.toString()})*/}

                {/*                  }}>{data.firstName + " " + data.lastName + ',' + data.active + ','}<br/>{data.connection}*/}
                {/*            </Link>*/}
                {/*        )*/}
                {/*    }*/}
                {/*)}*/}
            </ListGroup>
        </div>

    )
}

export default TherapistsList