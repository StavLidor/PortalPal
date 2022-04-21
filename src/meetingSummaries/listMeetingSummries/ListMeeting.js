
import {LineStyle} from '@mui/icons-material';
import "./listMeeting.css"
// import Patient from "./pages/patient/Patient"
import React,{useState,useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {allMeetingOf, removeMeeting} from "../database/Database";
import ViewMeetingSummaries from "../viewMeetingSummaries/ViewMeetingSummaries"


export default function ListMeeting({id,type}){
    console.log('ListMeeting',type)
    const [data, setData] = useState([])
    useEffect(()=>{
        console.log('useEffect')
        allMeetingOf(id,type).then(arr => {
            console.log('then',arr)
            setData(arr)
        })

    },[])
    // const allMeetings =async ()=>{
    //
    // }
    //  console.log('ListMeeting')
     // const submitNewMeeting=e=>{
     //        e.preventDefault();
     //        // new_patients(detailsPatients);
     //        // Login(details);
     //    }
    function removeMeeting (id){
        const newData = [...data]
        const index = data.findIndex((d) => d.idDoc === id)
        newData.splice(index, 1)
        setData(newData)
    }
    function addMeeting (details) {
        const newData = [...data]
        newData.push(details)
        setData(newData)
    }
    function updateMeeting (details){
        const newData = [...data]
        const index = data.findIndex((d) => d.idDoc === details.idDoc)
        newData[index]= details
        setData(newData)
    }
    return(
        <div className='sidebar'>
             {/*<form onSubmit={submitNewMeeting} >*/}
             {/*<input type="submit" name="add" value="הוספת פגישה חדשה"/>*/}
             {/*</form>*/}
            {type!=='parent' &&
                <>
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
                        <Route path={ "newMeeting"} element={<ViewMeetingSummaries client_id={id} last_data={{date:"",summary:""}} addMeeting ={addMeeting} />} />
                    </Routes>
                </>

            }


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
                                         <Route path={p.idDoc} element={<ViewMeetingSummaries client_id={id} last_data={p}
                                                                                              addMeeting={addMeeting}
                                                                                              removeMeetingView={removeMeeting}
                                                                                              updateMeetingView={updateMeeting}/>} />
                                     </Routes>
                                </div>
                        </div>

                    </div>

                ))
            }


        </div>
    )
}