import react,{useEffect,useState,useRef} from "react"
import {Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import React from "react";
import Chat from "./Chat";
export default function Chats({patient,userId,talkersIds}){
    const [talkers,setTalkers]=useState([])
    //console.log(talkersIds)

    let count =0
    useEffect(()=>{
        const p1 = Promise.resolve(talkersIds)
        p1.then(arr=> {
            setTalkers(arr)
            console.log(arr)
        })


    },[])
    // talkersIds {id,firstName,lastName,connection job\parents}
    return(
        <>
        {

            talkers.map((t,i) => (

                <div >
                    <div className="sidebarWrapper">

                        <div className="topLeft">


                        </div>

                        <div className='sidebarMenu'>



                            <ul className="sidebarList">
                                <Link to={i.toString()} className="link">

                                    <ul className="sidebarListItem">
                                        {t.firstName +" "+t.lastName+ i}
                                        &nbsp;

                                    </ul>
                                </Link>

                                &nbsp;

                            </ul>
                            <Routes>
                                <Route path={i.toString()} element={ <Chat userUid1={userId} userUid2={t.id}
                                                                                   patient={patient}/>}/>
                            </Routes>
                        </div>

                    </div>

                </div>

            ))

        }
        </>
    )


}