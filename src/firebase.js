import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore"
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    setPersistence, browserSessionPersistence
} from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from './firebaseConfigKey'
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import {makePassword} from "./useFunction"
import hash from "hash.js";



// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAppAddNewUser = initializeApp(firebaseConfig, "Secondary")
export const authAdd = getAuth(firebaseAppAddNewUser)
export const storage = getStorage(firebaseApp)
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
export let currentUserDoc;
const collection_query_users = collection(db, "users");
const collection_query_patients = collection(db, "patients");

/*
sign up new user get dictionary with details to save about the user
need to have in details  email and password to create account
*/

export async function signUp(userDetails) {
    if(!('email' in userDetails)||!('password' in userDetails) ){
        return null
    }
    try {
        //create account
        const res = await createUserWithEmailAndPassword(authAdd, userDetails.email, userDetails.password)
        const user = res.user
        await sendEmailVerification(authAdd.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
            })
        await authAdd.signOut()
        // Delete the password field when creating new user on Firestore
        const setDetails={...userDetails}
        delete setDetails.password
        await setDoc(doc(collection_query_users, user.uid), setDetails)
        return user.uid;
    } catch (err) {
        // User exist
        await authAdd.signOut()
        return null
    }
}

/*
sign in user to the portopel
*/
export async function signIn(email, password) {
    if (email !== '' && password !== '') {
        try {
            // if close the window not save the login
            await setPersistence(auth, browserSessionPersistence)
            // sign in
            await signInWithEmailAndPassword(auth, email, password)
            return true
        } catch (err) {
            return false
        }
    }
}

/*
sign out from user to the portopel
*/
export async function signOutCurrentUser() {
    try {
        signOut(auth).then(function () {
        });
    } catch (err) {
    }
}
/*
    reset password by send mail
*/
export const resetPassword = async email => {
    try {
        await sendPasswordResetEmail(auth, email)
        return true
    }
    catch (err){
        return false
    }

}
/*
    sign up new user get dictionary with details to save about the user
    need to have in details  email
    and send him email to resetPassword beacuse external agent in create him account
*/
export const addUserFromExternalAgent = async details => {
    try {
        const  password = makePassword(7)
        const res = await createUserWithEmailAndPassword(authAdd, details.email, password)
        const user = res.user
        // send email to change the random password (that give for create the user)
        await resetPassword(details.email)
        await authAdd.signOut()
        delete details.password
        await setDoc(doc(collection_query_users, user.uid), details);
        return user.uid
    } catch (err) {
        return null
    }

}
/*
    add user from admin
*/
export const addUserFromAdmin = async (details, institute) => {
    // create the user
    let uid_user = await addUserFromExternalAgent({
        ...details, institutes: {[institute]: [],external:[]}, license: "משרד החינוך",
        titles: ["therapist"], institute: "", childrenIds: []
    })
    // if user exists
    if (!uid_user) {
        const dataUser = await getIdAndDataByEmail(details.email)
        uid_user = dataUser[0]
        const data = dataUser[1]
       // if is not have title of therapist update that will be him and add him the institute
        if (data.titles.findIndex((t) => t === 'therapist') === -1) {
            await updateIDDoc(uid_user, 'users', {
                ['institutes.' + institute]: [],
                titles: firebase.firestore.FieldValue.arrayUnion('therapist')
            })
        } else {
            // add him the institute to his data
            await updateIDDoc(uid_user, 'users', {['institutes.' + institute]: []})
        }
    }
    // add to doc of institute
    if (uid_user) {
        await updateIDDoc(institute, 'institutes', {employees: firebase.firestore.FieldValue.arrayUnion(uid_user)})
    }

    return uid_user

}

/*
check if patient exist
*/
const ifPatientExists = async id => {
    const d = (await getDocs(query(collection_query_patients, where("id", "==", id)))).docs
    if (d.length > 0) {
        return d[0].data()
    }
    return null

}

