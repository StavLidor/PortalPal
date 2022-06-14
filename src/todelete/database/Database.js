import {
    updateIDDoc, deleteDocFrom, updatesCurrentUser, deleteCurrentUser, allDetailsMeetings, auth, setIDDoc, db
} from "../../firebase";
import {addDoc, collection, deleteDoc, doc, setDoc, updateDoc} from "firebase/firestore";



export const newMeeting=async (details,idPatient)=>{
    await addDoc(collection(db, "patients/"+idPatient+"/therapists/"+auth.currentUser.uid+'/sessions'),  details)

}
export const updateMeeting=async (idMeeting,detailsMeeting,idPatient)=>{
    await updateDoc(doc(collection(db, "patients"),idPatient,"therapists",auth.currentUser.uid,'sessions',
        idMeeting),detailsMeeting)
}
export const removeMeeting=async (idDoc,idPatient)=>{
    await deleteDoc(doc(collection(db, "patients"), idPatient, "therapists", auth.currentUser.uid, 'sessions',
        idDoc))
}
export const allMeetingOf=async(id,type,therapistId)=>{
    return await allDetailsMeetings(id,type,therapistId)

}


export default {newMeeting,removeMeeting,allMeetingOf,updateMeeting}