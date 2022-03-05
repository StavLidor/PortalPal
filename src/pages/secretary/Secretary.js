
import React, {useEffect, useState} from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";
import Home from "../home/Home";
import {signUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";

export default function Secretary({signUser,new_user,new_patients,variant}){
    // const handleChangeValue = event => setIsMovePage(event.target.value);
    console.log('Wellllllllllecmw s')
    // useEffect(() => {
    //     if (data.name!=="") {
    //         setIsMovePage(true)
    //     }
    // }, []);
    // const [f,setF] = useState(() => {setIsMovePage(true)});
    // const [isMovePage,setIsMovePage] = useState(false);

    const[data,setData]=  useState({name:"",role:""});
    const signIn=async details =>{

        console.log('secretary')
        // variant = true
       // setF(() => {setIsMovePage(true)})
       //  setIsMovePage(true)
        console.log('secretary',details.name)
        setData({name:details.name,role:details.role})
        // console.log(e)
        //setIsMovePage()

    }
    const signOut=async =>{
        // e.preventDefault();
        // setIsMovePage(false)
        setData({name:"",role:""})
        // console.log(e)
        //setIsMovePage()

    }
   const try1 = function (){
        if(data.name == ""){
            return(
                <div>
                    <h2>
                        עמוד מזכירה!
                    </h2>
                <RegistrationFromUser new_user={new_user}/>
            <RegistrationFromPatient new_patients={new_patients}/>
                </div> )
        }
        return <div></div>

    }
    const try2 = function (){
        if(data.name == ""){
            return(
                <h2>
                    עמוד מזכירה!
                </h2> )
        }
        return <div></div>

    }
    return(
        <div className="secretary">
            {try2 ()}
            <LoginFrom /*signUser={signUser}*/ onSignin={signIn} onSignout={signOut}  data={data} />
            {try1()}
        </div>

    )
}