import React, {useState} from "react";


export default function CsvFile({addNewPatient}){
    const [file, editFile] = useState(null)
    const submit = (event) => {
        event.preventDefault();
        if(file){
            parser(file,addNewPatient)
        }


    }
    function parser(file,f){

        let data = file.data.toString()

        let arr= data.split("\n");

        let keys=arr[0].split(',');
        let rows=arr.length;
        let cols=keys.length;



        let i,j=0;
        for (i = 1; i < rows-1; i++) {
            let line = arr[i].split(',');
            let obj = {};
            for (j = 0; j < cols; j++) {

                let header =keys[j]
                let value = line[j]
                obj[header]=value
            }
            f(obj)

        }


    }

    return(
        <form onSubmit={submit}>
            <table>
                <tr>
                    <td>
                        <table className="menu">
                            <tr>
                                <td>
                                    <input type="file" name="learnCSV" accept="text/csv" onChange={e=>editFile(e.target.value)}/>
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