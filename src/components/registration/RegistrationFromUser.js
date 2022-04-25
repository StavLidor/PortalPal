import React,{useState} from "react";


export default function RegistrationFromUser({new_user}){
    const [detailsNewUser,setDetailsNewUser] = useState({name:"",/*type:"therapist",*/email:"",password:"",/*patients:""*/});
    const submitNewUser=e=>{
        e.preventDefault();
        new_user(detailsNewUser);
        // Login(details);
    }
    return(

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


    )
}