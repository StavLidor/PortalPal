
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Patient from "../patient/Patient";


export default function Home({user}){
    return(
        <div className="home">
            <div className="welcome">
                <h2>Welcome,<span>{user.name}</span></h2>

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