/*
    add patient to firebase. need to create user to the parent of the child(does not exist)
    and add the patient to the institute
*/
export const addPatient = async details => {
    try {
        // create parent user
        let uid_user = await addUserFromExternalAgent({
            firstName: details.firstNameParent, lastName: details.lastNameParent, jobs: [],
            license: "", titles: ['parent'], email: details.email, institute: '',
            institutes: {}, childrenIds: {
                [details.id]:[details.institute,'external']}
        })
        // if exist this user (of parent)
        if (!uid_user) {
            const userDetails = await getIdAndDataByEmail(details.email)
            uid_user=userDetails[0]
            const data=userDetails[1]
            // add the institute to the child save dictionary of parent
            if(details.id in data.childrenIds){
                await updateIDDoc(uid_user, 'users',
                    {['childrenIds.' + details.id]: firebase.firestore.FieldValue.arrayUnion(details.institute)})
            }
            else {
                await updateIDDoc(uid_user, 'users',
                    {['childrenIds.' + details.id]: [details.institute,'external']})
            }
        }
        // check if child exist
        const docPatient=await getDoc(doc(db, "patients", details.id))
        if(docPatient.exists()){
                // if patient exists and not have this parent add him
            if(docPatient.data().parents.findIndex((p) => p === uid_user) === -1){
                const patient_data = {'parents': firebase.firestore.FieldValue.arrayUnion(uid_user)}
                await updateIDDoc(details.id, 'patients', patient_data)
            }
        }
        else{

            // if doc not exists create the doc
            try{
                await setDoc(doc(collection_query_patients, details.id), {
                    id: details.id,
                    dateOfBirth: details.dateOfBirth,
                    firstName: details.firstName,
                    lastName: details.lastName,
                    diagnosticCode:details.diagnosticCode,
                    city: details.city,
                    street: details.street,
                    buildingNumber: details.buildingNumber,
                    parents: [uid_user],
                    gender: details.gender,
                    thirdPartyCodes:{},
                    code:[]
                })
            } catch (e) {
                return null
            }

        }
        // add the patient to institute
        if (await updateIDDoc(details.institute, 'institutes', {students: firebase.firestore.FieldValue.arrayUnion(details.id)}))
            return details.id
        return null


    } catch (e) {
        return null
    }

}
/*
    update doc
*/
export const updatesUser = async (id, data) => {
    return await updateIDDoc(id, 'users', data)
    //
}
/*
    update doc  of current user
*/
export const updatesCurrentUser = async (data) => {
    // all authentication update
    if ('email' in data) {
        const auth = getAuth();
        try {
            await updateEmail(auth.currentUser, data.email)
            // Email updated!
            // ...
        } catch (error) {
            return false
            // An error occurred
            // ...
        }
    }
    if ('password' in data) {
        const user = auth.currentUser;
        const newPassword = data.password;
        updatePassword(user, newPassword).then(() => {

            // Update successful.
        }).catch((error) => {
            return false
            // An error ocurred
            // ...
        });

    }
    // update doc
    if (!await updateDocUser(auth.currentUser.uid, data))
        return false
    return true;
}

/*
    update doc according id,path in firebase and data
*/
export const updateIDDoc = async (id, name_path, data) => {
    try {
        await updateDoc(doc(db, name_path, id.toString()), data)
        return true
    } catch (err) {
        return false
    }
}
/*
    add patient to external therapist by code
*/
export const addPatientToExternalTherapist = async (id, code, connection) => {

    const d = await ifPatientExists(id)
    if (!d)
        return false
    const len = d.code.length
    let c = ''
    // find if its good code
    for (let i = 0; i < len; i++) {
        let hashCode = hash.sha256().update(d.code[i]).digest("hex")
        if (hashCode === code) {
            c = d.code[i]
            break
        }
    }

    if (c != '') {
        // remove the code form the patient
        const patient_data = {
            'code': firebase.firestore.FieldValue.arrayRemove(c),
        }
        if (!await updateIDDoc(id, 'patients', patient_data))
            return false
        // add the connection to the patient
        await setDoc(doc(collection_query_patients, id, "therapists", auth.currentUser.uid
        ), {
            active: true,
            fromDate:firebase.firestore.Timestamp.fromDate(new Date()),
            connection: connection,
            institute: 'external',
        })
        // add the patient to the therapist
        if (await updateIDDoc(auth.currentUser.uid, 'users', {'institutes.external': firebase.firestore.FieldValue.arrayUnion(id)}))
            return true
        else if (await updateIDDoc(auth.currentUser.uid, 'users', {'institutes.external': [id]}))
            return true
    }
    return false

}
/*
    add to array in patient data
*/
export const addToPatientArr = async (id, filed, data) => {

    const d = await ifPatientExists(id)
    if (!d)
        return false

    let patient_data

    if (filed in d) {

        patient_data = {[filed]: firebase.firestore.FieldValue.arrayUnion(data)}
    } else {

        patient_data = {[filed]: [data]}
    }

    if (!await updateIDDoc(id, 'patients', patient_data))
        return false
    return true

}
/*
    remove the connection between patient and therapist
*/
export const removeConnectionPatientToTherapist = async (id, idRemove, institutionNumber) => {
    // remove for patient
    const filed = "institutes." + institutionNumber
    //update in patient the therapist to be not active
    await updateDoc(doc(collection_query_patients, idRemove, "therapists", id
    ), {
        active: false,
    })
    // remove from therapist the patient
    const data = {[filed]: firebase.firestore.FieldValue.arrayRemove(idRemove)}
    if (await updateIDDoc(id, 'users', data))
        return true
    return false
}
/*
    add connection between therapist and patient
*/
export const addConnectionPatientToTherapist = async (id, idAdd, institutionNumber, connection) => {
    const d = await ifPatientExists(idAdd)
    if (!d) {
        return null
    }
    try {
        // add to patient
        await setDoc(doc(collection_query_patients, idAdd, "therapists", id
        ), {
            fromDate:firebase.firestore.Timestamp.fromDate(new Date()),
            active: true,
            connection: connection,
            institute: institutionNumber,
        })
    } catch (err) {
    }
    // add to therapist
    if (await updateIDDoc(id, 'users', {["institutes." + institutionNumber]: firebase.firestore.FieldValue.arrayUnion(idAdd)}))
        return d
    return null
}

