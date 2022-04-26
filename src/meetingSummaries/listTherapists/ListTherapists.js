import react,{useEffect,useState,useRef} from "react"
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import React from "react";
import firebase from "firebase/compat/app"
import {db, Therapists} from "../../firebase";
import ListMeeting from "../listMeetingSummries/ListMeeting";
import {collection, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
export default function ListTherapists({patientDetails,type,f}){
    const [therapists,setTherapists]=useState([])
    //console.log(talkersIds)
    useEffect( () => {

        let therapistIds=[]
        let dict={}
        for (const [key, value] of Object.entries(patientDetails.institutes)) {
            value.map(async (id) => {
                //let data = await getDocUser(p)

                // usersTherapists.push({
                //     id: p, firstName: data.firstName, lastName: data.lastName,
                //     connection: data.jobs, institute: key
                // })
                dict[id]=key
                therapistIds.push(id)
            })
        }
        if(therapistIds.length >0){
            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(),'in',therapistIds)


            )
            return onSnapshot(
                unsubscribe,
                (querySnapshot) => {
                    let data=[]
                    querySnapshot.forEach((doc) => (
                        // console.log(doc)

                        data.push({id: doc.id, firstName: doc.data().firstName, lastName: doc.data().lastName,
                            connection: doc.data().jobs, institute: dict[doc.id]})

                    ))
                    setTherapists(data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!',error)
                })
        }



        // const p1 = Promise.resolve(Therapists(patientDetails))
        //
        // p1.then(arr => {
        //     console.log('list Therapist', arr)
        //     if(arr.length !== 0)
        //         setTherapists(arr)
        //     console.log(arr)
        // })


    },[])
    // talkersIds {id,firstName,lastName,connection job\parents}
    // console.log('print')
    // therapists.map((t,i) => (
    //     console.log(t,i)
    // ))
    // console.log('after')
    return(
        <>
            {

                therapists.map((t,i) => (

                    <div >
                        <div className="sidebarWrapper">

                            <div className="topLeft">


                            </div>

                            <div className='sidebarMenu'>



                                <ul className="sidebarList">
                                    <Link to={i.toString()+"/*"} className="link">

                                        <ul className="sidebarListItem">
                                            {console.log(t)}
                                            {t.firstName +" "+t.lastName+ i}
                                            &nbsp;

                                        </ul>
                                    </Link>

                                    &nbsp;

                                </ul>
                                <Routes>
                                    <Route path={i.toString()+"/*"} element={ /*<ListMeeting id={patientDetails.id} type={type}
                                    therapistId={t.id})/>*/f(patientDetails.id,t.id)}/>
                                </Routes>
                            </div>

                        </div>

                    </div>

                ))

            }
        </>
    )


}