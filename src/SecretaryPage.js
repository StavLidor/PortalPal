import React, {useEffect, useState} from "react";
// import LoginFrom from "../../components/login/LoginFrom";
// import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
// import RegistrationFromUser from "../../components/registration/RegistrationFromUser";
// import {newUser, newPatients} from "../../pepole/users/user";
// import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
// import Home from "../home/Home";
// import {signUser} from "../../pepole/users/user";
// import {signOut} from "firebase/auth";
// import {
//     auth,
//     updateIDDoc,
//     updatesPatients,
//     deletePatientFromInstitute,
//     addUserFromAdmin,
//     updatesUser,
//     deleteTherapistFromInstitute,
//     findUserByEmail,
//     updatesCurrentUser,
//     detailsPatient,
//     updateDocUser, addConnectionPatientToTherapist, removeConnectionPatientToTherapist, detailsWorks, db
// } from "../../firebase";
// import TableEdit from "../../components/tableEdit/TableEdit";
// import Patient from "../patient/Patient";
// import {collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
// import firebase from "firebase/compat/app";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import TabsBanner from "./components/topbar/TabsBanner";
import {signOutCurrentUser} from "./firebase";
import {Link, Route, Routes} from "react-router-dom";
import PatientDetails from "./components/sidebar/PatientDetails";

// import {details_users} from "../../firebase"


function SecretaryPage({userDetails}) {

    async function onLogout() {
        await signOutCurrentUser()
    }

    return (
        <div>
            <Row className="border border-secondary rounded" style={{minHeight: 400}}>
                <Routes>
                    <Route path="students"
                           element={<h2>התלמידים שלנו</h2>}/>
                </Routes>

                <Routes>
                    <Route path="employees"
                           element={<h2>העובדים שלנו</h2>}/>
                </Routes>

            </Row>
        </div>
    )

}

export default SecretaryPage
