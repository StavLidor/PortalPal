
import React from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";

export default function Secretary({findUser,new_user,new_patients}){
    return(
        <div className="secretary">
            <h2>
                עמוד מזכירה!
            </h2>
            <LoginFrom findUser={findUser}/>
            <RegistrationFromUser new_user={new_user}/>
            <RegistrationFromPatient new_patients={new_patients}/>
        </div>

    )
}