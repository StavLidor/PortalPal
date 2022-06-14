import {Button, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {getDate} from "date-fns";
import {collection, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {auth, db} from "../../firebase";
import firebase from "firebase/compat/app";
import styles from "../../pages/home/HomePage.CSS"
import {isClick} from "../../useFunction";

function ParentList({details, setCurrentParent, currentPage, setParentsListData, currentPerson,setCurrentPage}) {
    // console.log("in therapist!!!!!!!!")
    const [parents, setParents] = useState([])
    const [current, setCurrent] = useState({id: "", index: ""})
    const [reload, setReload] = useState(true)


    // console.log('therapistLIstt')
    //console.log(talkersIds)
    useEffect(async () => {
        const pathSpilt = window.location.pathname.split("/")
        let index=''
        if(pathSpilt.length > 2 && pathSpilt[2] === 'parent'){
            if(pathSpilt.length>3){
                index=pathSpilt[3]
                if (isNaN(parseInt(index))){
                    index='0'
                }
            }
            else{
                index='0'
            }
        }
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
                    setReload(false)
                    setParents(data)
                    setParentsListData(data)
                    if(index!=='' && data.length>parseInt(index)){
                        const dict={id: data[parseInt(index)].id, index: index}
                        setCurrentParent(dict)
                        setCurrent(dict)
                    }
                    // console.log("my data: ", data)
                })
            }

        }
        , [])

    return (
        <div>
            {reload &&  <Row><Form.Label style={{fontWeight: 'bold'}} >טוען...</Form.Label></Row>}
            <Row><Form.Label style={{fontWeight: 'bold'}}>צאט עם הורי מטופל</Form.Label></Row>
                {parents.map((item, index) => {
                        let data = item

                        return (
                            // <div>{data.firstName + " " + data.lastName+', '+data.connection}</div>

                            <Button as={Link} to={'parent' + '/' + index.toString() + '/' /*+ currentPage.toString()*/}
                                    active={isClick('parent') && current.id === data.id}
                                    className="list-group-item list-group-item-action mb-1"
                                    style={{backgroundColor:'transparent',border:'transparent'}}
                                    id='therapistList-button'
                                  onClick={(e) => {
                                      // e.preventDefault()
                                      // setCurrentPerson(data.id.toString())

                                      setCurrentParent({id: data.id, index: index.toString()})
                                      setCurrent({id: data.id, index: index.toString()})
                                      setCurrentPage('parent')

                                  }}>{data.firstName + " " + data.lastName}</Button>
                        )
                    }
                )}
        </div>

    )
}

export default ParentList