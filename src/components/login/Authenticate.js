import {Button, Form, Row, Col, Container, ButtonGroup, Grid} from 'react-bootstrap'
import React, {useEffect, useState, useCallback, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Animated} from 'react-animated-css'
import Login from "./Login";
import SignUp from "./SignUp";
import Logo from "../../Portapel.png";

export default function Authenticate({login}) {

    const [displayLoginForm, setDisplayLoginForm] = useState(true);

    useEffect(() => {
        setDisplayLoginForm(displayLoginForm)
    }, [displayLoginForm])

    return (
        <div >
            <Animated animationIn="fadeIn" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
            <div className='text-center m-3 mb-5'>
                    <img src={Logo} alt='toko' style={{width: '500px'}}/>
            </div>
            </Animated>

            <Animated animationIn="fadeIn" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
            <Container className="justify-content-center" style={{maxWidth:'600px'}}>
            <div className={"border border-secondary rounded-3 m-5 p-4"} style={{
                backgroundColor:'lightgrey'
            }}>
                    {displayLoginForm === true && <Animated animationIn="fadeIn" animationInDuration={1000}  isVisible={true}>
                        <Login login={login} setDisplayLoginForm={setDisplayLoginForm}/>
                    </Animated>}


                {displayLoginForm === false && <Animated animationIn="fadeIn" animationInDuration={1000} isVisible={true}>
                    <SignUp setDisplayLoginForm={setDisplayLoginForm}/>
                </Animated>}



            </div></Container>
            </Animated>
        </div>)
}
