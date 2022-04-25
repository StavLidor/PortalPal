import React, {useEffect, useState} from 'react';
import "./app.css"
import Button from 'react-bootstrap/Button';

import LoginFrom from "./components/login/LoginFrom";
// import { AuthProvider } from "components/login/Auth.js";
// import PrivateRoute from "components/login/PrivateRoute";
import Home from "./pages/home/Home.js";
import Login from "./components/login/Login";

import Chat from "./components/chats/Chat";
import {BrowserRouter as Router, Route,} from "react-router-dom";
import AQ10ChildrenForm from "./AQ10ChildrenForm";
import Template from "./template";
import {Col, Row} from "react-bootstrap";
import {auth, GetCurrentUser, getDocCurrentUser} from './firebase'
import {Routes} from "react-router";
import {signUser} from "./pepole/users/user";

function App() {

    // console.log("new",window.localStorage.saveSignedIn)
    // useEffect(()=>{
    //     const unsubscribe= auth.onAuthStateChanged(async user => {
    //         if (user) {
    //             // await signOutCurrentUser()
    //             console.log('user',user.uid)
    //             // const p=Promise.resolve(user.uid)
    //             // p.then(id => {
    //             //     setIsMovePage(true)
    //             //     setUser(id)
    //             // })
    //
    //             getDocCurrentUser().then(value => {
    //                 // login(value,userDetails.type,userDetails.institute)
    //                 setUserDetails(value)
    //             }
    //             )
    //
    //         } else {
    //             // setIsMovePage(false)
    //             // setInfo({id:'',firstName:'',lastName:'',students_arr:[],myDoc:'',emailCurrent:'',
    //             //     passwordCurrent:'',institutionNumber:'',works:[]})
    //         }
    //         // if(initializing){
    //         //     setInitializing(false)
    //         // }
    //     })
    //     console.log("prefix: ",unsubscribe)
    //     return unsubscribe
    //
    // },[])
    // console.log("in app:",auth.currentUser)
    // console.log(GetCurrentUser()['firebase_user'])
    // const saveSignedIn = window.localStorage.isSigneIn
    // window.localStorage.toko = false
    // if (window.localStorage.toko===false){}
    const [isSigneIn, setIsSigneIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    // const saveUserDetails = window.localStorage.userDetails
    // const saveUserDetails = false
    const login= async (doc,type,institute)=>{
        // setUserDetails({doc: doc,type: type,institute:institute})
        setUserDetails({doc: doc,type: type, institute:institute})
        setIsSigneIn(true);
        // window.localStorage.saveSignedIn = isSigneIn
        // window.localStorage.saveUserDetails= userDetails
        // window.localStorage.saveType= type
        // window.localStorage.saveInstitute= institute

    }

    return (
    <Router>
            <div className="App">
                 {/*style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>*/}
                {/*<Route exact path="/login" component={Login} />*/}
                {/*<Route exact path="/signup" component={SignUp} />*/}
                {/*<Routes>*/}
                {/*    <Route path={"/aq10children"} element={<AQ10ChildrenForm/>}/>*/}
                {/*</Routes>*/}

                {/*<Template/>*/}
                {/*<LoginFrom/>*/}

                {/*{GetCurrentUser()['firebase_user']  ==null && <Login/>}*/}
                {/*{GetCurrentUser()['firebase_user'] !=null && <Home/>}*/}

                {/*{window.localStorage.saveSignedIn===false && <Login login={login}/>}*/}
                {/*{window.localStorage.saveSignedIn && <Home d={ window.localStorage.saveUserDetails.doc} type={ window.localStorage.saveUserDetails.type} institute={ window.localStorage.saveUserDetails.institute}/>}*/}
                {isSigneIn===false && <Login login={login}/>}
                {/*{ window.localStorage.saveType}*/}
                {/*{ window.localStorage.saveInstitute}*/}
                {isSigneIn && <Home d={userDetails.doc} type={userDetails.type} institute={userDetails.type.institute}/>}
                {/*<Login/>*/}

            </div>
        </Router>

    );
}

export default App;


