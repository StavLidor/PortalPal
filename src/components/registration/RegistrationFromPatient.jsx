import React,{useState} from "react";


export default function RegistrationFromPatient({new_patients}){
    const [details,setDetails] = useState({email:"",password:""});
    const [detailsNewUser,setDetailsNewUser] = useState({name:"",type:"therapist",email:"",password:"",patients:""});
    const [detailsPatients,setDetailsPatients] = useState({id:"",name:""});
    const submitNewPatient=e=>{
        e.preventDefault();
        new_patients(detailsPatients);
        // Login(details);
    }
    return(
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


    )
}