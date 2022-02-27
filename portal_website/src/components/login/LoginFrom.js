
import React,{useState} from "react";


export default function LoginFrom({Login,error,new_user}){
    const [details,setDetails] = useState({email:"",password:""});
    const submitHandler=e=>{
        e.preventDefault();
        Login(details);
    }
    const submitNewUser=e=>{
        e.preventDefault();
        new_user();
        // Login(details);
    }
    return(
        <div>
        <form onSubmit={submitHandler}>
            <div className="from-inner">
                <h2>
                    התחברות
                </h2>
                {/*ERROR*/}
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="name">Name:</label>*/}
                {/*    <input type="text" name="name" id="name"/>*/}
                {/*</div>*/}
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
            <form onSubmit={submitNewUser}>
                <input type="submit" value="משתמש חדש"/>
            </form>
        </div>


    )
}