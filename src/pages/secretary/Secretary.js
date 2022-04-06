
import React, {useEffect, useState} from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";
import {newUser,newPatients} from "../../pepole/users/user";
import Home from "../home/Home";
import {signUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {
    auth,
    updateIDDoc,
    updatesPatients,
    deletePatientFromInstitute,
    addUserFromAdmin,
    updatesUser, deleteTherapistFromInstitute, findUserByEmail, updatesCurrentUser
} from "../../firebase";
import TableEdit from "../../components/tableEdit/TableEdit";
// import {details_users} from "../../firebase"

export default function Secretary({data}){

    const deleteObjPatient = async (id)=>{
        if(!await deletePatientFromInstitute(data.institutionNumber,{id:id,jobs:['secretary']},data.id)){
            return false
        }
        //
        return true
    }
    const deleteObjTherapist = async (id)=>{

        if(!await deleteTherapistFromInstitute(data.institutionNumber,id,data.id)){
            return false
        }
        return true
        //
    }
    const findTherapist = async (details)=>{
        return await findUserByEmail(details.email)

    }
    const addPatient = async (details)=>{
        return await newPatients(Object.assign({}, {
            institutionNumber: data.institutionNumber, idSecretary: data.id, emailCurrent: data.emailCurrent,
            passwordCurrent: data.passwordCurrent
        }, details))
        //
    }
    const addTherapist = async(details) => {
        if(details.jobs!==undefined){
            console.log('JOBBBBBBBBS',details.jobs)
            details.jobs =details.jobs.split(",")
        }
        if (details.email!==undefined){
            const id =await addUserFromAdmin({...details,institutes: [data.institutionNumber]},data.emailCurrent,
                data.passwordCurrent,"works")
            return id
            // const p=Promise.resolve(id)
            //
            // p.then(async id => {
            //
            //     console.log('SEEEEEEEEC',id)
            //     return id
            // })
            // console.log('IDDDD INN',id)
        }
        return null

    }
    const updateTherapist = async(id,details) => {
        console.log('edit details',details)
        if(typeof(details.jobs) === "string" ){
            details.jobs =details.jobs.split(",")
        }

        return await updatesUser(id,{firstName:details.firstName,lastName:details.lastName,jobs:details.jobs})
    }
    console.log(data)
    const inputsViewPatient =[{type:"text",required:"required",
        placeholder:"Enter a first name..."
        ,name:"firstName",label:"שם פרטי:",
        edit:true
        /*,value:editFormData.firstName,*/
    },{type:"text",required:"required",
        placeholder:"Enter a last name..."
        ,name:"lastName",label:"שם משפחה:",edit:true
        /*,value:editFormData.lastName,*/
    },
        {type:"date",required:"required",
            placeholder:"Enter a birth day..."
            ,name:"dateOfBirth",label: "תאריך לידה:",
            edit:true
            /*,value:editFormData.dateOfBirth,*/
        },
        {type:"text",required:"required",
            placeholder:"Enter a last city..."
            ,name:"city",label:"עיר:",edit:true
            /*,value:editFormData.city*/,
        },
        {type:"text",required:"required",
            placeholder:"Enter a last street..."
            ,name:"street",label:"רחוב:",edit:true
            /*,value:editFormData.street*/,
        },
        {type:"text",required:"required",
            placeholder:"Enter a last buildingNumber..."
            ,name:"buildingNumber",label:"מספר רחוב:",edit:true
            /*,value:editFormData.buildingNumber*/,
        },
        {type:"text",required:"required"
            ,name:"firstNameParent",label:"שם פרטי הורה:",
            edit:false
        },
        {type:"text",required:"required"
            ,name:"lastNameParent",label:"שם משפחה הורה:",
            edit:false
        },
        {type:"email",required:"required"
            ,name:"email",label:"איימיל של הורה:",
            edit:false
        }

    ]
    const inputsViewTherapist =[

        {type:"text",required:"required",
        placeholder:"Enter a first name..."
        ,name:"firstName",label:"שם פרטי:",
        edit:true
        /*,value:editFormData.firstName,*/
    },{type:"text",required:"required",
        placeholder:"Enter a last name..."
        ,name:"lastName",label:"שם משפחה:"
        , edit:true
        /*,value:editFormData.lastName,*/
    },

        {type:"text",required:"required",
            placeholder:"Enter a last city..."
            ,name:"jobs",label:"עבודות:"
            ,
            edit:true
            /*,value:editFormData.city*/,
        },
        {type:"email",required:"required"
            ,name:"email",label:"איימיל של מטפל:",
            edit:false
        },

    ]
    return(
        <div className="secretary">
            <div>
                <h2>
                    עמוד מזכירה!
                </h2>
                {/*<RegistrationFromUser new_user={newUser}/>*/}
                <TableEdit add ={addPatient} update ={updatesPatients} deleteObj={deleteObjPatient}
                           emptyDetails={{id:"",firstName:"",lastName:"",dateOfBirth:new Date(),city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:""}} emptyEditDetails={{firstName: "",
                    lastName: "",
                    dateOfBirth:new Date()
                    ,city:"",street:"",buildingNumber:"",}} data={data.students_arr} HebrewNames={[
                    "תעודת זהות" ,"שם פרטי","שם משפחה","תאריך לידה","עיר","רחוב","מספר רחוב","שם פרטי הורה","שם משפחה הורה","אימייל"]
                } inputsView={inputsViewPatient}  requeredId={true}/>
                <TableEdit add ={addTherapist} update ={updateTherapist} deleteObj={deleteObjTherapist}
                           emptyDetails={{firstName:"",lastName:"",jobs:[],email:""}} emptyEditDetails={{firstName:"",lastName:"",jobs:[]}} data={data.works} HebrewNames={[
                    "שם פרטי","שם משפחה","עבודות","אימייל"]
                } inputsView={inputsViewTherapist}  requeredId={false}
                find={findTherapist}/>
                {/*<RegistrationFromPatient data={data} new_patients={newPatients}/>*/}
            </div>
        </div>

    )
}