
import React, {useEffect, useState} from "react";
import LoginFrom from "../../components/login/LoginFrom";
import RegistrationFromPatient from "../../components/registration/RegistrationFromPatient";
import RegistrationFromUser from "../../components/registration/RegistrationFromUser";
import {newUser,newPatients} from "../../pepole/users/user";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import Home from "../home/Home";
import {signUser} from "../../pepole/users/user";
import {signOut} from "firebase/auth";
import {
    auth,
    updateIDDoc,
    updatesPatients,
    deletePatientFromInstitute,
    addUserFromAdmin,
    updatesUser,
    deleteTherapistFromInstitute,
    findUserByEmail,
    updatesCurrentUser,
    detailsPatient,
    updateDocUser,
    updateDocUserWithArrayFiled, addConnectionPatientToTherapist, removeConnectionPatientToTherapist
} from "../../firebase";
import TableEdit from "../../components/tableEdit/TableEdit";
import Patient from "../patient/Patient";
// import {details_users} from "../../firebase"

export default function Secretary({data}){
    const [idGetTable, setIdGetTable] = useState([])

    const deleteObjPatient = async (id)=>{
        if(!await deletePatientFromInstitute(data.institutionNumber,id/*{id:id,jobs:['secretary']}*/,data.id)){
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
            const id =await addUserFromAdmin({...details,institutes: {[data.institutionNumber]:[]}},data.emailCurrent,
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
        edit:true,add:true
        /*,value:editFormData.firstName,*/
    },{type:"text",required:"required",
        placeholder:"Enter a last name..."
        ,name:"lastName",label:"שם משפחה:",edit:true,add:true
        /*,value:editFormData.lastName,*/
    },
        {type:"date",required:"required",
            placeholder:"Enter a birth day..."
            ,name:"dateOfBirth",label: "תאריך לידה:",
            edit:true,add:true
            /*,value:editFormData.dateOfBirth,*/
        },
        {type:"text",required:"required",
            placeholder:"Enter a last city..."
            ,name:"city",label:"עיר:",edit:true,add:true
            /*,value:editFormData.city*/,
        },
        {type:"text",required:"required",
            placeholder:"Enter a last street..."
            ,name:"street",label:"רחוב:",edit:true,add:true
            /*,value:editFormData.street*/,
        },
        {type:"text",required:"required",
            placeholder:"Enter a last buildingNumber..."
            ,name:"buildingNumber",label:"מספר רחוב:",edit:true,add:true
            /*,value:editFormData.buildingNumber*/,
        },
        {type:"text",required:"required"
            ,name:"firstNameParent",label:"שם פרטי הורה:",
            edit:false,add:true
        },
        {type:"text",required:"required"
            ,name:"lastNameParent",label:"שם משפחה הורה:",
            edit:false,add:true
        },
        {type:"email",required:"required"
            ,name:"email",label:"איימיל של הורה:",
            edit:false,add:true
        },
        // {type:"text",required:"required"
        //     ,name:"gender",label:"מין",
        //     edit:true,add:true
        // }

    ]
    const inputsViewTherapist =[

        {type:"text",required:"required",
        placeholder:"Enter a first name..."
        ,name:"firstName",label:"שם פרטי:",
        edit:true,add:true
        /*,value:editFormData.firstName,*/
    },{type:"text",required:"required",
        placeholder:"Enter a last name..."
        ,name:"lastName",label:"שם משפחה:"
        , edit:true,add:true
        /*,value:editFormData.lastName,*/
    },

        {type:"text",required:"required",
            placeholder:"Enter a last city..."
            ,name:"jobs",label:"עבודות:"
            ,
            edit:true,add:true
            /*,value:editFormData.city*/,
        },
        {type:"email",required:"required"
            ,name:"email",label:"איימיל של מטפל:",
            edit:false,add:true
        },
        /*{type:"tableEdit",name:"students",label:"תלמידים:",
            edit:true
        }*/

    ]
    const HebrewNamesTableT=[
        "תעודת זהות של תלמיד" ,"שם משפחה של תלמיד","שם של תלמיד"
    ]
    async function getTable(details) {
        setIdGetTable(details.id)
        console.log('CCCCCCCCCC', details.institutes[data.institutionNumber])
        const dataStudents = await detailsPatient(details.institutes[data.institutionNumber])
        console.log('AAAAA', dataStudents)
        return dataStudents
        //data.works.institutes

    }
    const inputsViewPOfT=[
        {type:"text",required:"required",
            placeholder:"Enter a first name..."
            ,name:"firstName",label:"שם פרטי:",
            edit:false,
            add:false
            /*,value:editFormData.firstName,*/
        },{type:"text",required:"required",
            placeholder:"Enter a last name..."
            ,name:"lastName",label:"שם משפחה:",edit:false,
            add:false
            /*,value:editFormData.lastName,*/
        }
    ]
    const addConnectionToTherapist = async (details)=>{
        // console.log("EEEEEEEEEEEEEE",idGetTable)
        return   await addConnectionPatientToTherapist(idGetTable,details.id,data.institutionNumber)
    }
    const deleteConnectionToTherapist = async (id)=>{
        // console.log("EEEEEEEEEEEEEE",idGetTable)
        return await removeConnectionPatientToTherapist(idGetTable,id,data.institutionNumber)

    }


    return(
        <div className="secretary">
            <div>
                <h2>
                    עמוד מזכירה!
                </h2>
                <Router>
                    <div className='sidebarMenu'>
                        <ul className="sidebarList">
                            <Link to={"/students"} className="link">

                                <ul className="sidebarListItem">
                                    תלמידים
                                    &nbsp;

                                </ul>
                            </Link>

                            &nbsp;

                        </ul>
                        <Routes>
                            <Route path={"/students"} element={<TableEdit add ={addPatient} update ={updatesPatients} deleteObj={deleteObjPatient}
                                                                          emptyDetails={{id:"",firstName:"",lastName:"",dateOfBirth:new Date(),city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:""}} emptyEditDetails={{firstName: "",
                                lastName: "",
                                dateOfBirth:new Date()
                                ,city:"",street:"",buildingNumber:"",}} data={data.students_arr} HebrewNames={[
                                "תעודת זהות" ,"שם פרטי","שם משפחה","תאריך לידה","עיר","רחוב","מספר רחוב","שם פרטי הורה","שם משפחה הורה",,"אימייל",/*"מטפלים בית ספריים"*/]
                            } inputsView={inputsViewPatient}  requeredId={true}
                                                                          toEdit={true} toAdd={true}/>}/>

                        </Routes>
                        <ul className="sidebarList">
                            <Link to={"/works"} className="link">

                                <ul className="sidebarListItem">
                                    עובדים
                                    &nbsp;

                                </ul>
                            </Link>
                        </ul>
                        <Routes>
                            <Route path={"/works"} element={<TableEdit add ={addTherapist} update ={updateTherapist} deleteObj={deleteObjTherapist}
                                                                       emptyDetails={{firstName:"",lastName:"",jobs:[],email:"",/*table:[{id:"",firstName:"",lastName:""}]*/}}
                                                                       emptyEditDetails={{firstName:"",lastName:"",jobs:[]}} data={data.works} HebrewNames={[
                                "שם פרטי","שם משפחה","עבודות","אימייל","מטופלים בית ספריים"]
                            } inputsView={inputsViewTherapist}  requeredId={false}
                            find={findTherapist} HebrewNamesTable={HebrewNamesTableT} emptyDetailsTable={{id:"",firstName:"",lastName:""/**/}} toEdit={true} toAdd={true} table={getTable}
                                                                       inputsViewTable={inputsViewPOfT} addTable={addConnectionToTherapist} deleteObj={deleteConnectionToTherapist}
                                                                       deleteObjTable={deleteConnectionToTherapist}

                            />}/>

                        </Routes>
                    </div>

                </Router>
                {/*<RegistrationFromUser new_user={newUser}/>*/}



                {/*<RegistrationFromPatient data={data} new_patients={newPatients}/>*/}
            </div>
        </div>

    )
}