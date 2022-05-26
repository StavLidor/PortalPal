import React, {useEffect, useState} from "react";
import {CSVLink, CSVDownload} from 'react-csv'
import {convertToNormalDate} from "../../useFunction";



export default function ToCsvFile({list ,col}){
    const [data,setData]= useState([])
    useEffect(() => {
        toCsv()
    },[list])
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
                //console.log(c)
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
        setData(dataToCsv)
    }
    return(
        <CSVLink data={data} >הורד טבלה כקובץ csv</CSVLink>
    )

}