


// let Crawler = require("crawler")
// import fetch, {
//     Blob,
//     blobFrom,
//     blobFromSync,
//     File,
//     fileFrom,
//     fileFromSync,
//     FormData,
//     Headers,
//     Request,
//     Response,
// } from 'node-fetch'
// import fetch from 'node-fetch'

import fetch from 'cross-fetch'
import cheerio from 'cheerio'
import axios from "axios";

async function approve(license, firstName, lastName) {
    const response=await fetch('https://practitioners.health.gov.il/Practitioners/search?license=' + license, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response=>
        console.log("html",response)

    )
    // const html = await response.text()
    //
    // await response.json().then((j)=>{
    //     console.log("j",j)
    // })
    // const $ = cheerio.load(html)


    // axios({
    //     url:'https://practitioners.health.gov.il/Practitioners/search',
    //     mode: 'no-cors',
    //     method: 'GET',
    //     headers:{
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": process.env.REACT_APP_API_URL,
    //         "Access-Control-Request-Headers": 'Content-Type, Authorization'
    //
    //     }
    // })
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err =>{
    //         console.log(err);
    //     })
    // const Http = new XMLHttpRequest()
    // const url='https://practitioners.health.gov.il/Practitioners/search?license='+license
    // Http.open("GET", url)
    // Http.send()
    // Http.onreadystatechange = (e) => {
    //     console.log(Http.responseText)
    // }
}
export default approve