/*
   update doc of user
*/
export const updateDocUser = async (id, data) => {

    if (await updateIDDoc(id, 'users', data))
        return true
    return false

}
/*
   find by email data and id
*/
export const getIdAndDataByEmail = async (email) => {

    const q = query(collection_query_users, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length > 0) {
        return [querySnapshot.docs[0].id,querySnapshot.docs[0].data()]
    }
}
/*
   find by email user
*/
export const findUserByEmail = async (email) => {

    const q = query(collection_query_users, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length > 0) {
        return querySnapshot.docs[0].id
    }
}
/*
   update doc according email
*/
export const updateAccordingEmail = async (email, data) => {

    const id = await findUserByEmail(email)
    if (await updateDocUser(id, data))
        return id
    return null


}
/*
   delete patient from institute
*/

export const deletePatientFromInstitute = async (institute, removeOb) => {
    try {
        // remove from institute
        if(!await updateIDDoc(institute, 'institutes',
            {students: firebase.firestore.FieldValue.arrayRemove(removeOb)})){
            return false
        }
        // update all the therapist in this institute be not active
        const unsubscribe = query(collection(db, 'patients/' + removeOb + '/therapists'),
            where('institute', '==', institute)
        )

        const querySnapshot = await getDocs(unsubscribe)
        let flag=true
        querySnapshot.forEach((d) => {
            if (flag && !updateIDDoc(d.id, 'users', {['institutes.'+institute]: firebase.firestore.FieldValue.arrayRemove(removeOb)})){
                flag=false
            }
            const data ={active: false}
            updateDoc(doc(collection_query_patients, removeOb, "therapists", d.id),data)
    })

        return flag
    } catch (err) {
        return false
    }

}

/*
   delete therapist from institute - finish to work in this institute
*/
export const deleteTherapistFromInstitute = async (institute, details) => {
    // remove from institute
    await updateIDDoc(institute, 'institutes', {employees: firebase.firestore.FieldValue.arrayRemove(details.id)})
    if (details.institutes[institute].length > 0) {

        const unsubscribe = query(collection_query_patients,
            where('id', 'in', details.institutes[institute])
        )

        const querySnapshot = await getDocs(unsubscribe)
        // update patients that have them this therapist is not active
        querySnapshot.forEach((doci) => (

            //doc.id
            updateDoc(doc(db, "patients/" + doci.id + "/therapists", details.id), {active: false})

        ))
    }
    // delete from therapist the institute
    const deleteInstitute = {['institutes.' + institute]: firebase.firestore.FieldValue.delete()}
    if (!await updateIDDoc(details.id, 'users', deleteInstitute)) {
        return false
    }
    return true

}
/*
   get doc user by id
*/
const getDocUser = async (id) => {
    try {
        let docRef = doc(db, "users", id);
        let d = await getDoc(docRef)
        return d.data()
    } catch (err) {
        return null
    }

}
/*
   add app code to patient
*/
export const addThirdPartyCodes=async (patientId, nameApp, code) => {
    if (!await updateIDDoc(patientId, 'patients', {["thirdPartyCodes." + nameApp]: code}))
        return false
    return true

}
/*
   remove  code app to patient
*/
export  const removeThirdPartyCodes=async (patientId, nameApp) => {
    const deleteApp= {['thirdPartyCodes.' + nameApp]: firebase.firestore.FieldValue.delete()}
    if (!await updateIDDoc(patientId, 'patients', deleteApp)) {
        return false
    }
    return true
}


/*
add to user job of therapist external
*/
export async function  addExternal(license){
    await updatesCurrentUser({license: license, 'institutes.external': [],
        titles: firebase.firestore.FieldValue.arrayUnion('therapist')})

}
export default {
    addUser: addUserFromExternalAgent,
    addPatient,
    updatesCurrentUser,
    updateAccordingEmail,
    deletePatientFromInstitute,
    updateIDDoc,

};
