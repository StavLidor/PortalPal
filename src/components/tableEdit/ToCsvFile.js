import React, {useEffect, useState} from "react";
import {CSVLink} from 'react-csv'
import {convertToNormalDate} from "../../useFunction";
import {Button} from "react-bootstrap";


/*download table to csv*/
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
        <Button as={CSVLink}  className="m-2 p-2" variant="outline-primary" style={{fontWeight: "bold",fontStyle:"normal",textDecoration:'none',
           width:'100%'}} data={data} >
            הורד טבלה כקובץ csv
        </Button>
    )

}