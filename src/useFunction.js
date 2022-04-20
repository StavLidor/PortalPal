// import DDPClient from 'ddp-client'
// import hash from 'hash.js'
// import {sha256} from 'crypto-hash'
import hashcode from 'hashcode'
function makePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
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



export default {makePassword,ddpClient}