import "./featuredInfo.css"
import React from "react";
import ListMeeting from "../../meetingSummaries/listMeetingSummries/ListMeeting"
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Chats from "../chats/Chats";
import {auth, connections, getUserConnections} from "../../firebase"
import Code from  "../code/Code"
import ListTherapists from "../../meetingSummaries/listTherapists/ListTherapists";
import Exercises from "../exercises/Exercises";
import Exercise from "../exercises/Exercise";
import ViewExercise from "../exercises/ViewExercise";
// import {Container} from "@mui/material";

export default function FeaturedInfo({details,type}){
    console.log('FeaturedInfo',details)
    return(
        <div className="featured">
            <div className="featuredWrapper">
                <div className="topLeft">


                </div>
                <div className='featuredMenu'>
                    <h1>רשימת אפליקציות</h1>

                    <ul className="featuredList">

                        <ul className="featuredListItem">
                            אוטידו
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            נגינה יצרתית
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            עודידו
                            &nbsp;

                        </ul>
                    </ul>
                    <h1>טיפול אישי</h1>
                    <ul className="featuredList">
                        <Link to={"meetings/*"} className="link">
                        <ul className="featuredListItem">
                            סיכומי מפגשים
                            &nbsp;

                        </ul>
                        </Link>


                        &nbsp;
                        <Link to={"exercises/*"} className="link">
                        <ul className="featuredListItem">
                            תרגילים
                            &nbsp;

                        </ul>
                        </Link>
                        &nbsp;
                        <Routes>
                            <Route path={"exercises/*"} element={(()=>{
                                if(type === 'parent')
                                    return <ListTherapists patientDetails={details} type={type}
                                                           f={
                                                               ((patientId,userId)=>{
                                                                    return <Exercises patient={patientId} user={userId} type={type} />
                                                               })
                                                           }  />
                                return  <Exercises patient={details.id} user={auth.currentUser.uid} type={type}/>
                            })()} />
                        </Routes>
                        <Link to={"chats/*"} className="link">
                        <ul className="featuredListItem">
                            התקשורת

                            &nbsp;

                        </ul>

                        </Link>
                    </ul>

                    <Routes>
                    <Route path={"chats/*"} element={<Chats patient={details.id} userId={auth.currentUser.uid} talkersIds={getUserConnections(details)}
                                                            details={details}/>} />
                    </Routes>
                    {type !== 'parent' &&
                        <Routes>

                            <Route path={"meetings/*"} element={<ListMeeting id={details.id} type={type}

                            />} />

                        </Routes>}
                    {type === 'parent' &&
                        <Routes>

                            <Route path={"meetings/*"} element={<ListTherapists patientDetails={details} type={type}
                                                                                f={
                                                                                    ((patientId,userId)=>{
                                                                                        return <ListMeeting id={patientId} type={type}
                                                                                                            therapistId={userId}/>
                                                                                    })
                                                                                }/>} />

                        </Routes>}
                </div>
            </div>
            featuredInfo
        </div>
    )
}