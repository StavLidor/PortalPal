import React from 'react';
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
import { GetCurrentUser} from './firebase'
import {Routes} from "react-router";

function App() {
    console.log(GetCurrentUser()['firebase_user'])
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
                {GetCurrentUser()['firebase_user'] !=null && <Home/>}
                {/*<Login/>*/}

            </div>
        </Router>

    );
}

export default App;


