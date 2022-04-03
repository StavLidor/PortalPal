import React, {useState} from "react";
import Papa from 'papaparse'

export default function CsvFile({addNews,remove}){
    const [file, editFile] = useState(null)
    const [type, editType] = useState("add")
    const submit = (event) => {
        event.preventDefault();
        //console.log(file)
        if(file){
            if (type == 'add'){
                parser(file,addNews)
            }
            else {
                parser(file,remove)
            }

        }


    }
    function parser(file,f){
        console.log(file)
        let reader = new FileReader();

        reader.addEventListener('load', function (e) {
            const allObj=[]
            //let csvdata = e.target.result;
            let arr =  Papa.parse(e.target.result).data
            console.log(arr)

            // let arr= data.split("\n");

            let keys=arr[0]
            console.log(keys)
            let rows=arr.length;

            let cols=keys.length;



            let i,j=0;
            for (i = 1; i < rows; i++) {
                let line = arr[i];
                if (line == '\n')
                    continue
                let obj = {};

                for (j = 0; j < cols; j++) {

                    let header =keys[j]
                    let value = line[j]
                    obj[header]=value
                }
                console.log(obj)
                // if(i==1){
                //     f(obj)
                // }
                allObj.push(obj)


            }
            f(allObj)
            //editFile(null)
            // parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data
        });
        reader.readAsText(file)



    }

    return(
        <form onSubmit={submit}>
            <table>
                <tr>
                    <td>
                        <table className="menu">
                            <tr>
                                <td>
                                    <input type="file" name="learnCSV" accept="text/csv" onChange={e=>{editFile(e.target.files[0])
                                    console.log('change')}}/>
                                </td>הכנס/הסר תלמידים
                                <td>
                                <select type="text" name="type" id="type" onChange={e=> editType(e.target.value)} value={type} >
                                    <option value="add">הוסף</option>
                                    <option value="delete">הסר</option>
                                </select>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                        <input type='submit' value='Submit!'/>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </form>
)
}