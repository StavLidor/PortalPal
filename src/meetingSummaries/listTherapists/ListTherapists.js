import react,{useEffect,useState,useRef} from "react"
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import React from "react";
import {Therapists} from "../../firebase";
import ListMeeting from "../listMeetingSummries/ListMeeting";
export default function ListTherapists({patientDetails,type}){
    const [therapists,setTherapists]=useState([])
    //console.log(talkersIds)
    useEffect( () => {

        const p1 = Promise.resolve(Therapists(patientDetails))
        p1.then(arr => {
            console.log('list Therapist', arr)
            setTherapists(arr)
            console.log(arr)
        })


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
                                    <Route path={i.toString()+"/*"} element={ <ListMeeting id={patientDetails.id} type={type}
                                    therapistId={t.id}/>}/>
                                </Routes>
                            </div>

                        </div>

                    </div>

                ))

            }
        </>
    )


}