import "./featuredInfo.css"
import React from "react";
import ListMeeting from "../../meetingSummaries/listMeetingSummries/ListMeeting"
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Chats from "../chats/Chats";
import {auth, connections} from "../../firebase"
import Code from  "../code/Code"
// import {Container} from "@mui/material";

export default function FeaturedInfo({details,type}){
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

                        <Routes>
                            <Route path={"meetings/*"} element={<ListMeeting id={details.id} type={type}  />} />

                        </Routes>
                        &nbsp;
                        <ul className="featuredListItem">
                            תרגילים
                            &nbsp;

                        </ul>
                        &nbsp;
                        <Link to={"chats/*"} className="link">
                        <ul className="featuredListItem">
                            התקשורת

                            &nbsp;

                        </ul>
                        </Link>
                        {/*{type =='parent' &&*/}
                        {/*    <>*/}
                        {/*    <Link to={"code/*"} className="link">*/}
                        {/*        <ul className="featuredListItem">*/}
                        {/*            קוד עבור מטפל חדש*/}

                        {/*            &nbsp;*/}

                        {/*        </ul>*/}
                        {/*    </Link>*/}
                        {/*    <Routes>*/}
                        {/*        <Route path={"code/*"} element={<Code/>} />*/}
                        {/*    </Routes>*/}
                        {/*    </>*/}

                        {/*}*/}
                    </ul>

                    <Routes>
                    <Route path={"chats/*"} element={<Chats patient={details.id} userId={auth.currentUser.uid} talkersIds={connections(details)}  />} />
                    </Routes>
{/*                     <Routes> */}
{/*                     <Route path={"/"+id +"/meetings/*"} element={<ListMeeting id={id} arr_data={[ */}
{/*                     {date:"03/02/2022 12:00 AM",summaries:"123"}]} />} /> */}
{/*                     </Routes> */}
                    {/*sidebar*/}
                </div>
            </div>
            featuredInfo
        </div>
    )
}