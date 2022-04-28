import "./sidebar.css"
import {LineStyle} from '@mui/icons-material';
// import Patient from "./pages/patient/Patient"
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes, useLocation} from "react-router-dom";
import Patient from "../../pages/patient/Patient";
import ListMeeting from "../../meetingSummaries/listMeetingSummries/ListMeeting"
import ViewMeetingSummaries from "../../meetingSummaries/viewMeetingSummaries/ViewMeetingSummaries"
import {db, detailsPatient} from "../../firebase";
import {collection, doc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";


export default function Sidebar({type, ids}) {
    const [arr_data, setArrData] = useState([])
    // const location = useLocation()
    // useEffect(() => {
    //     // return history.listen((location) => {
    //     //     console.log(`You changed the page to: ${location.pathname}`)
    //     // })
    // },[location])

    useEffect(() => {
        ids.map((id) => {
            const userDocRef = doc(db, 'patients', id)
            return onSnapshot(
                userDocRef,
                (snapshot) => {
                    const newContacts = [...arr_data]
                    const index = arr_data.findIndex((contact) => contact.id === id)
                    newContacts[index] = {...snapshot.data(), id: id}
                    setArrData(newContacts)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })


        })

        console.log('sidebar', ids)
        const allDetails = detailsPatient(ids)
        console.log('allDetails', ids)
        const p1 = Promise.resolve(allDetails)
        p1.then(arr => {
            console.log('ALL', arr)
            setArrData(arr)
        })

    }, [ids])
    return (
        <Router>
        <div className='sidebar'>

            {
                type === "therapist" ? (
                    <h1>רשימת מטופלים</h1>
                ) : (type === "parent") ? (
                        <h1>רשימת ילדים</h1>
                    ) :
                    <h1>רשימת תלמידים</h1>

            }
            {

                arr_data.map((p) => (
                    <div>
                        <div className="sidebarWrapper">

                            <div className="topLeft">
                            </div>

                            <div className='sidebarMenu'>


                                <ul className="sidebarList">
                                    <Link to={"/" + p.id + "/*"} className="link">

                                        <ul className="sidebarListItem">
                                            {p.firstName + " " + p.lastName}
                                            &nbsp;

                                        </ul>
                                    </Link>

                                    &nbsp;

                                </ul>
                                <Routes>
                                    <Route path={"/" + p.id + "/*"}
                                           element={<Patient details={p} type={type} /*id={p.id}*/ />}/>
                                </Routes>
                            </div>

                        </div>

                    </div>

                ))

            }


        </div>
        </Router>
    )
}