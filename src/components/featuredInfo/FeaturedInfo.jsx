import "./featuredInfo.css"
import React from "react";
import ListMeeting from "../../meetingSummaries/listMeetingSummries/ListMeeting"
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";

export default function FeaturedInfo({id}){
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
                        <Link to={"/"+id+"/"+"meetings/*"} className="link">
                        <ul className="featuredListItem">
                            סיכומי מפגשים
                            &nbsp;

                        </ul>
                        </Link>
                        &nbsp;
                        <ul className="featuredListItem">
                            תרגילים
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            התקשורת
                            &nbsp;

                        </ul>
                    </ul>
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