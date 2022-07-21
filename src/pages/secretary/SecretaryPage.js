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
} from "../../firebase";
import {Link, Route, Routes} from "react-router-dom";
import PatientDetails from "../../components/patientsSidebar/PatientDetails";
import TableData from "../../components/tableEdit/TableData";
import {collection, doc, getDoc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {newPatients} from "../../pepole/users/user";
import se from "react-datepicker";
import {is_israeli_id_number, validateEmail} from "../../useFunction";


// import {details_users} from "../../firebase"


function SecretaryPage({data,dictInstitutes}) {
    const [students, setStudents] = useState([])
    const [employees, setEmployees] = useState([])
    const [studentsTable, setStudentsTable] = useState([])
    const [userGetTable, setUserGetTable] = useState([])
    const [idEmployees, setIdEmployees] = useState([])
    const [idStudents, setIdStudents] = useState([])
    const [listenerEmployees, setListenerEmployees] = useState(null)
    const [listenerStudents, setListenerStudents] = useState(null)
    const [listenersTableStudents, setListenersTableStudents] = useState([])
    const [studentTable, setStudentTable] = useState(null)
    const [reloadStudents,setReloadStudents]=useState(true)
    const [reloadEmployees,setReloadEmployees]=useState(true)
    const [isEmptyEmployees,setIsEmptyEmployees]=useState(false)
    const [isEmptyStudents,setIsEmptyStudents]=useState(false)
    const [isEmptyTable,setIsEmptyTable]=useState(false)
    // const [reloadTable,setReloadTable]=useState(true)
    useEffect(() => {
        if(studentTable!==null){
            const index = studentsTable.findIndex((s) => s.id === studentTable.id)
            if(index === -1){
                if(studentTable.active){
                    setStudentsTable( [...studentsTable,studentTable])
                    if(isEmptyTable===true){
                        setIsEmptyTable(false)
                    }
                }
            }
            else{
                const arr=[...studentsTable]
                if(!studentTable.active){
                    arr.splice(index, 1)
                }
                else{
                    arr[index]=studentTable
                }

                setStudentsTable(arr)
                if(arr.length===0&& isEmptyTable===false){
                    setIsEmptyTable(true)
                }
            }

        }
    },[studentTable])
    useEffect(() => {
        if (listenerEmployees !== null) {
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
                        setReloadEmployees(false)


                    },
                    (error) => {
                        // TODO: Handle errors!
                    }
                )
            setListenerEmployees(() => resultEmployee)
        }
        else {
            setEmployees([])
        }

    }, [idEmployees])

    useEffect(() => {
        if (listenerStudents !== null) {
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
                        data.push({...doc.data(),information:doc.data().firstName +" "+doc.data().lastName})
                        // if (typeof (doc.data().dateOfBirth) !== 'string')
                        //     // data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
                        //     data.push(doc.data())
                        // else
                        //     data.push(doc.data())
                    })
                    setStudents(data)
                    setReloadStudents(false)
                    //  const index = studentsTable.findIndex((s) => s.id === doc.id)
                    // studentsTable[index]=doc.data()
                },
                (error) => {
                    // TODO: Handle errors!
                })
            setListenerStudents(() => resultStudent)
        }
        else {
            setStudents([])
        }


    }, [idStudents])

    useEffect(async () => {
        let docRef = doc(db, "institutes", data.institute.toString())

        onSnapshot(docRef, (d) => {

            if (d.data().employees !== idEmployees) {

                setIdEmployees(d.data().employees)
                if(d.data().employees.length ===0){
                    setIsEmptyEmployees(true)
                }
                else {
                    setIsEmptyEmployees(false)
                }
                setIdStudents(d.data().students)
                if(d.data().students.length ===0){
                    setIsEmptyStudents(true)
                }
                else {
                    setIsEmptyStudents(false)
                }



            }

        })
    }, [])

    const addPatient = async (details, setMessages)=>{

        const messages={id:"",firstName:"",lastName:"",dateOfBirth:"",city:"",street:"",buildingNumber:"",firstNameParent:"",lastNameParent:"",email:"",gender:""}
        if(!details.id.trim()||!is_israeli_id_number(details.id)){
            messages.id='הכנס תז ישראלית'
        }
        if(idStudents.includes(details.id)){
            messages.id='קיים תלמיד במוסד עם תז זאת'
        }
        if(!validateEmail(details.email)){
            messages.email='הכנס אימייל תקין להורה'
        }
        if(!details.dateOfBirth.trim()|| isNaN(Date.parse(details.dateOfBirth))){
            messages.dateOfBirth='הכנס תאריך לידה חוקי YYYY-MM-DD'
        }
        if(!details.diagnosticCode.trim()){
            messages.diagnosticCode='הכנס קוד אבחון'
        }
        if(!details.firstName.trim()){
            messages.firstName='הכנס שם פרטי לתלמיד'
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
        if(!messages.firstName.trim() && !messages.lastName.trim() &&
            !messages.id.trim() && !messages.email.trim() &&
            !messages.lastNameParent.trim() && !messages.firstNameParent.trim()
            && !messages.city.trim()&& !messages.street.trim()&& !messages.buildingNumber.trim()
        &&  !messages.dateOfBirth.trim()){
            return await newPatients({...details,institute: data.institute,dateOfBirth:firebase.firestore.Timestamp.fromDate(new Date(details.dateOfBirth))
            })
        }
        return null
        //id:"",firstName:"",lastName:"",dateOfBirth:new Date(),buildingNumber:"",firstNameParent:"",lastNameParent:""
        //details.dateOfBirth =firebase.firestore.Timestamp.fromDate(new Date(details.dateOfBirth))

        //
    }
    // const addTherapist = async (details) => {
    //     if (details.jobs !== undefined) {
    //         details.jobs = details.jobs.split(",")
    //     }
    //     if (details.email !== undefined) {
    //         const id = await addUserFromAdmin(details, data.institute)
    //         return id
    //         const p = Promise.resolve(id)
    //
    //         p.then(async id => {
    //
    //             return id
    //         })
    //     }
    //     return null
    //
    // }
    const addTherapist = async(details, setMessages) => {
        const messages={email:"",firstName:"",lastName:"",jobs:""}
        if(!validateEmail(details.email)){
            messages.email='הכנס אימייל תקין'
        }
        if(employees.findIndex((e) => e.email === details.email)!==-1){
            messages.email='קיים עובד עם אימייל זה במערכת '
        }
        if(!details.firstName.trim()){
            messages.firstName='הכנס שם פרטי למטפל'
        }
        if(!details.lastName.trim()){
            messages.lastName='הכנס שם משפחה למטפל'
        }
        if(!details.jobs.trim()){
            messages.jobs='הכנס את תפקדים שלו'
        }
        // else {
        //     details.jobs =details.jobs.split(",")
        // }
        setMessages(messages)

        if(!messages.firstName.trim() && !messages.lastName.trim()&& !messages.jobs.trim()
        &&!messages.email.trim()){
            // details.jobs =details.jobs.split(",")
            const id =await addUserFromAdmin({...details,jobs:details.jobs.split(",")},data.institute)
            return id
        }
        return null
    }
    const updatesPatients = async (id, data) => {
        // if('dateOfBirth' in data)
        //     data.dateOfBirth= firebase.firestore.Timestamp.fromDate(new Date(data.dateOfBirth))
        let update={...data}
        if('information'in data){
            delete update.information
        }
        if ('dateOfBirth' in data)
            if (await updateIDDoc(id, 'patients', {
                ...update,
                // dateOfBirth: firebase.firestore.Timestamp.fromDate(new Date(data.dateOfBirth))
                dateOfBirth: firebase.firestore.Timestamp.fromDate(new Date(data.dateOfBirth))
            }))
                return true
            else if (await updateIDDoc(id, 'patients',update))
                return true
        return false
        //
    }
    const updateTherapist = async (id, details) => {
        if (typeof (details.jobs) === "string") {
            details.jobs = details.jobs.split(",")
        }

        return await updatesUser(id, {firstName: details.firstName, lastName: details.lastName, jobs: details.jobs})
    }
    const deleteObjTherapist = async (contact/*id*/) => {

        if (!await deleteTherapistFromInstitute(data.institute, contact)) {
            return false
        }
        return true
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
            placeholder: "הכנס שם פרטי..."
            , name: "firstName", label: "שם פרטי:",
            edit: true, add: true, view: true
            /*,value:editFormData.firstName,*/
        }, {
            type: "text", required: "required",
            placeholder: "הכנס שם משפחה..."
            , name: "lastName", label: "שם משפחה:"
            , edit: true, add: true, view: true
            /*,value:editFormData.lastName,*/
        },

        {
            type: "text", required: "required",
            placeholder: "הכנס עיר..."
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
        placeholder: "הכנס שם פרטי..."
        , name: "firstName", label: "שם פרטי:",
        edit: true, add: true, view: true
        /*,value:editFormData.firstName,*/
    }, {
        type: "text", required: "required",
        placeholder: "הכנס שם משפחה..."
        , name: "lastName", label: "שם משפחה:", edit: true, add: true, view: true
        /*,value:editFormData.lastName,*/
    },
        {
            type: "date", required: "required",
            placeholder: "הכנס תאריך לידה..."
            , name: "dateOfBirth", label: "תאריך לידה:",
            edit: true, add: true, view: true
            /*,value:editFormData.dateOfBirth,*/
        },
        {
            type: "text", required: "required", options: ['זכר', 'נקבה',
                'אחר']
            , name: "gender", label: "הכנס מגדר...",
            edit: true, add: true, view: true
        },
        {
            type: "text", required: "required",
            placeholder: "הכנס קוד אבחון..."
            , name: "diagnosticCode", label: "קוד אבחון:", edit: true, add: true, view: true
            /*,value:editFormData.lastName,*/
        },

        {
            type: "text", required: "required",
            placeholder: "הכניס עיר..."
            , name: "city", label: "עיר:", edit: true, add: true, view: true
            /*,value:editFormData.city*/,
        },
        {
            type: "text", required: "required",
            placeholder: "הכנס עיר..."
            , name: "street", label: "רחוב:", edit: true, add: true, view: true
            /*,value:editFormData.street*/,
        },
        {
            type: "text", required: "required",
            placeholder: "הכנס מספר רחוב..."
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
        "תעודת זהות של תלמיד","שם משפחה של תלמיד","שם של תלמיד","קשר"
    ]

    async function getTable(details) {

        if (details === null) {
            setStudentsTable([])
            setUserGetTable(null)
            listenersTableStudents.map((l)=>{
                l()

            })
            setListenersTableStudents([])
            return
        }

        setUserGetTable(details)
        let arrSnapshot=[]
        if(details.institutes[data.institute].length === 0){
            setIsEmptyTable(true)
        }
        else {
            setIsEmptyTable(false)
        }

        details.institutes[data.institute].map((id)=>{

            const index = students.findIndex((s) => s.id === id)
            if(index!=-1){

                let docRef = doc(db, "patients/" + id + "/therapists",details.id)
                let resultSnap=onSnapshot(docRef, (d) => {
                    setStudentTable({...students[index],connection:d.data().connection,active:
                        d.data().active})
                    // setStudentsTable([...studentsTable,{...students[index],connection:d.data().connection}])
                    // arrStudents.push(students[index])
                })
                arrSnapshot.push(() => resultSnap)
            }


        })
        setListenersTableStudents(arrSnapshot)
        // setStudentsTable(arrStudents)
        // const unsubscribe = query(collection(db, "patients"),
        //     where(firebase.firestore.FieldPath.documentId(), 'in', details.institutes[data.institute]))
        // // setStudents(d.data().students)
        // // setEmployees(d.data().employees)
        // onSnapshot(
        //     unsubscribe,
        //     (querySnapshot) => {
        //         let data = []
        //         querySnapshot.forEach((doc) => (
        //             data.push({...doc.data(), dateOfBirth: doc.data().dateOfBirth.toDate().toUTCString()})
        //         ))
        //         setStudentsTable(data)
        //     },
        //     (error) => {
        //         // TODO: Handle errors!
        //     })
        // const dataStudents = await detailsPatient(details.institutes[data.institute])
        // return dataStudents
        //data.works.institutes

    }

    const inputsViewPOfT = [

        {
            type: "text", required: "required",
            placeholder: "הכנס שם פרטי..."
            , name: "firstName", label: "שם פרטי:",
            edit: false,view: true,
            add: false
            /*,value:editFormData.firstName,*/
        }, {
            type: "text", required: "required",
            placeholder: "הכנס שם משפחה..."
            , name: "lastName", label: "שם משפחה:", edit: false,
            add: false,view: true
            /*,value:editFormData.lastName,*/
        },
        {
            type: "text", required: "required",
            placeholder: "הכנס את קשר בין תלמיד לעובד..."
            , name: "connection", label: "קשר:",
            edit: true,
            add: true,view: true
            /*,value:editFormData.firstName,*/
        },
    ]
    const addConnectionToTherapist = async (details,setMessages) => {
        const messages ={id:"",connection:""}
        if(!details.connection.trim()){
            messages.connection='הכנס קשר'
        }
        if(!details.id.trim()){
            messages.id='אין תלמדים שאפשר לקשר'
        }
        const i = userGetTable.institutes[data.institute].findIndex((id) => id === details.id)
        if(i!==-1){
            messages.id="יש קשר בין תלמיד לעובד"

            //return false
        }
        setMessages(messages)
        if(messages.connection.trim()||messages.id.trim()){
            return false
        }
        const index = students.findIndex((s) => s.id === details.id)
        if(details.id in userGetTable.institutes[data.institute]|| index === -1){
            return false
        }


        // TODO: add csv and to inputs of this connections part.
        if(await addConnectionPatientToTherapist(userGetTable.id, details.id, data.institute, details.connection)) {
            let docRef = doc(db, "patients/" + details.id + "/therapists",userGetTable.id)
            const resultSnap=onSnapshot(docRef, (d) => {
                setStudentTable({...students[index],connection:d.data().connection,active:
                    d.data().active})
                // setStudentsTable([...studentsTable,{...students[index],connection:d.data().connection}])
                // arrStudents.push(students[index])
            })
            setListenersTableStudents([...listenersTableStudents,() => resultSnap])
            return true
        }

    }
    const deleteConnectionToTherapist = async (contact/*id*/) => {
        if(await removeConnectionPatientToTherapist(userGetTable.id, contact.id, data.institute)) {
            //TODO: if need to remove the snapshot?
            return true
        }
        return false

    }
    const updateConnectionToTherapist = async (id, data) => {
        const collection_query_patients = collection(db, "patients")
        try {
            await updateDoc(doc(collection_query_patients, id, "therapists",userGetTable.id
            )/*collection(db, '/patients/001/therapists','Rahbt7jhvugjFSsnrcnBb5VMfUb2')*/, {
                connection:data.connection
            })
            return true
        }
        catch (e){
            return false
        }

    }
    const isReloadTable=(details)=>{
        if(details.institutes[data.institute].length ===studentsTable.length){
            return true
        }
        return false
    }

    return (
        <div>
            <Row className="p-5" style={{minHeight: 400}}>
                <Routes>
                    <Route path="/"
                           element={<Row className='align-content-start'> <Form.Label className='fs-4' >
                               {"ניתן לראות עובדים או תלמידים במוסד "+dictInstitutes[data.institute]+' '+ " בלשוניות שלמעלה: עובדים, תלמידים. "}</Form.Label> </Row>}/>
                </Routes>
                <Routes>
                    <Route path="employees"
                           element={
                        <>
                            <Row className=' align-content-start'> <Form.Label className='fs-4' >
                                {"עובדים במוסד "+dictInstitutes[data.institute]+":"}</Form.Label> </Row>
                            {  isEmptyEmployees&&<Row className='align-content-start'> <Form.Label className='fs-4' >
                                אין עובדים במוסד</Form.Label> </Row>}
                        <TableData type="עובד" add={addTherapist} update={updateTherapist}
                                               deleteObj={deleteObjTherapist
                                               }
                                               emptyDetails={{
                                                   firstName: "",
                                                   lastName: "",
                                                   jobs: "",
                                                   email: "",/*table:[{id:"",firstName:"",lastName:""}]*/
                                               }}
                                               emptyEditDetails={{firstName: "", lastName: "", jobs: ""}}
                                               data={employees} HebrewNames={[
                               "שם פרטי", "שם משפחה", "עבודות", "אימייל"]
                           } columnsInfoView={columnsViewTherapist} requiredId={false}
                                               find={findTherapist} HebrewNamesTable={HebrewNamesTableT}
                                               emptyDetailsTable={{
                                                   id: (()=>{
                                                       if(students.length>0){
                                                           return students[0].id
                                                       }
                                                       return ""
                                                   })(),
                                                   lastName: "",
                                                   firstName: ""/**/
                                                   ,connection: "",
                                               }}

                                   getTable={getTable}
                                               table={studentsTable}
                                               columnsInfoViewTable={inputsViewPOfT} addTable={addConnectionToTherapist
                               /*(d)=>{}*/} /*deleteObj={deleteConnectionToTherapist}*/
                                               deleteObjTable={deleteConnectionToTherapist}
                                               updateTable={updateConnectionToTherapist}
                                               tableOptionIds={students}
                                   isEmptyTable={isEmptyTable} isReloadTable={isReloadTable}

                           /></>}/>
                </Routes>

                <Routes>
                    <Route path="students"
                           element={<>
                               <Row className='align-content-start'> <Form.Label className='fs-4' >
                                   {"תלמידים במוסד "+dictInstitutes[data.institute]+":"}</Form.Label> </Row>
                               {/*{  reloadStudents&&!isEmptyStudents&&<Row className='p-2 align-content-start'> <Form.Label className='fs-4' >*/}
                               {/*    טוען...</Form.Label> </Row>}*/}
                               {  isEmptyStudents&&<Row className='align-content-start'> <Form.Label className='fs-4' >
                                   אין תלמידים במוסד</Form.Label> </Row>}
                        <TableData type="תלמיד" add={addPatient} update={updatesPatients}
                                               deleteObj={deleteObjPatient}
                                               emptyDetails={{
                                                   id: "",
                                                   firstName: "",
                                                   lastName: "",
                                                   diagnosticCode:"",
                                                   dateOfBirth: "",
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
                               diagnosticCode:"",
                               dateOfBirth: new Date()
                               , city: "", street: "", buildingNumber: "", gender: "זכר"
                           }} data={students} HebrewNames={[
                               "תעודת זהות", "שם פרטי", "שם משפחה", "תאריך לידה", "מגדר","קוד אבחון" ,"עיר", "רחוב", "מספר רחוב"]
                           } columnsInfoView={columnsViewPatient} requiredId={true}

                                             /></>}/>
                </Routes>

            </Row>
        </div>
    )

}

export default SecretaryPage
