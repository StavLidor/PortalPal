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
    query,
    where
} from "firebase/firestore";
import {db, updateIDDoc} from "../../firebase";
import Message from "../chats/message";
import Exercise from "./Exercise";
import Datetime from "react-datetime";
import firebase from "firebase/compat/app"
import {Route, Routes,Link} from "react-router-dom";
import ViewMeetingSummaries from "../../meetingSummaries/viewMeetingSummaries/ViewMeetingSummaries";
import ViewExercise from "./ViewExercise";
export default function Exercises({patient,user,type}){
    console.log('exercises')
    const [exercises,setExercises]=useState([])
    const [click,setClick]=useState([])
    const [newExercise,setNewExercise]=useState({until:'',description:'',patient:patient,place:'',user:user})
    const [addExercise,setAddExercise]=useState(false)
    useEffect(async () => {
        const unsubscribe = query(collection(db, "exercises"),
            where('patient','==',patient),
            where('user','==',user),orderBy("createdAt", "asc"), limit(100),

        )
        return onSnapshot(
            unsubscribe,
            (querySnapshot) => {
                let data=[]
                querySnapshot.forEach((doc) => (
                    // console.log(doc)

                    data.push({...doc.data(),id:doc.id})

                ))
                setExercises(data)
               console.log(data)
            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!',error)
            })
    },[])
    const handleOnSubmit = async e => {
        e.preventDefault()
        newExercise.until=firebase.firestore.Timestamp.fromDate(new Date(newExercise.until))
        setAddExercise(false)
        const docRef = await addDoc(collection(db, "exercises"),
            { ...newExercise,createdAt:firebase.firestore.FieldValue.serverTimestamp()})

    }
    const deleteHandle = async docId => {
        await deleteDoc(doc(db, "exercises", docId))
    }
    const updateHandle = async (docId,data) => {
        await updateIDDoc(docId, "exercises", data)
    }


    return(
        (addExercise)?(
                <form onSubmit={handleOnSubmit} >
                    <div className="form-group">
                        <label htmlFor="date">עד לתאריך:</label>
                        <Datetime value={newExercise.until} selected={newExercise.until}  onChange={d=>setNewExercise({...newExercise,until:d._d.toString()})} />
                    </div>

                    <div className="form-group" >

                        <input  value={newExercise.description} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                                onChange={e=>setNewExercise({...newExercise,description:e.target.value})}/>
                        <label htmlFor="name">תיאור: </label>
                    </div>
                    <div className="form-group" >

                        <input  value={newExercise.place} type="text"   className="summaries" name="summaries" id="Meeting summaries"
                                onChange={e=>setNewExercise({...newExercise,place:e.target.value})}/>
                        <label htmlFor="name">מיקום התרגיל: </label>
                    </div>
                    <input type="submit" value="הוסף תרגיל"/>
                </form>

            ):
        <>
            <ul>
                {exercises.map((e,i)=>(
                    <>
                    <Link to={i.toString()} className="link">
                    <li key ={e.id}>
                        {e.createdAt.toDate().toUTCString()}
                    </li>
                    </Link>
                    <Routes>
                    <Route path={ i.toString()} element={ (()=>{
                        if(type !== 'parent')
                            return <Exercise exercise={e} deleteExercise={deleteHandle} update={updateHandle}/>
                        console.log('EEEEEEEXXXXXXXXX')
                        return  <ViewExercise exercise={e}/>
                    })()

                    } />
                    </Routes>
                    </>
                ))}
            </ul>

            {type!='parent' &&<button
            type="button"
            onClick={(event) => {
                event.preventDefault()
                setAddExercise(true)
            }
            }
        >
            הוסף תרגיל
        </button>}


        </>
    )
}