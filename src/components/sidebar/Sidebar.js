import "./sidebar.css"
import {LineStyle} from '@mui/icons-material';
// import Patient from "./pages/patient/Patient"
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes,useLocation} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import ListMeeting from "../../meetingSummaries/listMeetingSummries/ListMeeting"
import ViewMeetingSummaries from "../../meetingSummaries/viewMeetingSummaries/ViewMeetingSummaries"
import {db, detailsPatient} from "../../firebase";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";


export default function Sidebar({type,ids}){
    const [arr_data, setArrData] = useState([])
    // const location = useLocation()
    // useEffect(() => {
    //     // return history.listen((location) => {
    //     //     console.log(`You changed the page to: ${location.pathname}`)
    //     // })
    // },[location])

    useEffect(()=>{
        const p1 = Promise.resolve(ids)
        p1.then(arr => {
            console.log('ALL',arr)
            setArrData(arr)
        })

    },[])
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
            <Router>
            {

                arr_data.map((p) => (
                    <div >
                        <div className="sidebarWrapper">

                            <div className="topLeft">


                            </div>

                                <div className='sidebarMenu'>



                                    <ul className="sidebarList">
                                        <Link to={"/"+p.id+"/*"} className="link">

                                            <ul className="sidebarListItem">
                                                {p.firstName +" "+p.lastName}
                                                &nbsp;

                                            </ul>
                                        </Link>

                                        &nbsp;

                                    </ul>
                                    <Routes>
                                        <Route path={"/"+p.id+"/*"} type ={type} element={<Patient details={p} /*id={p.id}*/ />}/>
                                    </Routes>
                                </div>

                        </div>

                    </div>

                ))

            }
            </Router>



        </div>
    )
}