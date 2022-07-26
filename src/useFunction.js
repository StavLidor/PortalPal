import DDPClient from 'ddp-client'
import hash from 'hash.js'
/*random password according length*/
export function makePassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

let ddpClient = new DDPClient({
    host: 'localhost',
    port: '3000',
    // url: <your websocket url>
});
/*random password according length*/
ddpClient.sha256 = (password) => {
    return {
        digest: hash.sha256().update(password).digest('hex'),
        algorithm: "sha-256"
    };
}
/*data of the firebase to normel data*/
export const convertToNormalDate = (newSessionData) => {
    let year = new Date(newSessionData.seconds * 1000).getFullYear()
    let month = new Date(newSessionData.seconds * 1000).getMonth() + 1
    let day = new Date(newSessionData.seconds * 1000).getDate()

    let dateString = year.toString() + '-'
    if (month < 10) {
        dateString += '0'
    }
    dateString += month.toString() + '-'
    if (day < 10) {
        dateString += '0'
    }
    dateString += day.toString()
    return dateString
}
/*validtion is email fix*/
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
/*is isareli id*/
export function is_israeli_id_number(id) {
    id = String(id).trim();
    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
}
/*if somting in path*/
export function isClick(item) {
    const pathSpilt= window.location.pathname.split("/")
    if(pathSpilt.findIndex((p) => p === item) === -1){
        return false
    }
    return true

}

export default {makePassword,convertToNormalDate,validateEmail,is_israeli_id_number,isClick}