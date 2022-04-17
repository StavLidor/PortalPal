import "./patient.css"
import React from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

export default function Patient({details}){
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
            {details.dateOfBirth}
            </div>
            <div className="form-group">
                <label htmlFor="city">מקום מגורים:</label>
            {details.city}
            </div>
            <FeaturedInfo id={details.id}/>
            {/*<div>*/}
            {/*        somting*/}
            {/*</div>*/}
        </div>

    )
}