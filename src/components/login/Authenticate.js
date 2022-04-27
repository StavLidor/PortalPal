import {Button, Form, Row, Col, Container, ButtonGroup, Grid} from 'react-bootstrap'
import React, {useEffect, useState, useCallback, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseApp, {signIn, signUp, signOutCurrentUser, getCurrentUser} from '../../firebase'
import Login from "./Login";
import SignUp from "./SignUp";

export default function Authenticate({login}) {

    const [displayLoginForm, setDisplayLoginForm] = useState(true);

    useEffect(() => {
        setDisplayLoginForm(displayLoginForm)
    }, [displayLoginForm])

    return (<div>
        {displayLoginForm === true && <Login login={login} setDisplayLoginForm={setDisplayLoginForm}/>}
        {displayLoginForm === false && <SignUp setDisplayLoginForm={setDisplayLoginForm}/>}
        <h2>{displayLoginForm.toString()}</h2>
    </div>)
}
