import React from 'react';
import "./app.css"

import LoginFrom from "./components/login/LoginFrom";

import Chat from "./components/chats/Chat";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AQ10ChildrenForm from "./AQ10ChildrenForm";
import Template from "./template";

function App() {
    return (

        <Router>
            <div className="App"
                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

                <Routes>
                    <Route path={"/aq10children"} element={<AQ10ChildrenForm/>}/>
                </Routes>

                {/*<Template/>*/}
                <LoginFrom/>
            </div>
        </Router>

    );
}

export default App;


