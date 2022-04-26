import React,{useState} from "react"
export default function ViewExercise({exercise}){
    return(
        <div>
            <div className="form-group">
                <label htmlFor="date">תאריך יצירה:</label>
                {exercise.createdAt}
            </div>
            <div className="form-group">
                <label htmlFor="date">עד לתאריך:</label>
                {exercise.until}
            </div>
            <div className="form-group">
                <label htmlFor="description">תיאור:</label>
                {exercise.description}
            </div>
            <div className="form-group">
                <label htmlFor="place">מיקום התרגיל:</label>
                {exercise.place}
            </div>
        </div>
    )

}