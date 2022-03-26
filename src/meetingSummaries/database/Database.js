import {
    updateIDDoc, deleteDocFrom, updatesCurrentUser, deleteCurrentUser
} from "../../firebase";


export const updateMeeting=async details=>{
    await updateIDDoc(details.client.toString()+details.data.toString(), 'summaries', details)
    // Maybe another case is needed if an array does not exist at all to the user?
    await updatesCurrentUser({meetings:details.client.toString()+details.data.toString()})
}
export const removeMeeting=async details=>{
    await deleteDocFrom(details.client.toString()+details.time.toString(),'summaries')
    await deleteCurrentUser('meetings',details.client.toString()+details.time.toString())
}


export default {updateMeeting,removeMeeting}