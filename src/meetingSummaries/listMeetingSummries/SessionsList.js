import {Button, Collapse, Form, Row, Col, Container, ButtonGroup, Grid, Nav, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState, useCallback, useContext} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {auth, db} from "../../firebase";
import {collection, getDocs, onSnapshot, orderBy, query} from "firebase/firestore";

function SessionsList({patientId, therapistId=null, type}){
    const [sessionsData, setSessionsData] = useState([])
    const [open, setOpen] = useState(false);
    useEffect(async () => {
        console.log('useEffect')
        let q
        let therapistIDForSession = (() => {
            if (type === 'parent')
                return therapistId
            return auth.currentUser.uid
        })()
        q = query(collection(db, "patients/" + patientId + "/therapists/" + therapistIDForSession + "/sessions"), orderBy("date", "desc"))
        if (type === 'parent') {
            console.log('allDetailsMeetings222')

            const sessions = []
            getDocs(q).then((querySnapshot)=>{
                querySnapshot.forEach((doc) => {
                    sessions.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.sessionsData().client === id){
                    //
                    // }
                    setSessionsData(sessions)

                });
            })

        }
        else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let sessions=[]
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        sessions.push({...doc.data(),id:doc.id})

                    ))
                    setSessionsData(sessions)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!',error)
                })
        }

    },[])
    return(
        <div>
            <h3>RonliToko</h3>
            {

            sessionsData.map((s)=>(
                <>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    {s.date.toDate().toUTCString() + s.title}
                </Button>


                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            {s.date.toDate().toUTCString()}
                            {s.title}
                            {s.summary}
                        </div>
                    </Collapse>
                </>
                ))

            }

        {/*    return (<Link>*/}

        {/*</Link>)*/}

        </div>
    )
}
export default SessionsList