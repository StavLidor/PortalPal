
import React, {useEffect, useState} from "react";
import Home from "../../pages/home/Home";
import {signUser, unSignUser,newUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {auth, detailsPatient, detailsWorks, getDocCurrentUser, resetPassword, updatesCurrentUser} from "../../firebase"
import approve from "../../crawler/Crawler"


export default function LoginFrom(){

    const [details,setDetails] = useState({email:"",password:"",type:"therapist",institute:"external"});
    const [detailsNewUser,setDetailsNewUser] = useState({firstName:"",
        lastName:"",license:"",email:"",password:""});
    const [isMovePage,setIsMovePage] = useState(true)
    const [isFormNewUser,setFormNewUser] = useState(false)
    const [info,setInfo] = useState({id:'',firstName:'',lastName:'',students_arr:[],myDoc:'',emailCurrent:'',
        passwordCurrent:'',institutionNumber:'',works:[]});
    const [user,setUser]=useState(null)
    const [loginNow,setLoginNow]=useState(false)
    // if (login){
    //     setIsMovePage(true)
    // }
    useEffect(()=>{
       const unsubscribe= auth.onAuthStateChanged(async user => {
           if (user) {
               console.log('user',user.uid)
               const p=Promise.resolve(user.uid)
               p.then(id => {
                   setIsMovePage(true)
                   setUser(id)
               })

               resolver(await getDocCurrentUser())

           } else {
               setIsMovePage(false)
               setInfo({id:'',firstName:'',lastName:'',students_arr:[],myDoc:'',emailCurrent:'',
                   passwordCurrent:'',institutionNumber:'',works:[]})
           }
           // if(initializing){
           //     setInitializing(false)
           // }
       })
        return unsubscribe

    },[])
    const resolver=async val=>{
        console.log('login now',loginNow)
        const p=Promise.resolve(val)
        p.then(doc => {
            const data = doc.data()
            const id = doc.id
            console.log('lalalala')
            if(loginNow){
                if(details.type !=="admin" && details.type !=="parent" ){
                    updatesCurrentUser({lastLogin:details.type+","+details.institute})
                }
                else {
                    updatesCurrentUser({lastLogin:details.type})
                }

            }
            else {
                let lastLogin = data.lastLogin.split(",")
                console.log(lastLogin,"lastLogin")
                if (lastLogin.length == 2){
                    details.institute = lastLogin[1]
                }
                details.type = lastLogin[0]
            }
            if (details.type === 'admin'/*||details.type === 'therapist'*/){
                const arrStudents=detailsPatient(data.students_arr)
                const arrWorks=detailsWorks(data.works)
                setInfo({id:id,firstName:data.firstName,lastName:data.lastName,students_arr:arrStudents,myDoc:doc,emailCurrent:details.email,
                    passwordCurrent:details.password,institutionNumber:data.institutionNumber,works:arrWorks})
                console.log('institutionNumber',data.institutionNumber)
            }
            else {
                if(details.institute !="external" && ('institute' in data)&& !(details.institute in data.institutes)) {
                    unSignUser()
                }
                else{
                    setInfo({...data,id:id})
                }

            }
        })
    }
    const submitHandler=async e=>{
        e.preventDefault()
        setLoginNow(true)
        console.log('set to true login',loginNow)
       if(loginNow && await  signUser(details) ){
           setIsMovePage(true)

           console.log('connected')
       }
       else {
           setLoginNow(false)
       }


    }
    const Logout = ()=>{
        // console.log('logout');

        setDetails({email:"",password:""});
        setUser(null)
        setIsMovePage(false)
        setInfo({id:'',firstName:'',lastName:'',students_arr:[],myDoc:'',emailCurrent:'',
            passwordCurrent:'',institutionNumber:'',works:[]})
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
        // approve(detailsNewUser.license,detailsNewUser.firstName,detailsNewUser.lastName)
        newUser(detailsNewUser)

        setFormNewUser(false)
        // Login(details);
    }

    return(
        (isMovePage) ? (
            <div>
                <button  onClick={Logout} >Logout</button>

                {info.firstName!=="" && <Home d={info} type={details.type} institute={details.institute}
                user={user}/>}
                {/*{user && <Home d={info} type={ (()=>{*/}
                {/*    if(loginNow)*/}
                {/*        return details.type*/}
                {/*    return null */}
                {/*})()*/}
                {/*    */}
                {/*} institute={(()=>{*/}
                {/*    if(loginNow)*/}
                {/*        return details.institute*/}
                {/*    return null*/}
                {/*})()}*/}
                {/*                              user={user}/>}*/}
            </div>
        ):
        (isFormNewUser) ? (
                <form onSubmit={submitNewUser}>
                    <h2>
                        מטפל
                    </h2>
                    <div className="form-group" >
                        <label htmlFor="firstName">שם פרטי:</label>
                        <input type="text" name="firstName" id="firstName"onChange={e=>setDetailsNewUser({...detailsNewUser,firstName:e.target.value})} value={detailsNewUser.firstName}/>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="lastName">שם משפחה:</label>
                        <input type="text" name="lastName" id="lastName"onChange={e=>setDetailsNewUser({...detailsNewUser,lastName:e.target.value})} value={detailsNewUser.lastName}/>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="license">רשיון:</label>
                        <input type="text" name="license" id="license" onChange={e=>setDetailsNewUser({...detailsNewUser,license:e.target.value})} value={detailsNewUser.license}/>
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