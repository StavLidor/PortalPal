import "./sidebar.css"
import {LineStyle} from '@mui/icons-material';
// import Patient from "./pages/patient/Patient"
import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import ListMeeting from "../../meetingSummaries/listMeetingSummries/ListMeeting"
import ViewMeetingSummaries from "../../meetingSummaries/viewMeetingSummaries/ViewMeetingSummaries"


export default function Sidebar({type,arr_data}){
    return(
        <div className='sidebar'>
        {
            type ==="therapist"?(
                <h1>רשימת מטופלים</h1>
            ): (type ==="parents")?(
                    <h1>רשימת ילדים</h1>
                ):
                <h1>רשימת תלמידים</h1>

         }
            {

                arr_data.map((p) => (
                    <div >
                        <div className="sidebarWrapper">

                            <div className="topLeft">


                            </div>
                            <Router>
                                <div className='sidebarMenu'>
{/*                                     { */}
{/*                                         type ==="therapist"?( */}
{/*                                             <h1>רשימת מטופלים</h1> */}
{/*                                         ): (type ==="parents")?( */}
{/*                                                 <h1>רשימת ילדים</h1> */}
{/*                                             ): */}
{/*                                             <h1>רשימת תלמידים</h1> */}

{/*                                     } */}


                                    <ul className="sidebarList">
                                        <Link to={"/"+p.id+"/*"} className="link">

                                            <ul className="sidebarListItem">
                                                {p.name}
                                                &nbsp;

                                            </ul>
                                        </Link>

                                        &nbsp;

                                    </ul>
                                    <Routes>
                                        <Route path={"/"+p.id+"/*"} element={<Patient id={p.id} />} />
                                        <Route path={"/"+p.id +"/meetings/*"} element={<ListMeeting id={p.id} arr_data={[
                                                            {date:"03/02/2022 12:00 AM",summaries:"123"}]} />} />
                                        <Route path={"/"+p.id+"/meetings"+"/"+"1"} element={<ViewMeetingSummaries dataMeeting={
                                                               {date:"03/02/2022 12:00 AM",summaries:"123"}} />} />
                                    </Routes>
                                </div>
                            </Router>
                        </div>

                    </div>

                ))
            }


        </div>
    )
}