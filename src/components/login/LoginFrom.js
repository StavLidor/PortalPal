
import React,{useState} from "react";


export default function LoginFrom({Login,new_user,new_patients}){
    const [details,setDetails] = useState({email:"",password:""});
    const [detailsNewUser,setDetailsNewUser] = useState({name:"",type:"therapist",email:"",password:"",patients:""});
    const [detailsPatients,setDetailsPatients] = useState({id:"",name:""});
    const submitHandler=e=>{
        e.preventDefault();
        Login(details);
    }
    const submitNewUser=e=>{
        e.preventDefault();
        new_user(detailsNewUser);
        // Login(details);
    }
    const submitNewPatient=e=>{
        e.preventDefault();
        new_patients(detailsPatients);
        // Login(details);
    }
    return(
        <div>
            <h2>
                עמוד מזכירה!
            </h2>

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
                <h2>
                    מטפל או הורה חדש
                </h2>
                <div className="form-group" >
                    <label htmlFor="name">שם:</label>
                    <input type="text" name="name1" id="name1"onChange={e=>setDetailsNewUser({...detailsNewUser,name:e.target.value})} value={detailsNewUser.name}/>
                </div>
                {/*<select id="type" onChange={e=>setDetailsNewUser({...detailsNewUser,type:e.target.value})} value={details.type}>*/}
                {/*    <label htmlFor="name">סוג:</label>*/}
                {/*    <option value="0">מטפל</option>*/}
                {/*    <option value="1">הורה</option>*/}
                {/*</select>*/}
                <label>סוג:
                    <select type="text" name="type" id="type" onChange={e=>setDetailsNewUser({...detailsNewUser,type:e.target.value})} value={detailsNewUser.type} >
                            <option value="therapist">מטפל</option>
                            <option value="parent">הורה</option>
                    </select>
                </label>
                <div className="form-group">
                    <label htmlFor="email">איימיל:</label>
                    <input type="email" name="email" id="email" onChange={e=>setDetailsNewUser({...detailsNewUser,email:e.target.value})} value={detailsNewUser.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">סיסמא:</label>
                    <input type="password" name="password" id="password" onChange={e=>setDetailsNewUser({...detailsNewUser,password:e.target.value})} value={detailsNewUser.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="ids">תעודות זהות של הילדים:</label>
                    <input type="text" name="ids" id="ids" onChange={e=>setDetailsNewUser({...detailsNewUser,ids:e.target.value})} value={detailsNewUser.ids}/>
                </div>
                <input type="submit" value="משתמש חדש"/>
            </form>
            <form onSubmit={submitNewPatient} >
                <h2>
                    מטופל חדש
                </h2>
                <div className="form-group">
                    <label htmlFor="id">תעודות זהות של המטופל:</label>
                    <input type="number" name="id" id="id" onChange={e=>setDetailsPatients({...detailsPatients,id:e.target.value})} value={detailsPatients.ids}/>
                </div>

                <div className="form-group" >
                    <label htmlFor="name">שם:</label>
                    <input type="text" name="name" id="name" onChange={e=>setDetailsPatients({...detailsPatients,name:e.target.value})} value={detailsPatients.name}/>
                </div>

                <input type="submit" value="מטופל חדש"/>
            </form>
        </div>


    )
}