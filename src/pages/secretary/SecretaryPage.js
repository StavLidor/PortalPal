import React, {useEffect, useState} from "react";
import {Form, Row} from "react-bootstrap";
import {
    addConnectionPatientToTherapist,
    addUserFromAdmin,
    db, deletePatientFromInstitute,
    deleteTherapistFromInstitute,
    findUserByEmail, removeConnectionPatientToTherapist, updateIDDoc,
    updatesUser
} from "../../firebase";
import {Route, Routes} from "react-router-dom";
import TableData from "../../components/tableEdit/TableData";
import {collection, doc,  onSnapshot, query, updateDoc, where} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {newPatients} from "../../pepole/users/user";
import {is_israeli_id_number, validateEmail} from "../../useFunction";


/*page of management*/
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
    const [isEmptyEmployees,setIsEmptyEmployees]=useState(false)
    const [isEmptyStudents,setIsEmptyStudents]=useState(false)
    const [isEmptyTable,setIsEmptyTable]=useState(false)
    /*manage student table*/
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
    /*workers management*/
    useEffect(() => {
        if (listenerEmployees !== null) {
            listenerEmployees()
        }
        if (idEmployees.length > 0) {
            const unsubscribe = query(collection(db, "users"),
                where(firebase.firestore.FieldPath.documentId(), 'in', idEmployees))
            const resultEmployee =
                onSnapshot(
                    unsubscribe,
                    (querySnapshot) => {
                        let data = []
                        querySnapshot.forEach((doc) => (
                            data.push({...doc.data(), id: doc.id})
                        ))
                        setEmployees(data)

                    },
                    (error) => {
                    }
                )
            setListenerEmployees(() => resultEmployee)
        }
        else {
            setEmployees([])
        }

    }, [idEmployees])
    /*patients management*/
    useEffect(() => {
        if (listenerStudents !== null) {
            listenerStudents()
        }

        if (idStudents.length > 0) {
            const unsubscribe1 = query(collection(db, "patients"),
                where("id", 'in', idStudents))
            const resultStudent =onSnapshot(
                unsubscribe1,
                (querySnapshot) => {
                    let data = []
                    querySnapshot.forEach((doc) => {
                        data.push({...doc.data(),information:doc.data().firstName +" "+doc.data().lastName})
                    })
                    setStudents(data)
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
    /*on loading*/
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
            messages.id='???????? ???? ??????????????'
        }
        if(idStudents.includes(details.id)){
            messages.id='???????? ?????????? ?????????? ???? ???? ??????'
        }
        if(!validateEmail(details.email)){
            messages.email='???????? ???????????? ???????? ??????????'
        }
        if(!details.dateOfBirth.trim()|| isNaN(Date.parse(details.dateOfBirth))){
            messages.dateOfBirth='???????? ?????????? ???????? ???????? YYYY-MM-DD'
        }
        if(!details.diagnosticCode.trim()){
            messages.diagnosticCode='???????? ?????? ??????????'
        }
        if(!details.firstName.trim()){
            messages.firstName='???????? ???? ???????? ????????????'
        }
        if(!details.lastName.trim()){
            messages.lastName='???????? ???? ?????????? ????????????'
        }
        if(!details.lastNameParent.trim()){
            messages.lastNameParent='???????? ???? ?????????? ??????????'
        }
        if(!details.firstNameParent.trim()){
            messages.firstNameParent='???????? ???? ???????? ??????????'
        }
        if(!details.city.trim()){
            messages.city='???????? ?????? ????????????'
        }
        if(!details.street.trim()){
            messages.street='???????? ???????? ????????????'
        }
        if(!details.buildingNumber.trim()){
            messages.buildingNumber='???????? ???????? ????????'
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
    }

    const addTherapist = async(details, setMessages) => {
        const messages={email:"",firstName:"",lastName:"",jobs:""}
        if(!validateEmail(details.email)){
            messages.email='???????? ???????????? ????????'
        }
        if(employees.findIndex((e) => e.email === details.email)!==-1){
            messages.email='???????? ???????? ???? ???????????? ???? ???????????? '
        }
        if(!details.firstName.trim()){
            messages.firstName='???????? ???? ???????? ??????????'
        }
        if(!details.lastName.trim()){
            messages.lastName='???????? ???? ?????????? ??????????'
        }
        if(!details.jobs.trim()){
            messages.jobs='???????? ???? ???????????? ??????'
        }
        setMessages(messages)

        if(!messages.firstName.trim() && !messages.lastName.trim()&& !messages.jobs.trim()
        &&!messages.email.trim()){
            const id =await addUserFromAdmin({...details,jobs:details.jobs.split(",")},data.institute)
            return id
        }
        return null
    }
    const updatesPatients = async (id, data) => {
        let update={...data}
        if('information'in data){
            delete update.information
        }
        if ('dateOfBirth' in data)
            if (await updateIDDoc(id, 'patients', {
                ...update,
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
    /*details of therapist*/
    const columnsViewTherapist = [

        {
            type: "text", required: "required",
            placeholder: "???????? ???? ????????..."
            , name: "firstName", label: "???? ????????:",
            edit: true, add: true, view: true
        }, {
            type: "text", required: "required",
            placeholder: "???????? ???? ??????????..."
            , name: "lastName", label: "???? ??????????:"
            , edit: true, add: true, view: true
        },

        {
            type: "text", required: "required",
            placeholder: "???????? ??????..."
            , name: "jobs", label: "????????????:"
            ,
            edit: true, add: true, view: true
        },
        {
            type: "email", required: "required"
            , name: "email", label: "???????????? ???? ????????:",
            edit: false, add: true, view: true
        },

    ]
    /*details of patient*/
    const columnsViewPatient = [{
        type: "text", required: "required",
        placeholder: "???????? ???? ????????..."
        , name: "firstName", label: "???? ????????:",
        edit: true, add: true, view: true
    }, {
        type: "text", required: "required",
        placeholder: "???????? ???? ??????????..."
        , name: "lastName", label: "???? ??????????:", edit: true, add: true, view: true
        /*,value:editFormData.lastName,*/
    },
        {
            type: "date", required: "required",
            placeholder: "???????? ?????????? ????????..."
            , name: "dateOfBirth", label: "?????????? ????????:",
            edit: true, add: true, view: true
        },
        {
            type: "text", required: "required", options: ['??????', '????????',
                '??????']
            , name: "gender", label: "???????? ????????...",
            edit: true, add: true, view: true
        },
        {
            type: "text", required: "required",
            placeholder: "???????? ?????? ??????????..."
            , name: "diagnosticCode", label: "?????? ??????????:", edit: true, add: true, view: true
        },

        {
            type: "text", required: "required",
            placeholder: "?????????? ??????..."
            , name: "city", label: "??????:", edit: true, add: true, view: true
            /*,value:editFormData.city*/,
        },
        {
            type: "text", required: "required",
            placeholder: "???????? ??????..."
            , name: "street", label: "????????:", edit: true, add: true, view: true,
        },
        {
            type: "text", required: "required",
            placeholder: "???????? ???????? ????????..."
            , name: "buildingNumber", label: "???????? ????????:", edit: true, add: true, view: true,
        },
        {
            type: "text", required: "required"
            , name: "firstNameParent", label: "???? ???????? ????????:",
            edit: false, add: true, view: false
        },
        {
            type: "text", required: "required"
            , name: "lastNameParent", label: "???? ?????????? ????????:",
            edit: false, add: true, view: false
        },
        {
            type: "email", required: "required"
            , name: "email", label: "???????????? ???? ????????:",
            edit: false, add: true, view: false
        },


    ]
    /*find therapist by email*/
    const findTherapist = async (details) => {
        return await findUserByEmail(details.email)

    }
    const HebrewNamesTableT = [
        "?????????? ???????? ???? ??????????","???? ?????????? ???? ??????????","???? ???? ??????????","??????"
    ]
    /*get students that connected therapist*/
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
                })
                arrSnapshot.push(() => resultSnap)
            }


        })
        setListenersTableStudents(arrSnapshot)


    }
    /*connection(therapist&student) details */
    const inputsViewPOfT = [

        {
            type: "text", required: "required",
            placeholder: "???????? ???? ????????..."
            , name: "firstName", label: "???? ????????:",
            edit: false,view: true,
            add: false
        }, {
            type: "text", required: "required",
            placeholder: "???????? ???? ??????????..."
            , name: "lastName", label: "???? ??????????:", edit: false,
            add: false,view: true
        },
        {
            type: "text", required: "required",
            placeholder: "???????? ???? ?????? ?????? ?????????? ??????????..."
            , name: "connection", label: "??????:",
            edit: true,
            add: true,view: true
        },
    ]
    const addConnectionToTherapist = async (details,setMessages) => {
        const messages ={id:"",connection:""}
        if(!details.connection.trim()){
            messages.connection='???????? ??????'
        }
        if(!details.id.trim()){
            messages.id='?????? ???????????? ?????????? ????????'
        }
        const i = userGetTable.institutes[data.institute].findIndex((id) => id === details.id)
        if(i!==-1){
            messages.id="???? ?????? ?????? ?????????? ??????????"
        }
        setMessages(messages)
        if(messages.connection.trim()||messages.id.trim()){
            return false
        }
        const index = students.findIndex((s) => s.id === details.id)
        if(details.id in userGetTable.institutes[data.institute]|| index === -1){
            return false
        }


        if(await addConnectionPatientToTherapist(userGetTable.id, details.id, data.institute, details.connection)) {
            let docRef = doc(db, "patients/" + details.id + "/therapists",userGetTable.id)
            const resultSnap=onSnapshot(docRef, (d) => {
                setStudentTable({...students[index],connection:d.data().connection,active:
                    d.data().active})
            })
            setListenersTableStudents([...listenersTableStudents,() => resultSnap])
            return true
        }

    }
    const deleteConnectionToTherapist = async (contact/*id*/) => {
        if(await removeConnectionPatientToTherapist(userGetTable.id, contact.id, data.institute)) {
            return true
        }
        return false

    }
    const updateConnectionToTherapist = async (id, data) => {
        const collection_query_patients = collection(db, "patients")
        try {
            await updateDoc(doc(collection_query_patients, id, "therapists",userGetTable.id
            ), {
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
                               {"???????? ?????????? ???????????? ???? ?????????????? ?????????? "+dictInstitutes[data.institute]+' '+ " ???????????????? ????????????: ????????????, ??????????????. "}</Form.Label> </Row>}/>
                </Routes>
                <Routes>
                    <Route path="employees"
                           element={
                        <>
                            <Row className=' align-content-start'> <Form.Label className='fs-4' >
                                {"???????????? ?????????? "+dictInstitutes[data.institute]+":"}</Form.Label> </Row>
                            {  isEmptyEmployees&&<Row className='align-content-start'> <Form.Label className='fs-4' >
                                ?????? ???????????? ??????????</Form.Label> </Row>}
                        <TableData type="????????" add={addTherapist} update={updateTherapist}
                                               deleteObj={deleteObjTherapist
                                               }
                                               emptyDetails={{
                                                   firstName: "",
                                                   lastName: "",
                                                   jobs: "",
                                                   email: "",
                                               }}
                                               emptyEditDetails={{firstName: "", lastName: "", jobs: ""}}
                                               data={employees} HebrewNames={[
                               "???? ????????", "???? ??????????", "????????????", "????????????"]
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
                                               columnsInfoViewTable={inputsViewPOfT} addTable={addConnectionToTherapist}
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
                                   {"?????????????? ?????????? "+dictInstitutes[data.institute]+":"}</Form.Label> </Row>
                               {  isEmptyStudents&&<Row className='align-content-start'> <Form.Label className='fs-4' >
                                   ?????? ?????????????? ??????????</Form.Label> </Row>}
                        <TableData type="??????????" add={addPatient} update={updatesPatients}
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
                                                   gender: "??????"
                                               }} emptyEditDetails={{
                               firstName: "",
                               lastName: "",
                               diagnosticCode:"",
                               dateOfBirth: new Date()
                               , city: "", street: "", buildingNumber: "", gender: "??????"
                           }} data={students} HebrewNames={[
                               "?????????? ????????", "???? ????????", "???? ??????????", "?????????? ????????", "????????","?????? ??????????" ,"??????", "????????", "???????? ????????"]
                           } columnsInfoView={columnsViewPatient} requiredId={true}

                                             /></>}/>
                </Routes>

            </Row>
        </div>
    )

}
export default SecretaryPage