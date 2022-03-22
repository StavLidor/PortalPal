import "./patient.css"
import React from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

export default function Patient({id}){
    return(
        <div className="patient">
            <FeaturedInfo id={id}/>
            {/*<div>*/}
            {/*        somting*/}
            {/*</div>*/}
        </div>

    )
}