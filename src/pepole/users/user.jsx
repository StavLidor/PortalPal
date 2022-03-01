import {addPatient, addUser, ifUserExists} from "../../firebase";

export const newUser=async details=>{
    let arr_ids = details.ids.split(",");
    if (await addUser({
        name: details.name,
        type: details.type,
        email: details.email,
        password: details.password,
        ids: arr_ids
    })){
        console.log("HI user",details.name.toString(),details.type.toString(),details.password.toString());
    }
    else{
        console.log('user with this mail exsist')
    }

}
export const findUser = async details=>{
    // later check before if this in Cache
    console.log('d',details);
    const  more_details =  await ifUserExists(details);
    console.log('more',more_details)
    if( more_details){
        console.log('yesss');
        console.log('more_d',more_details);
        return {name:more_details.name,
            email: details.email}
    }
    console.log('not found');
    return {name:"",
        email: ""}
}
export const newPatients= async details=>{
    //setNewUserFlag(true);
    if (await addPatient(details)){
        console.log("HI",details.id.toString(),details.name.toString());
    }
    else {
        console.log('patient with this mail exsist')
    }
}
export default {newUser,findUser,newPatients}