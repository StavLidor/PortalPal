import React, { useState, Fragment,useEffect } from "react"
import {updatesCurrentUser} from "../../firebase";
export default  function Update({details,setData}){
    // this.forceUpdate()
    const [isEdit, setIsEdit] = useState(false)
    const [editedDetails,setEditDetails] =useState({
        firstName:details.firstName,lastName:details.lastName,email:details.email,
            lastPassword:"",newPassword:""}
        )
    const [editPassword,setEditPassword] =useState(false)
    const submitHandler=async e=>{
        e.preventDefault()
        let data ={}
        for (const [key, value] of Object.entries(editedDetails)) {
            if(key in details && value!==details[key])
                data[key]=value
        }
        let flag = false
        if(editPassword &&editedDetails.lastPassword === details.password &&
        editedDetails.newPassword.length>5){
            data['password']=editedDetails.newPassword
            flag = true
        }
        if(await updatesCurrentUser(data)){
            if(flag){
                details.password=editedDetails.newPassword
            }
            for (const [key, value] of Object.entries(editedDetails)) {
                if(key in details && value!==details[key])
                    details[key]=value
            }
            console.log(details.firstName)
            //setData(details)
            setIsEdit(false)
        }
        else{
            setEditDetails({firstName:details.firstName,lastName:details.lastName,email:details.email,
                lastPassword:"",newPassword:""})
        }

    }
    return(
      <div>
          <h1>פרטים שלי</h1>
          <div className="form-group">
              <label htmlFor="firstName">שם פרטי:</label>
              {/*{details.firstName}*/}
              <input type="text" name="firstName" id="firstName"
                onChange={e=>{
                    if(isEdit)
                        setEditDetails({...editedDetails,firstName:e.target.value})}
                }

                     value={editedDetails.firstName}/>
          </div>
          <div className="form-group">
              <label htmlFor="lastName">שם משפחה:</label>
              {/*{details.firstName}*/}
              <input type="text" name="lastName" id="lastName"
                     onChange={e=>{
                         if(isEdit)
                             setEditDetails({...editedDetails,lastName:e.target.value})}
                     }
                     value={editedDetails.lastName}/>
          </div>
          <div className="form-group">
              <label htmlFor="email">אימייל:</label>
              {/*{details.firstName}*/}
              <input type="text" name="email" id="email"
                     onChange={e=>{
                         if(isEdit)
                             setEditDetails({...editedDetails,email:e.target.value})}
                     }
                     value={editedDetails.email}/>
          </div>
          {isEdit &&
              <div>
              <div>
                  <input type="checkbox" id="changePassword" name="changePassword"
                         onChange={e=>{
                             setEditPassword(!editPassword)
                             //console.log('Etitttt',e.target.value)
                         }


                  } checked={editPassword} /*value={editPassword}*//>
                      <label htmlFor="horns">שינוי סיסמא</label>
              </div>
          {editPassword&&
              <div>
                      <div className="form-group">
                          <label htmlFor="password">סיסמא ישנה:</label>
                          <input type="password" name="lastPassword" id="lastPassword"
                              onChange={e=>setEditDetails({...editedDetails,lastPassword:e.target.value})}
                              value={setEditDetails.lastPassword}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="password">סיסמא חדשה:</label>
                      <input type="password" name="newPassword" id="newPassword"
                             onChange={e=>setEditDetails({...editedDetails,newPassword:e.target.value})}
                             value={setEditDetails.newPassword}/>
                      </div>
              </div>
                  }
              </div>



              }
          {!isEdit &&
              <button
                  type="button"
                  onClick={(event) => setIsEdit(true)}
              >
                  ערוך
              </button>
          }
          {isEdit &&
              <button
                  type="button"
                  onClick={(event) => submitHandler(event)}
              >
                  שמור
              </button>
          }


      </div>

    )

}