import React, {useState} from "react";
import Papa from 'papaparse'

export default function CsvFile({addNewPatient}){
    const [file, editFile] = useState(null)
    const submit = (event) => {
        event.preventDefault();
        //console.log(file)
        if(file){
            parser(file,addNewPatient)
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

                            </tr>
                            <tr>
                                <td>
                                        <input type='submit' value='Submit!'/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    {/*<td>*/}
                    {/*    <select datatype="sel" name="algorithmSelect">*/}
                    {/*        <option value="newStudent" selected>תלמדים חדשים</option>*/}
                    {/*        <option value="newEmployee">עובד חדש</option>*/}
                    {/*    </select>*/}
                    {/*</td>*/}
                    {/*<td>*/}
                    {/*    <div style="margin-left: 50px">*/}
                    {/*        <p id="instructionsText"><u>Instructions:</u></p>*/}
                    {/*        <p style="margin-left: 20px"> </p>*/}

                    {/*    </div>*/}
                    {/*</td>*/}
                </tr>
            </table>
        </form>
)
}