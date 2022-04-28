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
import {signOutCurrentUser} from "./firebase";
import Template from "./template";
import {Col, Row} from "react-bootstrap";
import {auth, GetCurrentUser, getDocCurrentUser} from './firebase'
import {Routes} from "react-router";
import {signUser} from "./pepole/users/user";
import Authenticate from "./components/login/Authenticate";
import HomePage from "./pages/home/HomePage";
import {signOut} from "firebase/auth";

function App() {
    const [isSigneIn, setIsSigneIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [hasDetails, setHasDetails] = useState(false);
    const [checkUserConnection, setCheckUserConnection] = useState(false);
    const [displayLoginError, setDisplayLoginError] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // signOutCurrentUser()
    // console.log("new",window.localStorage.saveSignedIn)
    useEffect(() => {
        // let isFirstLoad = true
        const unsubscribe = auth.onAuthStateChanged(async user => {
            setCheckUserConnection(true)
            if (user) {
                setIsSigneIn(true)
                getDocCurrentUser().then(value => {
                    console.log(value)
                    console.log(value.data())
                    console.log(value.data().titles)
                        setUserDetails(value)
                        setHasDetails(true)
                    if(value.data().titles.includes(localStorage.getItem('type'))){
                        console.log('print hello')
                        setDisplayLoginError(false)
                        // setIsSigneIn(true)
                        setIsFirstLoad(true)
                    }
                    else{
                        signOutCurrentUser()
                        setDisplayLoginError(true)
                        localStorage.setItem("type", "")
                        localStorage.setItem("institute", "")
                    }

                }
                )

            } else {
                localStorage.setItem("type", "")
                localStorage.setItem("institute", "")
                setIsSigneIn(false)
                if(isFirstLoad === false){
                    setDisplayLoginError(true)
                }
                setIsFirstLoad(false)
            }
        })
        return unsubscribe

    }, [])

    const login = async (type, institute, isSuccessfulSignIn) => {
        localStorage.setItem("type", type)
        localStorage.setItem("institute", institute)
        // setIsFirstLoad(isSuccessfulSignIn)
        setDisplayLoginError(!isSuccessfulSignIn)
    }

    return (
        <Router>
            <div className="App">
                {isSigneIn === false && checkUserConnection && <Authenticate login={login}/>}
                {(checkUserConnection===false ||(isSigneIn && hasDetails===false) ) && <div>loading</div>}
                {displayLoginError && isSigneIn === false && checkUserConnection && <h4>אחד מפרטי ההתחברות לא נכון :(</h4>}
                {/*// TODO: page for loading*/}
                {isSigneIn && hasDetails && displayLoginError === false &&
                <HomePage userDetails={userDetails.data()} type={localStorage.getItem("type")} institute={localStorage.getItem("institute")} />}

            </div>
        </Router>

    );
}

export default App;


