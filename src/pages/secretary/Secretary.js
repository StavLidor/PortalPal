
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
    updateDocUser, addConnectionPatientToTherapist, removeConnectionPatientToTherapist, detailsWorks, db
} from "../../firebase";
import TableData from "../../components/tableEdit/TableData";
import Patient from "../patient/Patient";
import {collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {is_israeli_id_number, validateEmail} from "../../useFunction";
// import {details_users} from "../../firebase"

export default function Secretary({data}){
    const [students,setStudents]=useState([])
    const [studentsTable,setStudentsTable]=useState([])
    const [employees,setEmployees]=useState([])
    useEffect(async () => {
        console.log('SEC')
        let docRef = doc(db, "institutes",data.institute.toString())
        getDoc(docRef).then((d)=>{
            console.log('institute',d.data())
            console.log('students',d.data().students)
            console.log('employees',d.data().employees)

            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', d.data().employees))

            onSnapshot(
                unsubscribe,
                (querySnapshot) => {
                    let data = []
                    querySnapshot.forEach((doc) => (
                        data.push({...doc.data(),id:doc.id})
                    ))
                    setEmployees(data)
                    console.log(data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
            const unsubscribe1 = query(collection(db, "patients"),
                where("id", 'in', d.data().students))
            // setStudents(d.data().students)
            // setEmployees(d.data().employees)
            onSnapshot(
                unsubscribe1,
                (querySnapshot) => {
                    let data = []
                    querySnapshot.forEach((doc) => {
                        if (typeof (doc.data().dateOfBirth) !== 'string')
                            data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
                        else
                            data.push(doc.data)
                    })
                    setStudents(data)
                    // console.log('Students1112',data)
                },
                    (error) => {
                        // TODO: Handle errors!
                        console.log('error!!', error)
                    })

        })


        //d.data().employees
        //d.data().students
    },[])
    // console.log("data students", data.students_arr)
    const [idGetTable, setIdGetTable] = useState([])

    const deleteObjPatient = async (contact/*id*/)=>{
        if(!await deletePatientFromInstitute(data.institute,contact.id/*{id:id,jobs:['secretary']}*//*,data.id*/)){
            return false
        }
        //
        return true
    }
    const deleteObjTherapist = async (contact/*id*/)=>{
        console.log('delete Therapist')

        if(!await deleteTherapistFromInstitute(data.institute,contact)){
            return false
        }
        return true
        return false
        //
    }
    const findTherapist = async (details)=>{
        return await findUserByEmail(details.email)

    }
    const addPatient = async (details, setMessages)=>{
        console.log('Messagesssss!!!!!!!!!!!! ')
        const messages={id:"",firstName:"",lastName:"",dateOfBirth:"",city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:"",gender:""}
        if(!is_israeli_id_number(details.id)){
            messages.id='הכנס תז ישראלית'
        }
        if(!validateEmail(details.email)){
            messages.email='הכנס אימייל תקין להורה'
        }
        if(!details.firstName.trim()){
            messages.firstName='הכנס שם הפרטי לתלמיד'
        }
        if(!details.lastName.trim()){
            messages.lastName='הכנס שם משפחה לתלמיד'
        }
        if(!details.lastNameParent.trim()){
            messages.lastNameParent='הכנס שם משפחה להורה'
        }
        if(!details.firstNameParent.trim()){
            messages.firstNameParent='הכנס שם פרטי להורה'
        }
        if(!details.city.trim()){
            messages.city='הכנס עיר מגורים'
        }
        if(!details.street.trim()){
            messages.street='הכנס רחוב מגורים'
        }
        if(!details.buildingNumber.trim()){
            messages.buildingNumber='הכנס מספר רחוב'
        }
        setMessages(messages)
        console.log(messages,'Messagesssss ')
        if(messages.firstName==='' && messages.lastName==='' &&
            messages.id && messages.email==='' &&
            messages.lastNameParent && messages.firstNameParent
        && messages.city===''&& messages.street===''&& messages.buildingNumber===''){
            return await newPatients({...details,institute: data.institute,dateOfBirth:firebase.firestore.Timestamp.fromDate(new Date(details.dateOfBirth))
            })
        }
        return null
        //id:"",firstName:"",lastName:"",dateOfBirth:new Date(),buildingNumber:"",firstNameParent:"",lastNameParent:""
        //details.dateOfBirth =firebase.firestore.Timestamp.fromDate(new Date(details.dateOfBirth))

        //
    }
    const addTherapist = async(details, setMessages) => {
        const messages={email:"",firstName:"",lastName:"",jobs:""}
        if(!validateEmail(details.email)){
            messages.email='הכנס אימייל תקין'
        }
        if(!details.firstName.trim()){
            messages.firstName='הכנס שם פרטי למטפל'
        }
        if(!details.lastName.trim()){
            messages.lastName='הכנס שם משפחה למטפל'
        }
        setMessages(messages)
        details.jobs =details.jobs.split(",")
        if(messages.firstName==='' && messages.lastName==='' && messages.email===''){
            const id =await addUserFromAdmin(details,data.institute)
            return id
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
        {type:"text",required:"required",options:['זכר','נקבה',
               'אחר']
            ,name:"gender",label:"מין",
            edit:true,add:true
        }

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
        "תעודת זהות של תלמיד" ,"קשר","שם משפחה של תלמיד","שם של תלמיד"
    ]
    async function getTable(details) {
        if(details === null){
            setStudentsTable([])
            return
        }

        setIdGetTable(details.id)
        console.log('CCCCCCCCCC', details.institutes[data.institute])
        const unsubscribe = query(collection(db, "patients"),
            where(firebase.firestore.FieldPath.documentId(), 'in',details.institutes[data.institute]))
        // setStudents(d.data().students)
        // setEmployees(d.data().employees)
        onSnapshot(
            unsubscribe,
            (querySnapshot) => {
                let data = []
                querySnapshot.forEach((doc) => (
                    data.push({...doc.data(),dateOfBirth:doc.data().dateOfBirth.toDate().toUTCString()})
                ))
                setStudentsTable(data)
                console.log(data)
            },
            (error) => {
                // TODO: Handle errors!
                console.log('error!!', error)
            })
        const dataStudents = await detailsPatient(details.institutes[data.institute])
        console.log('AAAAA', dataStudents)
        return dataStudents
        //data.works.institutes

    }
    const inputsViewPOfT=[
        {type:"text",required:"required",
            placeholder:"Enter a connection between therapist and patients..."
            ,name:"connection",label:"קשר:",
            edit:true,
            add:true
            /*,value:editFormData.firstName,*/
        },
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
    const addConnectionToTherapist = async (details, setMessages)=>{
        console.log("EEEEEEEEEEEEEE",idGetTable)
        // TODO: add csv and to inputs of this connections part.
        setMessages({id:"",connection:""})
        return   await addConnectionPatientToTherapist(idGetTable,details.id,data.institute,details.connection)
    }
    const deleteConnectionToTherapist = async (contact/*id*/)=>{
        // console.log("EEEEEEEEEEEEEE",idGetTable)
        return await removeConnectionPatientToTherapist(idGetTable,contact.id,data.institute)

    }


    return(
        <div className="secretary">
            <div>
                <h2>
                    עמוד מזכירה!
                </h2>
                <Router>
                    <div className='sidebarMenu'>

                            <div>
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
                            <Route path={"/students"} element={<TableData add ={addPatient} update ={updatesPatients} deleteObj={deleteObjPatient}
                                                                          emptyDetails={{id:"",firstName:"",lastName:"",dateOfBirth:new Date(),city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:"",gender:"זכר"}} emptyEditDetails={{firstName: "",
                            lastName: "",
                            dateOfBirth:new Date()
                            ,city:"",street:"",buildingNumber:"",gender:"זכר"}} data={students} HebrewNames={[
                            "תעודת זהות" ,"שם פרטי","שם משפחה","תאריך לידה","עיר","רחוב","מספר רחוב","שם פרטי הורה","שם משפחה הורה","אימייל",'מין'/*"מטפלים בית ספריים"*/]
                        } inputsView={inputsViewPatient} requiredId={true}/>}/>

                            </Routes>
                            </div>


                            <div>
                            <ul className="sidebarList">
                                <Link to={"/works"} className="link">

                                    <ul className="sidebarListItem">
                                        עובדים
                                        &nbsp;

                                    </ul>
                                </Link>
                            </ul>
                            <Routes>
                            <Route path={"/works"} element={<TableData add ={addTherapist} update ={updateTherapist} deleteObj={deleteObjTherapist
                                }
                            //     email: string
                            // firstName: string
                            // lastName: string
                            // jobs: [] (therapist only)
                            // license only external therapist
                            // titles: [parent / therapist / admin]
                            // institute: string (admin only)
                            // institutes: {1: ...patients.  external:...patients.} (therapist only)
                            // childrenIds: [] (parent only)
                                                                       emptyDetails={{firstName:"",lastName:"",jobs:[],email:"",/*table:[{id:"",firstName:"",lastName:""}]*/}}
                                                                       emptyEditDetails={{firstName:"",lastName:"",jobs:[]}} data={employees} HebrewNames={[
                            "שם פרטי","שם משפחה","עבודות","אימייל","מטופלים בית ספריים"]
                        } inputsView={inputsViewTherapist} requeredId={false}
                                                                       find={findTherapist} HebrewNamesTable={HebrewNamesTableT} emptyDetailsTable={{id:"",connection:"",lastName:"",firstName:""/**/}} toEdit={true} toAdd={true} getTable={getTable}
                                                                       table={studentsTable}
                                                                       inputsViewTable={inputsViewPOfT} addTable={addConnectionToTherapist
                                /*(d)=>{console.log('DD',d)}*/} /*deleteObj={deleteConnectionToTherapist}*/
                                                                       deleteObjTable={deleteConnectionToTherapist}

                            />}/>

                            </Routes>
                            </div>

                    </div>

                </Router>
                {/*<RegistrationFromUser new_user={newUser}/>*/}



                {/*<RegistrationFromPatient data={data} new_patients={newPatients}/>*/}
            </div>
        </div>

    )
}