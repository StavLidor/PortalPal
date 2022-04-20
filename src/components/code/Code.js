import React from "react"

export default function Code({id}){


    const submit = async e => {
        e.preventDefault()

    }
    return(

            <form onSubmit={submit}>
            <button type="submit" >
                קבל קוד
            </button>
            </form>

    )
}