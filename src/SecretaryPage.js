import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {
    addConnectionPatientToTherapist,
    addUserFromAdmin,
    db,
    deleteTherapistFromInstitute, detailsPatient,
    findUserByEmail, removeConnectionPatientToTherapist,
    signOutCurrentUser,
    updatesUser
} from "./firebase";
import {Link, Route, Routes} from "react-router-dom";
import PatientDetails from "./components/sidebar/PatientDetails";
import TableData from "./components/tableEdit/TableData";
import {collection, doc, getDoc, onSnapshot, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";


// import {details_users} from "../../firebase"


function SecretaryPage({data}) {
    const [students,setStudents]=useState([])
    const [employees,setEmployees]=useState([])
    const [studentsTable,setStudentsTable]=useState([])
    const [idGetTable, setIdGetTable] = useState([])

    useEffect(async () => {
        console.log('SEC')
        let docRef = doc(db, "institutes",data.institute.toString())
        return onSnapshot(docRef,(d) => {
            // console.log('institute',d.data())
            // console.log('students',d.data().students)
            // console.log('employees',d.data().employees)

            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', d.data().employees))
            // TODO: needed the return?
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

            // TODO: needed the return?
            return onSnapshot(
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
                    console.log('Students1112',data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })

        })


        //d.data().employees
        //d.data().students
    },[])

    const addTherapist = async(details) => {
        if(details.jobs!==undefined){
            console.log('JOBBBBBBBBS',details.jobs)
            details.jobs =details.jobs.split(",")
        }
        if (details.email!==undefined){
            const id =await addUserFromAdmin(details,data.institute)
            return id
            const p=Promise.resolve(id)

            p.then(async id => {

                console.log('SEEEEEEEEC',id)
                return id
            })
            console.log('IDDDD INN',id)
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
    const deleteObjTherapist = async (contact/*id*/)=>{
        console.log('delete Therapist')

        if(!await deleteTherapistFromInstitute(data.institute,contact)){
            return false
        }
        return true
        return false
        //
    }
    const columnsViewTherapist =[

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
    const findTherapist = async (details)=>{
        return await findUserByEmail(details.email)

    }
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
    const addConnectionToTherapist = async (details)=>{
        console.log("EEEEEEEEEEEEEE",idGetTable)
        // TODO: add csv and to inputs of this connections part.
        return   await addConnectionPatientToTherapist(idGetTable,details.id,data.institute,details.connection)
    }
    const deleteConnectionToTherapist = async (contact/*id*/)=>{
        // console.log("EEEEEEEEEEEEEE",idGetTable)
        return await removeConnectionPatientToTherapist(idGetTable,contact.id,data.institute)

    }


    return (
        <div>
            <Row className="border border-secondary rounded" style={{minHeight: 400}}>
                <Routes>
                    <Route path="employees"
                           element={<TableData type="עובד" add ={addTherapist} update ={updateTherapist} deleteObj={deleteObjTherapist
                           }
                                               emptyDetails={{firstName:"",lastName:"",jobs:[],email:"",/*table:[{id:"",firstName:"",lastName:""}]*/}}
                                               emptyEditDetails={{firstName:"",lastName:"",jobs:[]}} data={employees} HebrewNames={[
                               "שם פרטי","שם משפחה","עבודות","אימייל","מטופלים בית ספריים"]
                           } columnsInfoView={columnsViewTherapist} requiredId={false}
                                               find={findTherapist} HebrewNamesTable={HebrewNamesTableT} emptyDetailsTable={{id:"",connection:"",lastName:"",firstName:""/**/}} toEdit={true} toAdd={true} getTable={getTable}
                                               table={studentsTable}
                                               inputsViewTable={inputsViewPOfT} addTable={addConnectionToTherapist
                               /*(d)=>{console.log('DD',d)}*/} /*deleteObj={deleteConnectionToTherapist}*/
                                               deleteObjTable={deleteConnectionToTherapist}

                           />}/>
                </Routes>

                <Routes>
                    <Route path="students"
                           element={<h2>העובדים שלנו</h2>}/>
                </Routes>

            </Row>
        </div>
    )

}

export default SecretaryPage
