import {
    updateIDDoc, deleteDocFrom, updatesCurrentUser, deleteCurrentUser, allDetailsMeetings, auth, setIDDoc
} from "../../firebase";


export const newMeeting=async details=>{
    // const str = details.client.toString()+ details.date.substring(0, details.date.indexOf("("))
    await setIDDoc( details.idDoc, 'summaries', Object.assign({}, {therapist:auth.currentUser.uid},details))

    // Maybe another case is needed if an array does not exist at all to the user?
    // await updatesCurrentUser({meetings:details.client.toString()+details.data.toString()})
}
export const updateMeeting=async details=>{
    // const str = details.client.toString()+ details.date.substring(0, details.date.indexOf("("))
    await updateIDDoc( details.idDoc, 'summaries', Object.assign({}, {therapist:auth.currentUser.uid},details))

    // Maybe another case is needed if an array does not exist at all to the user?
    // await updatesCurrentUser({meetings:details.client.toString()+details.data.toString()})
}
export const removeMeeting=async details=>{
    await deleteDocFrom(details.idDoc,'summaries')
    //await deleteCurrentUser('meetings',details.client.toString()+details.time.toString())
}
export const allMeetingOf=async(id,type,therapistId)=>{
    return await allDetailsMeetings(id,type,therapistId)

}


export default {newMeeting,removeMeeting,allMeetingOf,updateMeeting}