import React, { useState, Fragment,useEffect } from "react"
export default  function Update({details}){
    const [isEdit, setIsEdit] = useState(true)
    const [editedDetails,setEditDetails] =useState(details)
    const [editPassword,setEditPassword] =useState(false)
    return(
      <div>
          <h1>פרטים שלי</h1>
          <div className="form-group">
              <label htmlFor="firstName">שם פרטי:</label>
              {/*{details.firstName}*/}
              <input type="firstName" name="firstName" id="firstName"
                /*onChange={e=>setDetails({...details,password:e.target.value})}*/
                     value={editedDetails.firstName}/>
          </div>
          <div className="form-group">
              <label htmlFor="lastName">שם משפחה:</label>
              {/*{details.firstName}*/}
              <input type="lastName" name="lastName" id="lastName"
                  /*onChange={e=>setDetails({...details,password:e.target.value})}*/
                     value={editedDetails.lastName}/>
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
                          <input type="password" name="password" id="password"
                              /*onChange={e=>setDetailsNewUser({...detailsNewUser,password:e.target.value})}
                              value={detailsNewUser.password}*//>
                      </div>
                      <div className="form-group">
                      <label htmlFor="password">סיסמא חדשה:</label>
                      <input type="password" name="password" id="password"
                      /*onChange={e=>setDetailsNewUser({...detailsNewUser,password:e.target.value})}
                      value={detailsNewUser.password}*//>
                      </div>
              </div>
                  }
              </div>



              }
          {isEdit ===null &&
              <button
                  type="button"
                  /*onClick={(event) => handleEditClick(event, contact)}*/
              >
                  ערוך
              </button>
          }


      </div>

    )

}