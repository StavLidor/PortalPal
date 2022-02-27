import React,{useState} from "react";
// import {useNavigate } from "react-router-dom";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useHistory
// } from "react-router-dom";


export default function NewUser(){
    // const history = useHistory ();
    // const BrowserHistory = require('react-router/lib/BrowserHistory').default;
    const [details,setDetails] = useState({email:"",password:""});

    const submitHandler=e=>{
        e.preventDefault();
        // history.goBack()
        // BrowserHistory.goBack
        // Login(details);
    }
    return(
        // <div className="newUser">
        //     {/*<div>*/}
        //     {/*        somting*/}
        //     {/*</div>*/}
        // </div>
        <form onSubmit={submitHandler}>
            <div className="from-inner">
                <h2>
                    התחברות
                </h2>
                {/*ERROR*/}
                <div className="form-group">
                    <label htmlFor="name">שם:</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">שם משפחה:</label>
                    <input type="text" name="name" id="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">איימיל:</label>
                    <input type="email" name="email" id="email" onChange={e=>setDetails({...details,email:e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">סיסמא:</label>
                    <input type="password" name="password" id="password" onChange={e=>setDetails({...details,password:e.target.value})} value={details.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">וידוא סיסמא:</label>
                    <input type="password" name="password" id="password" onChange={e=>setDetails({...details,password:e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="הירשם"/>

            </div>
        </form >

    )
}