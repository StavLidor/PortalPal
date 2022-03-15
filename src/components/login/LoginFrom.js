
import React,{useState} from "react";
import Home from "../../pages/home/Home";
import {signUser, unSignUser,newUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";


export default function LoginFrom(){
    const [details,setDetails] = useState({email:"",password:"",type:"therapist"});
    const [detailsNewUser,setDetailsNewUser] = useState({name:"",/*type:"therapist",*/email:"",password:"",/*patients:""*/});
    const [isMovePage,setIsMovePage] = useState(false);
    const [isFormNewUser,setFormNewUser] = useState(false);
    const [info,setInfo] = useState({name:""});
    // if (login){
    //     setIsMovePage(true)
    // }
    const submitHandler=async e=>{
        e.preventDefault();
        const infor = await  signUser(details)
        const p1=Promise.resolve(infor)
        p1.then(value => {
            console.log('lalalala')
            setInfo({name:value.name,students_arr:value.students_arr})
        });


        // console.log("infor:",infor.name)
        // if(infor.name!==""/*infor*/){
        //     setInfo(infor)
        //     setIsMovePage(true)
        //     console.log(info)
        // }
    }
    const Logout = ()=>{
        // console.log('logout');

        setDetails({email:"",password:""});
        setIsMovePage(false)
        setInfo({name:""})
        unSignUser()
    }
     const submitLink = function (){
        setFormNewUser(true)
        console.log('new user')
    }
    const submitNewUser=e=>{
        e.preventDefault();
        newUser(detailsNewUser);
        setFormNewUser(false)
        // Login(details);
    }

    return(
        (info.name !=='') ? (
            <div>
                <button  onClick={Logout} >Logout</button>

                <Home d={info} type={details.type}/>
            </div>
        ):
        (isFormNewUser) ? (
                <form onSubmit={submitNewUser}>
                    <h2>
                        מטפל
                    </h2>
                    <div className="form-group" >
                        <label htmlFor="name">שם:</label>
                        <input type="text" name="name1" id="name1"onChange={e=>setDetailsNewUser({...detailsNewUser,name:e.target.value})} value={detailsNewUser.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">איימיל:</label>
                        <input type="email" name="email" id="email" onChange={e=>setDetailsNewUser({...detailsNewUser,email:e.target.value})} value={detailsNewUser.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">סיסמא:</label>
                        <input type="password" name="password" id="password" onChange={e=>setDetailsNewUser({...detailsNewUser,password:e.target.value})} value={detailsNewUser.password}/>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="ids">תעודות זהות של הילדים:</label>*/}
                    {/*    <input type="text" name="ids" id="ids" onChange={e=>setDetailsNewUser({...detailsNewUser,ids:e.target.value})} value={detailsNewUser.ids}/>*/}
                    {/*</div>*/}
                    <input type="submit" value="משתמש חדש"/>
                </form>
            ):
        <div>
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
                <div className="form-group">
                <label>סוג:
                    <select type="text" name="type" id="type" onChange={e=>setDetails({...details,type:e.target.value})} value={details.type} >
                        <option value="therapist">מטפל</option>
                        <option value="admin">ניהול</option>
                        <option value="parent">הורה</option>
                    </select>
                </label>
                </div>
                <input type="submit" value="התחברות"/>

            </div>
        </form >
            <form onSubmit={submitLink}>
                <input type="submit" value="מטפל חדש"/>
            </form >
        </div>


    )
}