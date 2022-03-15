
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Patient from "../patient/Patient";
import Secretary from "../secretary/Secretary";


export default function Home({d,type}){
    console.log(d,'home')
    return(
        (type =='admin') ? (
            <div className="home">
                <Secretary data={d}/>
            </div>
            ):

        <div className="home">
            <div className="welcome">
                <h2>Welcome,<span>{d.name}</span></h2>

                <Topbar/>

                <div className="container">
                    <div className="patients">

                    </div>
                    <div className="containerRight">
                        <div className="Sidebar">

                            <Router>
                                <Sidebar/>
                                <Routes>
                                    <Route path="/dana_barger" element={<Patient />} />
                                </Routes>
                            </Router>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}