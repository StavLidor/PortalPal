import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Patient from "./pages/patient/Patient"

import React, { useState,Component }  from 'react';
import LoginFrom from "./components/login/LoginFrom";
import "./app.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import NewUser from "./components/login/NewUser";

// const somting=()=> (
//     <div>
//         <Patient />
//     </div>
//
// )

function App() {
    const adminUser={
        email:"admin@admin.com",
        password:"admin123"
    }
    const [user,setUser] = useState({email:"",password:""});
    const [error,setError] = useState("");
    const [newUser,setNewUser]=useState(false);
    const Login = details=>{
        console.log(details);
        if (details.email == adminUser.email && details.password == adminUser.password){
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

        {(user.email!="") ? (
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


