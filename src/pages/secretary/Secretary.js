
import React from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";

export default function Secretary({signUser,new_user,new_patients}){
    return(
        <div className="secretary">
            <h2>
                עמוד מזכירה!
            </h2>
            <LoginFrom signUser={signUser}/>
            <RegistrationFromUser new_user={new_user}/>
            <RegistrationFromPatient new_patients={new_patients}/>
        </div>

    )
}