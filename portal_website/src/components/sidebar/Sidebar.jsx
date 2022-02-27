import "./sidebar.css"
import {LineStyle} from '@mui/icons-material';
// import Patient from "./pages/patient/Patient"
import React from "react";
import { Link } from "react-router-dom";


export default function Sidebar(){
    return(
        <div className='sidebar'>
            <div className="sidebarWrapper">

                <div className="topLeft">


                </div>
                <div className='sidebarMenu'>
                    <h1>רשימת מטופלים</h1>

                    <ul className="sidebarList">
                        <Link to="/dana_barger" className="link">

                        <ul className="sidebarListItem">
                            דנה ברגר
                            &nbsp;

                        </ul>
                        </Link>
                        &nbsp;
                        <ul className="sidebarListItem">
                            קשת מור
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="sidebarListItem">
                            רונלי דלומי
                            &nbsp;

                        </ul>

                        {/*<li className="sidebarListItem">*/}
                        {/*    עמוד הבית*/}
                        {/*    /!*&nbsp;*!/*/}
                        {/*    /!*<LineStyle/>*!/*/}

                        {/*</li>*/}
                        {/*<li className="sidebarListItem">*/}
                        {/*    אחר*/}
                        {/*    &nbsp;*/}
                        {/*    <LineStyle/>*/}
                        {/*</li>*/}
                    </ul>
                    {/*sidebar*/}
                </div>

            </div>


        </div>
    )
}