import "./featuredInfo.css"
import React from "react";

export default function FeaturedInfo(){
    return(
        <div className="featured">
            <div className="featuredWrapper">
                <div className="topLeft">


                </div>
                <div className='featuredMenu'>
                    <h1>רשימת אפליקציות</h1>

                    <ul className="featuredList">

                        <ul className="featuredListItem">
                            אוטידו
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            נגינה יצרתית
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            עודידו
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
                    <h1>טיפול אישי</h1>
                    <ul className="featuredList">

                        <ul className="featuredListItem">
                            סיכומי מפגשים
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            תרגילים
                            &nbsp;

                        </ul>
                        &nbsp;
                        <ul className="featuredListItem">
                            התקשורת
                            &nbsp;

                        </ul>
                    </ul>
                    {/*sidebar*/}
                </div>
            </div>
            featuredInfo
        </div>
    )
}