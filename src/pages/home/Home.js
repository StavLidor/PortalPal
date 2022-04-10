
import React, {useState} from "react";
import Topbar from "../../components/topbar/Topbar";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Patient from "../patient/Patient";
import Secretary from "../secretary/Secretary";
import ReadOnlyRow from "../../components/tableEdit/ReadOnlyRow";
import {detailsPatient} from "../../firebase";
import Update from "../update/Update";


export default function Home({d,type,institute}){
    console.log(d,'home')
    const [data,setData]=useState(d)
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
                <h2>Welcome,<span>{d.firstName +" "+d.lastName}</span></h2>

                <Topbar/>
                {(type === 'admin') ? (
                    // <div className="home">
                    <Secretary data={d}/>
                    // </div>
                ) :
                    <div className="container">

                        <div className="containerLeft">
                            <Update details={d} setData ={setData}/>
                        </div>
                        <div className="containerRight">
                            <Sidebar type={type} ids={(()=>{
                                if(type == 'parent')
                                    return d.idsMangeParents
                                if(institute == 'external')
                                    return d.patients
                                console.log('students',d.institutes[institute])
                                return detailsPatient(d.institutes[institute])
                            })()

                            }/>
                        </div>





                    </div>
                }


            </div>
        </div>

    )
}