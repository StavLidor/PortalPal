import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {
    addConnectionPatientToTherapist,
    addUserFromAdmin,
    db, deletePatientFromInstitute,
    deleteTherapistFromInstitute, detailsPatient,
    findUserByEmail, removeConnectionPatientToTherapist,
    signOutCurrentUser, updateIDDoc, updatesPatients,
    updatesUser
} from "./firebase";
import {Link, Route, Routes} from "react-router-dom";
import PatientDetails from "./components/sidebar/PatientDetails";
import TableData from "./components/tableEdit/TableData";
import {collection, doc, getDoc, onSnapshot, query, where} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {newPatients} from "./pepole/users/user";
import se from "react-datepicker";


// import {details_users} from "../../firebase"


function SecretaryPage({data}) {
    const [students, setStudents] = useState([])
    const [employees, setEmployees] = useState([])
    const [studentsTable, setStudentsTable] = useState([])
    const [idGetTable, setIdGetTable] = useState([])
    const [idEmployees, setIdEmployees] = useState([])
    const [idStudents, setIdStudents] = useState([])
    const [listenerEmployees, setListenerEmployees] = useState(null)
    const [listenerStudents, setListenerStudents] = useState(null)

    useEffect(() => {
        if (listenerEmployees !== null) {
            console.log("קקי")
            listenerEmployees()
        }
        if (idEmployees.length > 0) {
            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', idEmployees))
            // setListenerEmployees(unsubscribe)
            // TODO: needed the return?
            const resultEmployee =
                onSnapshot(
                    unsubscribe,
                    (querySnapshot) => {
                        let data = []
                        querySnapshot.forEach((doc) => (
                            data.push({...doc.data(), id: doc.id})
                        ))
                        setEmployees(data)

                        console.log("DATA HERE:", data)
                        console.log("EMPLOYEES HERE:", employees)
                    },
                    (error) => {
                        // TODO: Handle errors!
                        console.log('error!!', error)
                    }
                )
            console.log("result: ", resultEmployee)
            setListenerEmployees(() => resultEmployee)
            console.log("listenerEmployees: ", listenerEmployees)
        }

        // if (idStudents.length > 0) {
        //     const unsubscribe1 = query(collection(db, "patients"),
        //         where("id", 'in', d.data().students))
        //     // setStudents(d.data().students)
        //     // setEmployees(d.data().employees)
        //
        //     // TODO: needed the return?
        //     onSnapshot(
        //         unsubscribe1,
        //         (querySnapshot) => {
        //             let data = []
        //             querySnapshot.forEach((doc) => {
        //                 if (typeof (doc.data().dateOfBirth) !== 'string')
        //                     data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
        //                 else
        //                     data.push(doc.data)
        //             })
        //             setStudents(data)
        //             console.log('Students1112', data)
        //         },
        //         (error) => {
        //             // TODO: Handle errors!
        //             console.log('error!!', error)
        //         })
        // }


    }, [idEmployees])

    useEffect(() => {
        if (listenerStudents !== null) {
            console.log("קקי תלמיד")
            listenerStudents()
        }

        if (idStudents.length > 0) {
            const unsubscribe1 = query(collection(db, "patients"),
                where("id", 'in', idStudents))
            // setStudents(d.data().students)
            // setEmployees(d.data().employees)

            // TODO: needed the return?
            const resultStudent =onSnapshot(
                unsubscribe1,
                (querySnapshot) => {
                    let data = []
                    querySnapshot.forEach((doc) => {
                        data.push(doc.data())
                        // if (typeof (doc.data().dateOfBirth) !== 'string')
                        //     // data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
                        //     data.push(doc.data())
                        // else
                        //     data.push(doc.data())
                    })
                    setStudents(data)
                    console.log('Students1112', data)
                },
                (error) => {
                    // TODO: Handle errors!
                    console.log('error!!', error)
                })
            console.log("result: ", resultStudent)
            setListenerStudents(() => resultStudent)
            console.log("listenerStudents: ", listenerStudents)
        }


    }, [idStudents])

    useEffect(async () => {
        console.log('SEC')
        let docRef = doc(db, "institutes", data.institute.toString())

        onSnapshot(docRef, (d) => {

            // console.log('institute',d.data())
            // console.log('students',d.data().students)
            // console.log('employees',d.data().employees)
            if (d.data().employees !== idEmployees) {
                setIdEmployees(d.data().employees)
                setIdStudents(d.data().students)
                console.log("listener: ", listenerEmployees)

                console.log("d.data().employees: ", d.data().employees)
                // const unsubscribe = query(collection(db, "users"),
                //     where(firebase.firestore.FieldPath.documentId(), 'in', d.data().employees))
                // // setListenerEmployees(unsubscribe)
                // // TODO: needed the return?
                // const result =
                //     onSnapshot(
                //         unsubscribe,
                //         (querySnapshot) => {
                //             // if (listenerEmployees !== null) {
                //             //     console.log("קקי")
                //             //     listenerEmployees()()
                //             // }
                //
                //             let data = []
                //             querySnapshot.forEach((doc) => (
                //                 data.push({...doc.data(), id: doc.id})
                //             ))
                //             setEmployees(data)
                //
                //             console.log("DATA HERE:", data)
                //             console.log("EMPLOYEES HERE:", employees)
                //         },
                //         (error) => {
                //             // TODO: Handle errors!
                //             console.log('error!!', error)
                //         }
                //     )
                // console.log("result: ", result)
                // setListenerEmployees(() => result)
                // console.log("listenerEmployees: ", listenerEmployees)

            }

            // setListenerEmployees([result])


            // const unsubscribe1 = query(collection(db, "patients"),
            //     where("id", 'in', d.data().students))
            // // setStudents(d.data().students)
            // // setEmployees(d.data().employees)
            //
            // // TODO: needed the return?
            // onSnapshot(
            //     unsubscribe1,
            //     (querySnapshot) => {
            //         let data = []
            //         querySnapshot.forEach((doc) => {
            //             if (typeof (doc.data().dateOfBirth) !== 'string')
            //                 data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
            //             else
            //                 data.push(doc.data)
            //         })
            //         setStudents(data)
            //         console.log('Students1112', data)
            //     },
            //     (error) => {
            //         // TODO: Handle errors!
            //         console.log('error!!', error)
            //     })

        })


        //d.data().employees
        //d.data().students
    }, [])

    const addPatient = async (details) => {
        //details.dateOfBirth =firebase.firestore.Timestamp.fromDate(new Date(details.dateOfBirth))
        return await newPatients({
            ...details,
            institute: data.institute,
            dateOfBirth: firebase.firestore.Timestamp.fromDate(new Date(details.dateOfBirth))
        })
        //
    }
    const addTherapist = async (details) => {
        if (details.jobs !== undefined) {
            console.log('JOBBBBBBBBS', details.jobs)
            details.jobs = details.jobs.split(",")
        }
        if (details.email !== undefined) {
            const id = await addUserFromAdmin(details, data.institute)
            return id
            const p = Promise.resolve(id)

            p.then(async id => {

                console.log('SEEEEEEEEC', id)
                return id
            })
            console.log('IDDDD INN', id)
        }
        return null

    }
    const updatesPatients = async (id, data) => {
        // if('dateOfBirth' in data)
        //     data.dateOfBirth= firebase.firestore.Timestamp.fromDate(new Date(data.dateOfBirth))
        if ('dateOfBirth' in data)
            if (await updateIDDoc(id, 'patients', {
                ...data,
                // dateOfBirth: firebase.firestore.Timestamp.fromDate(new Date(data.dateOfBirth))
                dateOfBirth: firebase.firestore.Timestamp.fromDate(new Date(data.dateOfBirth))
            }))
                return true
            else if (await updateIDDoc(id, 'patients', data))
                return true
        return false
        //
    }
    const updateTherapist = async (id, details) => {
        console.log('edit details', details)
        if (typeof (details.jobs) === "string") {
            details.jobs = details.jobs.split(",")
        }

        return await updatesUser(id, {firstName: details.firstName, lastName: details.lastName, jobs: details.jobs})
    }
    const deleteObjTherapist = async (contact/*id*/) => {
        console.log('delete Therapist')

        if (!await deleteTherapistFromInstitute(data.institute, contact)) {
            return false
        }
        return true
        return false
        //
    }
    const deleteObjPatient = async (contact/*id*/) => {
        if (!await deletePatientFromInstitute(data.institute, contact.id/*{id:id,jobs:['secretary']}*//*,data.id*/)) {
            return false
        }
        //
        return true
    }
    const columnsViewTherapist = [

        {
            type: "text", required: "required",
            placeholder: "Enter a first name..."
            , name: "firstName", label: "שם פרטי:",
            edit: true, add: true, view: true
            /*,value:editFormData.firstName,*/
        }, {
            type: "text", required: "required",
            placeholder: "Enter a last name..."
            , name: "lastName", label: "שם משפחה:"
            , edit: true, add: true, view: true
            /*,value:editFormData.lastName,*/
        },

        {
            type: "text", required: "required",
            placeholder: "Enter a last city..."
            , name: "jobs", label: "עבודות:"
            ,
            edit: true, add: true, view: true
            /*,value:editFormData.city*/,
        },
        {
            type: "email", required: "required"
            , name: "email", label: "איימיל של מטפל:",
            edit: false, add: true, view: true
        },
        /*{type:"tableEdit",name:"students",label:"תלמידים:",
            edit:true
        }*/

    ]
    const columnsViewPatient = [{
        type: "text", required: "required",
        placeholder: "Enter a first name..."
        , name: "firstName", label: "שם פרטי:",
        edit: true, add: true, view: true
        /*,value:editFormData.firstName,*/
    }, {
        type: "text", required: "required",
        placeholder: "Enter a last name..."
        , name: "lastName", label: "שם משפחה:", edit: true, add: true, view: true
        /*,value:editFormData.lastName,*/
    },
        {
            type: "date", required: "required",
            placeholder: "Enter a birth day..."
            , name: "dateOfBirth", label: "תאריך לידה:",
            edit: true, add: true, view: true
            /*,value:editFormData.dateOfBirth,*/
        },
        {
            type: "text", required: "required", options: ['זכר', 'נקבה',
                'אחר']
            , name: "gender", label: "מגדר",
            edit: true, add: true, view: true
        },
        {
            type: "text", required: "required",
            placeholder: "Enter a last city..."
            , name: "city", label: "עיר:", edit: true, add: true, view: true
            /*,value:editFormData.city*/,
        },
        {
            type: "text", required: "required",
            placeholder: "Enter a last street..."
            , name: "street", label: "רחוב:", edit: true, add: true, view: true
            /*,value:editFormData.street*/,
        },
        {
            type: "text", required: "required",
            placeholder: "Enter a last buildingNumber..."
            , name: "buildingNumber", label: "מספר רחוב:", edit: true, add: true, view: true
            /*,value:editFormData.buildingNumber*/,
        },
        {
            type: "text", required: "required"
            , name: "firstNameParent", label: "שם פרטי הורה:",
            edit: false, add: true, view: false
        },
        {
            type: "text", required: "required"
            , name: "lastNameParent", label: "שם משפחה הורה:",
            edit: false, add: true, view: false
        },
        {
            type: "email", required: "required"
            , name: "email", label: "איימיל של הורה:",
            edit: false, add: true, view: false
        },


    ]
    const findTherapist = async (details) => {
        return await findUserByEmail(details.email)

    }
    const HebrewNamesTableT = [
        "תעודת זהות של תלמיד", "קשר", "שם משפחה של תלמיד", "שם של תלמיד"
    ]

    async function getTable(details) {
        if (details === null) {
            setStudentsTable([])
            return
        }

        setIdGetTable(details.id)
        console.log('CCCCCCCCCC', details.institutes[data.institute])
        const unsubscribe = query(collection(db, "patients"),
            where(firebase.firestore.FieldPath.documentId(), 'in', details.institutes[data.institute]))
        // setStudents(d.data().students)
        // setEmployees(d.data().employees)
        onSnapshot(
            unsubscribe,
            (querySnapshot) => {
                let data = []
                querySnapshot.forEach((doc) => (
                    data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
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

    const inputsViewPOfT = [
        {
            type: "text", required: "required",
            placeholder: "Enter a connection between therapist and patients..."
            , name: "connection", label: "קשר:",
            edit: true,
            add: true
            /*,value:editFormData.firstName,*/
        },
        {
            type: "text", required: "required",
            placeholder: "Enter a first name..."
            , name: "firstName", label: "שם פרטי:",
            edit: false,
            add: false
            /*,value:editFormData.firstName,*/
        }, {
            type: "text", required: "required",
            placeholder: "Enter a last name..."
            , name: "lastName", label: "שם משפחה:", edit: false,
            add: false
            /*,value:editFormData.lastName,*/
        }
    ]
    const addConnectionToTherapist = async (details) => {
        console.log("EEEEEEEEEEEEEE", idGetTable)
        // TODO: add csv and to inputs of this connections part.
        return await addConnectionPatientToTherapist(idGetTable, details.id, data.institute, details.connection)
    }
    const deleteConnectionToTherapist = async (contact/*id*/) => {
        // console.log("EEEEEEEEEEEEEE",idGetTable)
        return await removeConnectionPatientToTherapist(idGetTable, contact.id, data.institute)

    }


    return (
        <div>
            <Row className="border border-secondary rounded" style={{minHeight: 400}}>
                <Routes>
                    <Route path="employees"
                           element={<TableData type="עובד" add={addTherapist} update={updateTherapist}
                                               deleteObj={deleteObjTherapist
                                               }
                                               emptyDetails={{
                                                   firstName: "",
                                                   lastName: "",
                                                   jobs: [],
                                                   email: "",/*table:[{id:"",firstName:"",lastName:""}]*/
                                               }}
                                               emptyEditDetails={{firstName: "", lastName: "", jobs: []}}
                                               data={employees} HebrewNames={[
                               "שם פרטי", "שם משפחה", "עבודות", "אימייל"]
                           } columnsInfoView={columnsViewTherapist} requiredId={false}
                                               find={findTherapist} HebrewNamesTable={HebrewNamesTableT}
                                               emptyDetailsTable={{
                                                   id: "",
                                                   connection: "",
                                                   lastName: "",
                                                   firstName: ""/**/
                                               }} getTable={getTable}
                                               table={studentsTable}
                                               inputsViewTable={inputsViewPOfT} addTable={addConnectionToTherapist
                               /*(d)=>{console.log('DD',d)}*/} /*deleteObj={deleteConnectionToTherapist}*/
                                               deleteObjTable={deleteConnectionToTherapist}

                           />}/>
                </Routes>

                <Routes>
                    <Route path="students"
                           element={<TableData type="תלמיד" add={addPatient} update={updatesPatients}
                                               deleteObj={deleteObjPatient}
                                               emptyDetails={{
                                                   id: "",
                                                   firstName: "",
                                                   lastName: "",
                                                   dateOfBirth: new Date(),
                                                   city: "",
                                                   street: "",
                                                   buildingNumber: "",
                                                   firstNameParent: "",
                                                   lastNameParent: "",
                                                   email: "",
                                                   gender: "זכר"
                                               }} emptyEditDetails={{
                               firstName: "",
                               lastName: "",
                               dateOfBirth: new Date()
                               , city: "", street: "", buildingNumber: "", gender: "זכר"
                           }} data={students} HebrewNames={[
                               "תעודת זהות", "שם פרטי", "שם משפחה", "תאריך לידה", "מגדר" ,"עיר", "רחוב", "מספר רחוב"]
                           } columnsInfoView={columnsViewPatient} requiredId={true}
                                             />}/>
                </Routes>

            </Row>
        </div>
    )

}

export default SecretaryPage
