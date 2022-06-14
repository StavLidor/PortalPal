import "./patient.css"
import React from "react";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";
import Code from "../code/Code";

export default function Patient({details,type}){
    return(
        <div className="patient">
            <div className="form-group">
                <label htmlFor="firstName">שם פרטי:</label>
            {details.firstName}
            </div>
            <div className="form-group">
                <label htmlFor="lastName">שם משפחה:</label>
                {details.lastName}
            </div>
            <div className="form-group">
                <label htmlFor="dateOfBirth">תאריך לידה:</label>
            {details.dateOfBirth.toDate().toUTCString()}
            </div>
            <div className="form-group">
                <label htmlFor="city">מקום מגורים:</label>
            {details.city}
            </div>
            {type == 'parent' && <Code type={type} id={details.id}/>}
            <FeaturedInfo details={details} type={type} id={details.id}/>
            {/*<div>*/}
            {/*        somting*/}
            {/*</div>*/}
        </div>

    )
}