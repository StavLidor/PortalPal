import DDPClient from 'ddp-client'
import hash, {sha256} from 'hash.js'
import {newChat} from "react-chat-engine";
// import {sha256} from 'crypto-hash'
// import hashcode from 'hashcode'
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
ddpClient.sha256 = (password) => {
    return {
        digest: hash.sha256().update(password).digest('hex'),
        algorithm: "sha-256"
    };
}

export const convertToNormalDate = (newSessionData) => {
    console.log(newSessionData,'NEWW'
    )
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
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
export function is_israeli_id_number(id) {
    id = String(id).trim();
    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
}
export function isClick(item) {
    const pathSpilt= window.location.pathname.split("/")
    if(pathSpilt.findIndex((p) => p === item) === -1){
        return false
    }
    return true

}

export default {makePassword,convertToNormalDate,validateEmail,is_israeli_id_number,isClick}