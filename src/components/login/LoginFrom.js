
import React,{useState} from "react";
import Home from "../../pages/home/Home";
import {signUser, unSignUser,newUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {auth, detailsPatient, detailsWorks, resetPassword} from "../../firebase";


export default function LoginFrom(){

    const [details,setDetails] = useState({email:"",password:"",type:"therapist",institute:"external"});
    const [detailsNewUser,setDetailsNewUser] = useState({name:"",/*type:"therapist",*/email:"",password:"",/*patients:""*/});
    const [isMovePage,setIsMovePage] = useState(false)
    const [isFormNewUser,setFormNewUser] = useState(false)
    const [info,setInfo] = useState({id:'',firstName:'',lastName:'',students_arr:[],myDoc:'',emailCurrent:'',
        passwordCurrent:'',institutionNumber:'',works:[]});
    // if (login){
    //     setIsMovePage(true)
    // }
    const submitHandler=async e=>{
        e.preventDefault();
        const infor = await  signUser(details)
        const p1=Promise.resolve(infor)
        p1.then(doc => {
            const data = doc.data()
            const id = doc.id
            console.log('lalalala')
            if (details.type === 'admin'/*||details.type === 'therapist'*/){
                const arrStudents=detailsPatient(data.students_arr)
                const arrWorks=detailsWorks(data.works)
                setInfo({id:id,firstName:data.firstName,lastName:data.lastName,students_arr:arrStudents,myDoc:doc,emailCurrent:details.email,
                    passwordCurrent:details.password,institutionNumber:data.institutionNumber,works:arrWorks})
                console.log('institutionNumber',data.institutionNumber)
            }
            else {
                if(details.institute !="external" && !(details.institute in data.institutes)) {
                    unSignUser()
                }
                else{
                    setInfo({...data,id:id})
                }

            }
        })
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
    const submitForgetPassword= e=>{
        e.preventDefault();
        resetPassword(details.email)
    }
    const submitNewUser=e=>{
        e.preventDefault();
        newUser(detailsNewUser);
        setFormNewUser(false)
        // Login(details);
    }

    return(
        (info.firstName !=='') ? (
            <div>
                <button  onClick={Logout} >Logout</button>

                <Home d={info} type={details.type} institute={details.institute}/>
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
                        {/*<option value="teacher">מורה</option>*/}
                        <option value="admin">ניהול</option>
                        <option value="parent">הורה</option>
                    </select>
                </label>
                    {(details.type !=="admin" && details.type !=="parent") &&
                        <label>מוסד:
                            <select type="text" name="type" id="type" onChange={e=>setDetails({...details,institute:e.target.value})} value={details.institute} >

                                <option value="1">1</option>
                                <option value="external">חיצוני</option>
                            </select>
                        </label>
                    }

                </div>
                <input type="submit" value="התחברות"/>

            </div>
        </form >
        <form onSubmit={submitLink}>
            <input type="submit" value="מטפל חדש"/>
        </form >
            <form onSubmit={submitForgetPassword}>
                <input type="submit" value="שכחתי סיסמא"/>
            </form >

        </div>


    )
}