
import React, {useEffect, useState} from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";
import {newUser,newPatients} from "../../pepole/users/user";
import Home from "../home/Home";
import {signUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {auth,details_users} from "../../firebase";
import UpdatePatient from "../update/UpdatePatient";
// import {details_users} from "../../firebase"

export default function Secretary({data}){
    console.log(data)

    return(
        <div className="secretary">
            <div>
                <h2>
                    עמוד מזכירה!
                </h2>
                {/*<RegistrationFromUser new_user={newUser}/>*/}
                <UpdatePatient data={data}/>
                <RegistrationFromPatient new_patients={newPatients}/>
            </div>
        </div>

    )
}