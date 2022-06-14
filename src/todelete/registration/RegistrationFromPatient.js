import React,{useState} from "react";


export default function RegistrationFromPatient({data,new_patients}){
    const [detailsPatients,setDetailsPatients] = useState({id:"",name:"",email:"",nameParent:""});
    const submitNewPatient=e=>{
        e.preventDefault();
        // console.log('add a patient')
//         const myMap=new Map({idSecretary:data.id},detailsPatients)
//         console.log('mymap',myMap)
//         _.merge(data1, _.map(data2, x => ({ myNewAttribute: x })))

        new_patients(Object.assign({}, {idSecretary:data.id}, detailsPatients));
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
                <div className="form-group" >
                    <label htmlFor="name">שם הורה:</label>
                    <input type="text" name="name" id="nameParent" onChange={e=>setDetailsPatients({...detailsPatients,nameParent:e.target.value})} value={detailsPatients.nameParent}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">איימיל של הורה:</label>
                    <input type="email" name="email" id="email" onChange={e=>setDetailsPatients({...detailsPatients,email:e.target.value})} value={detailsPatients.email}/>
                </div>

                <input type="submit" value="מטופל חדש"/>
            </form>


    )
}