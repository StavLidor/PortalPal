import React from "react";
function Parser(file){

    let data = file.data.toString()

    let arr= data.split("\n");

    let keys=arr[0].split(',');
    let rows=arr.length;
    let cols=keys.length;

    let obj = {};

    let i,j=0;
    for (i = 1; i < rows-1; i++) {
        let line = arr[i].split(',');
        for (j = 0; j < cols; j++) {

            let header =keys[j].substring(0, keys[j].length);
            let value = parseFloat(line[j]);
            if (!obj[header]){
                obj[header] = [];
            }
            obj[header].push(value);
        }
    }

    return obj;

}
export default function CsvFile(){

    return(
        <form>
            <table>
                <tr>
                    <td>
                        <table className="menu">
                            <tr>
                                <td>
                                    <input type="file" name="learnCSV" accept="text/csv"/>
                                </td>הכנס/הסר תלמידים

                            </tr>
                            <tr>
                                <td>
                                        <input type='submit' value='Submit!'/>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <select datatype="sel" name="algorithmSelect">
                            <option value="simple" selected>תלמדים חדשים</option>
                            <option value="hybrid">הסרת תלמידים</option>
                        </select>
                    </td>
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