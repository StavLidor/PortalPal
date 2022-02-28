import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Patient from "./pages/patient/Patient"

import {addUser,addPatient,ifUserExists} from './firebase';


import React, { useState, useEffect, Component }  from 'react';
import LoginFrom from "./components/login/LoginFrom";

import "./app.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

function App() {

    const [user,setUser] = useState({email:"",password:""});
    // function getInstitutes() {
    //     setLoading(true);
    //     // const querySnapshot = await getDocs(collection(db, "users"));
    //     // querySnapshot.forEach((doc) => {
    //     //     console.log(`${doc.id} => ${doc.data()}`);
    //     // });
    //     onSnapshot(collection_query,(querySnapshot)=>{
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setInstitutes(items);
    //     setLoading(false);
    //     })
    // }

    // useEffect(()=> {
    //     getInstitutes();
    // }, []);

    // if (loading){
    //     return <h1>Loading...</h1>
    // }

    const Login = async details=>{
        // later check before if this in Cache
        console.log(details);
        const  more_details =  await ifUserExists(details);
        if(more_details){
            // console.log(more_details.name)
            setUser({
                name:more_details.name,
                email: details.email
            })
        }
    }
    const Logout = ()=>{
        // console.log('logout');
        setUser({email:"",password:""});
    }

    const new_user=async details=>{
        let arr_ids = details.ids.split(",");
        if (await addUser({
            name: details.name,
            type: details.type,
            email: details.email,
            password: details.password,
            ids: arr_ids
        })){
            console.log("HI user",details.name.toString(),details.type.toString(),details.password.toString());
        }
        else{
            console.log('user with this mail exsist')
        }

    }
    const new_patients= async details=>{
        //setNewUserFlag(true);
        if (await addPatient(details)){
            console.log("HI",details.id.toString(),details.name.toString());
        }
        else {
            console.log('patient with this mail exsist')
        }
    }
  return (

    <div className="App">
        {(user.email!=="") ? (
            <div className="welcome">
                <h2>Welcome,<span>{user.name}</span></h2>
                <button onClick={Logout}>Logout</button>
                <Topbar/>

                 <div className="container">
                      <div className="patients">

                      </div>

                     {/*<span></span>*/}

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

        ):
            // (newUserFlag === true) ? (
            //     <div>
            //                         <NewUser/>
            //     </div>
            // ):
            (
            <LoginFrom Login={Login}  new_user={new_user} new_patients={new_patients}/>
        )
        }


    </div>

  );
}
export default App;


