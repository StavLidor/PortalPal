import React, {useState} from "react";
import {CSVLink, CSVDownload} from 'react-csv'
import {convertToNormalDate} from "../../useFunction";



export default function ToCsvFile({list ,col}){
    function toCsv(){
        const dataToCsv=[]
        const firstLIne=[]
        col.map(c=>{
            if(c.view === true){
                firstLIne.push(c.name)
            }

        })
        dataToCsv.push(firstLIne)
        list.map(i=>{
            const line =[]
            col.map(c=>{
                console.log(c)
                if(c.view === true){
                    if(c.type === 'date'){
                        line.push(convertToNormalDate(i[c.name]))
                    }
                    else {
                        line.push(i[c.name])
                    }
                }


                }

            )
            dataToCsv.push(line)
        })
        return dataToCsv
    }
    return(
        <CSVLink data={toCsv()} >הורד</CSVLink>
    )

}