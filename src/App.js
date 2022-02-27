import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Patient from "./pages/patient/Patient"

import db from './firebase';
import { doc,getDocs , onSnapshot, collection, query, where } from "firebase/firestore";


import React, { useState, useEffect, Component }  from 'react';
import LoginFrom from "./components/login/LoginFrom";
import "./app.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import NewUser from "./components/login/NewUser";

function App() {
    const collection_query = collection(db,"institutes");
    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user,setUser] = useState({email:"",password:""});
    const [error,setError] = useState("");
    const [newUser,setNewUser]=useState(false);

    function getInstitutes() {
        setLoading(true);
        // const querySnapshot = await getDocs(collection(db, "users"));
        // querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data()}`);
        // });
        onSnapshot(collection_query,(querySnapshot)=>{
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setInstitutes(items);
        setLoading(false);
        })
    }

    useEffect(()=> {
        getInstitutes();
    }, []);

    if (loading){
        return <h1>Loading...</h1>
    }



    const adminUser={
        email:"admin@admin.com",
        password:"admin123"
    }

    const Login = details=>{
        console.log(details);
        if (details.email === adminUser.email && details.password === adminUser.password){
            console.log("Logged in")
            setUser({
                name:"Stav",
                email: details.email
            })
        }
        else{
            console.log("Details do not match")
        }

    }
    const Logout = ()=>{
        // console.log('logout');
        setUser({email:"",password:""});
    }
    const new_user= ()=>{
        setNewUser(true);
        console.log('yess');
    }
  return (

    <div className="App">
        {/*<h1>Blah Blah</h1>*/}
        {/*{institutes.map((institute)=>(*/}
        {/*    <h2>{institute.hello}</h2>*/}
        {/*    ))}*/}
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
            (newUser === true) ? (
                <div>
                                    <NewUser/>
                </div>
            ):
            (
            <LoginFrom Login={Login} error={error} new_user={new_user}/>
        )
        }

      {/*<Topbar/>*/}

      {/* <div className="container">*/}
      {/*      <div className="patients">*/}

      {/*      </div>*/}

      {/*     /!*<span></span>*!/*/}

      {/*     <div className="containerRight">*/}
      {/*         <div className="Sidebar">*/}

      {/*             <Router>*/}
      {/*                 <Sidebar/>*/}
      {/*                 <Routes>*/}
      {/*                 <Route path="/dana_barger" element={<Patient />} />*/}
      {/*                 </Routes>*/}
      {/*             </Router>*/}


      {/*         </div>*/}
      {/*     </div>*/}
      {/* </div>*/}


    </div>

  );
}
export default App;


