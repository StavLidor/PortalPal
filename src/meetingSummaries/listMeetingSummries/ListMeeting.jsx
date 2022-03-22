
import {LineStyle} from '@mui/icons-material';
import "./listMeeting.css"
// import Patient from "./pages/patient/Patient"
import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import ViewMeetingSummaries from "../viewMeetingSummaries/ViewMeetingSummaries"


export default function ListMeeting({id,arr_data}){
     console.log('ListMeeting')
     const submitNewMeeting=e=>{
            e.preventDefault();
            // new_patients(detailsPatients);
            // Login(details);
        }
    return(
        <div className='sidebar'>
             <form onSubmit={submitNewMeeting} >
             <input type="submit" name="add" value="הוספת פגישה חדשה"/>
             </form>
              <h1>רשימת מפגשים</h1>
            {

                arr_data.map((p) => (
                    <div >
                        <div className="sidebarWrapper">

                            <div className="topLeft">


                            </div>

                                <div className='sidebarMenu'>
                                    <ul className="sidebarList">
                                        <Link to={"/"+id+"/meetings"+"/1"} className="link">

                                            <ul className="sidebarListItem">
                                                {p.date}
                                                &nbsp;

                                            </ul>
                                        </Link>

                                        &nbsp;

                                    </ul>
{/*                                     <Routes> */}
{/*                                         <Route path={"/"+id+"/meetings"+"/"+p.date} element={<ViewMeetingSummaries dataMeeting={p} />} /> */}
{/*                                     </Routes> */}
                                </div>
                        </div>

                    </div>

                ))
            }


        </div>
    )
}