
import React,{useState} from "react";
import Home from "../../pages/home/Home";
import {signUser, unSignUser} from "../../pepole/users/user";


export default function LoginFrom(){
    const [details,setDetails] = useState({email:"",password:""});
    const [isMovePage,setIsMovePage] = useState(false);
    const [info,setInfo] = useState({name:""});
    const submitHandler=async e=>{
        e.preventDefault();
        const infor = await  signUser(details)
        console.log("infor:",infor.name)
        if(infor.name!==""){
            setInfo({name:infor.name} )
            setIsMovePage(true)
            console.log(info)
        }
    }
    const Logout = ()=>{
        // console.log('logout');

        setDetails({email:"",password:""});
        setIsMovePage(false)
        setInfo({name:""})
        unSignUser()
    }
    return(
        (isMovePage == true) ? (
            <div>
                <button onClick={Logout}>Logout</button>
                <Home user={info}/>
            </div>
        ):

        <form onSubmit={submitHandler}>
            <div className="from-inner">
                <h2>
                    התחברות
                </h2>
                <div className="form-group">
                    <label htmlFor="email">איימיל:</label>
                    <input type="email" name="email" id="email" onChange={e=>setDetails({...details,email:e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">סיסמא:</label>
                    <input type="password" name="password" id="password" onChange={e=>setDetails({...details,password:e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="התחברות"/>

            </div>
        </form >

    )
}