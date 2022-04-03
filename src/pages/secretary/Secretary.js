
import React, {useEffect, useState} from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";
import {newUser,newPatients} from "../../pepole/users/user";
import Home from "../home/Home";
import {signUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {auth, details_users, updateIDDoc, updatesPatients,deletePatientFromInstitute} from "../../firebase";
import TableEdit from "../../components/tableEdit/TableEdit";
// import {details_users} from "../../firebase"

export default function Secretary({data}){
    const deleteObj = async (id)=>{
        await deletePatientFromInstitute(data.institutionNumber,{id:id,jobs:['secretary']},data.id)
        //
    }
    const add = async (details)=>{
        await newPatients(Object.assign({}, {
            institutionNumber: data.institutionNumber, idSecretary: data.id, emailCurrent: data.emailCurrent,
            passwordCurrent: data.passwordCurrent
        }, details))
        //
    }
    console.log(data)
    const inputsView =[{type:"text",required:"required",
        placeholder:"Enter a first name..."
        ,name:"firstName",label:"שם פרטי:"
        /*,value:editFormData.firstName,*/
    },{type:"text",required:"required",
        placeholder:"Enter a last name..."
        ,name:"lastName",label:"שם משפחה:"
        /*,value:editFormData.lastName,*/
    },
        {type:"date",required:"required",
            placeholder:"Enter a birth day..."
            ,name:"dateOfBirth",label: "תאריך לידה:"
            /*,value:editFormData.dateOfBirth,*/
        },
        {type:"text",required:"required",
            placeholder:"Enter a last city..."
            ,name:"city",label:"עיר:"
            /*,value:editFormData.city*/,
        },
        {type:"text",required:"required",
            placeholder:"Enter a last street..."
            ,name:"street",label:"רחוב:"
            /*,value:editFormData.street*/,
        },
        {type:"text",required:"required",
            placeholder:"Enter a last buildingNumber..."
            ,name:"buildingNumber",label:"מספר רחוב:"
            /*,value:editFormData.buildingNumber*/,
        }
    ]
    const inputsNew= inputsView.concat([
        {type:"text",required:"required"
            ,name:"firstNameParent",label:"שם פרטי הורה:"
        },
        {type:"text",required:"required"
            ,name:"lastNameParent",label:"שם משפחה הורה:"
        },
        {type:"email",required:"required"
            ,name:"email",label:"איימיל של הורה:"
        }

    ])

    return(
        <div className="secretary">
            <div>
                <h2>
                    עמוד מזכירה!
                </h2>
                {/*<RegistrationFromUser new_user={newUser}/>*/}
                <TableEdit add ={add} update ={updatesPatients} deleteObj={deleteObj}
                           emptyDetails={{id:"",firstName:"",lastName:"",dateOfBirth:new Date(),city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:""}} emptyEditDetails={{firstName: "",
                    lastName: "",
                    dateOfBirth:new Date()
                    ,city:"",street:"",buildingNumber:"",}} data={data.students_arr} HebrewNames={[
                    "תעודת זהות" ,"שם פרטי","שם משפחה","תאריך לידה","עיר","רחוב","מספר רחוב"]
                } inputsView={inputsView} inputsNew={inputsNew}/>
                {/*<RegistrationFromPatient data={data} new_patients={newPatients}/>*/}
            </div>
        </div>

    )
}