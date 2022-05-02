import React, {useEffect, useState} from "react"
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query, updateDoc,
    where
} from "firebase/firestore";
import {auth, db, updateIDDoc} from "../../firebase";
import Message from "../chats/message";
import Exercise from "./Exercise";
import Datetime from "react-datetime";
import firebase from "firebase/compat/app"
import {Route, Routes, Link} from "react-router-dom";
import ViewMeetingSummaries from "../../meetingSummaries/viewMeetingSummaries/ViewMeetingSummaries";
import ViewExercise from "./ViewExercise";
import {Button, Collapse} from "react-bootstrap";

function PatientExecises({patient, therapist, type}) {

    const [exercisesData, setExercisesData] = useState([])
    const [open, setOpen] = useState(false);
    const [newExercise, setNewExercise] = useState({
        until: '',
        description: '',
        patient: patient,
        place: '',
        therapist: therapist
    })
    const [addExercise, setAddExercise] = useState(false)
    useEffect(async () => {
        //console.log('useEffect')
        const q = query(collection(db, "patients/" + patient + "/therapists/" + therapist + "/exercises"), orderBy("createdAt", "desc"))
        if (type === 'parent') {
            console.log('allDetailsExercises222')

            const arr = []
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    arr.push({...doc.data(), id: doc.id})
                    console.log('id', doc.id)
                    // if (doc.data().client === id){
                    //
                    // }
                    console.log(arr)
                    setExercisesData(arr)

                });
            })
        } else {
            return onSnapshot(
                q,
                (querySnapshot) => {
                    let data = []
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        data.push({...doc.data(), id: doc.id})

                    ))
                    setExercisesData(data)
                    console.log(data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
        }
    }, [])


    const handleOnSubmit = async e => {
        e.preventDefault()
        newExercise.until = firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
        setAddExercise(false)
        await addDoc(collection(db, "patients/" + patient + "/therapists/" + therapist + '/exercises'), {
            ...newExercise,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        // const docRef = await addDoc(collection(db, "exercises"),
        //     { ...newExercise,createdAt:firebase.firestore.FieldValue.serverTimestamp()})

    }
    const deleteHandle = async docId => {
        await deleteDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId))
        // await deleteDoc(doc(db, "exercises", docId))
    }
    const updateHandle = async (docId, data) => {
        // await updateIDDoc(docId, "exercises", data)
        await updateDoc(doc(collection(db, "patients"), patient, "therapists", therapist, 'exercises',
            docId), data)
    }


    return (
        <div>
            <h3>תירגוליישן</h3>
            {
                exercisesData.map((e,i) => (

                <>
                <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                >
            {e.createdAt.toDate().toUTCString() + e.place}
                </Button>


                <Collapse in={open}>
                <div id="example-collapse-text">
            {e.createdAt.toDate().toUTCString()}
            {e.until.toDate().toUTCString()}
            {e.description}
            {e.place}
                </div>
                </Collapse>
                </>
                ))
            }
        </div>
    )

}

export default PatientExecises