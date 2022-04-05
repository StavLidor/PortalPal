
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Patient from "../patient/Patient";
import Secretary from "../secretary/Secretary";
import ReadOnlyRow from "../../components/tableEdit/ReadOnlyRow";


export default function Home({d,type}){
    console.log(d,'home')
    return(
        // (type =='admin') ? (
        //     // <div className="home">
        //         <Secretary data={d}/>
        //     // </div>
        //     ):
        // (type =="therapist") ? (
        //         // <div className="home">
        //             <Secretary data={d}/>
        //         // </div>
        //     ):
        // (type =="teacher") ? (
        //         // <div className="home">
        //             <Secretary data={d}/>
        //         // </div>
        // ):
        // parents

        <div className="home">
            <div className="welcome">
                <h2>Welcome,<span>{d.name}</span></h2>

                <Topbar/>
                {(type === 'admin') ? (
                    // <div className="home">
                    <Secretary data={d}/>
                    // </div>
                ) :
                    <div className="container">

                        <div className="containerLeft">

                        </div>
                        <div className="containerRight">
                            <Sidebar type={type} arr_data={d.patients}/>
                        </div>





                    </div>
                }


            </div>
        </div>

    )
}