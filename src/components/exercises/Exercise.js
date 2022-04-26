import React, {useEffect, useState} from "react"
import EditExercise from "./EditExercise"
import ViewExercise from "./ViewExercise"

export default function Exercise({exercise,update,deleteExercise}){
    const [edit, setEdit] =useState(false)

    return(
        (edit)?(
            <EditExercise exercise={exercise} update={update}/>
        ):
            <div>
            <ViewExercise exercise={exercise}/>
            <button
                type="button"
                onClick={(event) =>{
                    event.preventDefault()
                    setEdit(true)
                } }
            >
                ערוך
            </button>
                <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault()
                        deleteExercise(exercise.id)
                    }
                }
                >
                    מחק
                </button>
            </div>
    )
}