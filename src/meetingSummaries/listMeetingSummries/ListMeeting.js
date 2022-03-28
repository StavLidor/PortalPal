
import {LineStyle} from '@mui/icons-material';
import "./listMeeting.css"
// import Patient from "./pages/patient/Patient"
import React,{useState,useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import  {allMeetingOf} from "../database/Database";
import ViewMeetingSummaries from "../viewMeetingSummaries/ViewMeetingSummaries"


export default function ListMeeting({id}){
    const [data, setData] = useState([])
    useEffect(()=>{
        console.log('useEffect')
        allMeetingOf(id).then(arr => {
            console.log('then',arr)
            setData(arr)
        })

    },[])
    // const allMeetings =async ()=>{
    //
    // }
     console.log('ListMeeting')
     const submitNewMeeting=e=>{
            e.preventDefault();
            // new_patients(detailsPatients);
            // Login(details);
        }
    return(
        <div className='sidebar'>
             {/*<form onSubmit={submitNewMeeting} >*/}
             {/*<input type="submit" name="add" value="הוספת פגישה חדשה"/>*/}
             {/*</form>*/}
            <ul className="sidebarList">
                <Link to={ "newMeeting"} className="link">

                    <ul className="sidebarListItem">
                        הוספה פגישה חדשה
                        &nbsp;

                    </ul>
                </Link>

                &nbsp;

            </ul>
            <Routes>
                <Route path={ "newMeeting"} element={<ViewMeetingSummaries client_id={id} last_data={{date:"",summary:""}} />} />
            </Routes>
              <h1>רשימת מפגשים</h1>
            {

                data.map((p) => (
                    <div >
                        <div className="sidebarWrapper">

                            <div className="topLeft">


                            </div>

                                <div className='sidebarMenu'>
                                    <ul className="sidebarList">
                                        <Link to={p.idDoc} className="link">

                                            <ul className="sidebarListItem">
                                                {p.date}
                                                &nbsp;

                                            </ul>
                                        </Link>

                                        &nbsp;

                                    </ul>
                                     <Routes>
                                         <Route path={p.idDoc} element={<ViewMeetingSummaries client_id={id} last_data={p} />} />
                                     </Routes>
                                </div>
                        </div>

                    </div>

                ))
            }


        </div>
    )
}