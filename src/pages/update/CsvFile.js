import React from "react";

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