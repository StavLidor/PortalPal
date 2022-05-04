import React, {useEffect, useState} from "react";
import {auth, getDocCurrentUser, resetPassword, updatesCurrentUser} from "./firebase";
import {newUser, signUser, unSignUser} from "./pepole/users/user";


export default function AQ10ChildrenForm() {

    const [details, setDetails] = useState({email: "", password: "", type: "therapist", institute: "external"});
    const [detailsNewUser, setDetailsNewUser] = useState({
        firstName: "",
        lastName: "", license: "", email: "", password: ""
    });
    const [isMovePage, setIsMovePage] = useState(true)
    const [isFormNewUser, setFormNewUser] = useState(false)
    const [info, setInfo] = useState({
        id: '', firstName: '', lastName: '', students_arr: [], myDoc: '', emailCurrent: '',
        passwordCurrent: '', institutionNumber: '', works: []
    });
    const [user, setUser] = useState(null)
    const [loginNow, setLoginNow] = useState(false)
    // if (login){
    //     setIsMovePage(true)
    // }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                console.log('user', user.uid)
                const p = Promise.resolve(user.uid)
                p.then(id => {
                    setIsMovePage(true)
                    setUser(id)
                })

                resolver(await getDocCurrentUser())

            } else {
                setIsMovePage(false)
                setInfo({
                    id: '', firstName: '', lastName: '', students_arr: [], myDoc: '', emailCurrent: '',
                    passwordCurrent: '', institutionNumber: '', works: []
                })
            }
        })
        return unsubscribe

    }, [])
    const resolver = async val => {
        console.log('login now', loginNow)
        const p = Promise.resolve(val)
        p.then(doc => {
            const data = doc.data()
            const id = doc.id
            console.log('lalalala')
            if (loginNow) {
                if (details.type !== "admin" && details.type !== "parent") {
                    updatesCurrentUser({lastLogin: details.type + "," + details.institute})
                } else {
                    updatesCurrentUser({lastLogin: details.type})
                }

            } else {
                let lastLogin = data.lastLogin.split(",")
                console.log(lastLogin, "lastLogin")
                if (lastLogin.length == 2) {
                    details.institute = lastLogin[1]
                }
                details.type = lastLogin[0]
            }
            if (details.type !== 'admin' &&
                details.institute != "external" && ('institute' in data) && !(details.institute in data.institutes)) {
                unSignUser()
            } else {
                setInfo({...data, id: id})
            }
        })
    }
    const submitHandler = async e => {
        e.preventDefault()
        var answers = {"Qchat-10-Score": 0};
        var questions = [];
        for (var i = 1; i <= 10; i++) {
            questions.push(document.getElementsByName("q" + i.toString()))
        }
        for (i = 0; i < 10; i++) {
            if (questions[i][0].checked === true || questions[i][1].checked === true) {
                if (i === 0 || i === 4 || i === 6 || i === 9) {
                    answers["A" + (i + 1).toString()] = 1;
                    answers["Qchat-10-Score"]++;
                } else {
                    answers["A" + (i + 1).toString()] = 0;
                }
                continue;
                // answer negative
            } else if (questions[i][2].checked === true || questions[i][3].checked === true) {
                if (i === 0 || i === 4 || i === 6 || i === 9) {
                    // לא מסכים=0,בהחלט לא מסכים=0
                    answers["A" + (i + 1).toString()] = 0;
                } else {
                    answers["A" + (i + 1).toString()] = 1;
                    answers["Qchat-10-Score"]++;
                }
                continue;
            }
            break;
            //ERROR, FILL FORM
        }
        answers["age"] = document.getElementById("age").value
        answers["Sex"] = document.getElementById("sex").value
        answers["Ethnicity"] = document.getElementById("ethnicity").value
        var optionsList;
        optionsList=document.getElementsByName("jaundice");
        for (i=0; i < 2;i++){
            if(optionsList[i].checked === true){
                answers["Jaundice"] = optionsList[i].value
            }
        }
        // optionsList =[]
        optionsList=document.getElementsByName("Family_mem_with_ASD");
        for (i=0; i < 2;i++){
            if(optionsList[i].checked === true){
                answers["Family_mem_with_ASD"] = optionsList[i].value
            }
        }
        // answers["Jaundice"] = document.getElementById("jaundice").selected
        // answers["Family_mem_with_ASD"] = document.getElementById("Family_mem_with_ASD").selected
        answers["Who completed the test"] = document.getElementById("Who completed the test").value
  console.log(answers)
    }

    // const monthsOptions = e => {
    //     e.preventDefault();
    var options = [];
    for (var op = 4; op <= 11; op++) {
        options.push(<option value={op}>{op}</option>);
    }
    // return options;
    // }

    return (

        <div>
            <form onSubmit={submitHandler}>
                <table className="tg" align="center">
                    <thead>
                    <tr>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>מי ממלא את טופס זה:</td>
                        <td>
                            <select name="Who completed the test" id="Who completed the test">

                                <option value="relative">בן משפחה</option>
                                <option value="health care professional">מטפל</option>
                                <option value="self">מילוי עצמאי</option>
                                <option value="teacher">מורה</option>
                                <option value="parent">הורה</option>
                                <option value="Others">אחר</option>

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Ethnicity</td>
                        <td><select name="ethnicity" id="ethnicity">
                            <option value="middle eastern">middle eastern</option>
                            <option value="south asian">south asian</option>
                            <option value="Hispanic">Hispanic</option>
                            <option value="asian">asian</option>
                            <option value="black">black</option>
                            <option value="Others">Others</option>
                            <option value="middle eastern">Israeli</option>
                            <option value="mixed">mixed</option>
                            <option value="Pacifica">Pacifica</option>
                            <option value="Latino">Latino</option>
                            <option value="Native Indian">Native Indian</option>
                            <option value="White European">White European</option>
                            <option value="?">?</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td>גיל:</td>
                        <td>
                            {/*<label htmlFor="hour">Hour:</label>*/}
                            {/*<select type="number" id="months" min="1" max="24" />*/}

                            <select name="age" id="age">

                                {options}

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>מין:</td>
                        <td>
                            <select name="sex" id="sex">

                                <option value="m">זכר</option>
                                <option value="f">נקבה</option>

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>jaundice</td>
                        <td><input type="radio" id="jaundice_yes" name="jaundice" value="yes"/>
                            {/*<label >כן</label>*/}
                            <input type="radio" id="jaundice_no" name="jaundice" value="no"/>
                            {/*<label >לא</label>*/}
                        </td>
                    </tr>
                    <tr>
                        <td>קיים בן משפחה עם אוטיזם (ASD)?</td>
                        <td><input type="radio" id="family_asd_yes" name="Family_mem_with_ASD" value="yes"/>
                            <label htmlFor="family_asd_yes">כן</label>
                            <input type="radio" id="family_asd_no" name="Family_mem_with_ASD" value="no"/>
                            <label htmlFor="family_asd_no">לא</label></td>
                    </tr>

                    {/*<tr>*/}
                    {/*    <td>מראה תסמיני אוטיזם (ASD)?</td>*/}
                    {/*    <td><input type="radio" id="asd_traits_yes" name="Class/ASD Traits" value="Yes"/>*/}
                    {/*        <label htmlFor="asd_traits_yes">כן</label>*/}
                    {/*        <input type="radio" id="asd_traits_no" name="Class/ASD Traits" value="No"/>*/}
                    {/*        <label htmlFor="asd_traits_no">לא</label></td>*/}
                    {/*</tr>*/}
                    <br/>

                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>/</td>
                        <td>שאלה</td>
                        <td>מסכים בהחלט</td>
                        <td>מסכים</td>
                        <td>בהחלט לא מסכים</td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>1</td>
                        <td>הוא נוטה להבחין בצלילים קטנים כאשר אחרים לא מבחינים.</td>
                        <td><input type="radio" id="html" name="q1" value="1"/></td>
                        <td><input type="radio" id="css" name="q1" value="1"/></td>
                        <td><input type="radio" id="toko" name="q1" value="1"/></td>
                        <td><input type="radio" id="javascript" name="q1" value="1"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>2</td>
                        <td>הוא בדרך כלל מתרכז יותר בתמונה הכללית מאשר בפרטים הקטנים.</td>
                        <td><input type="radio" id="html" name="q2" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q2" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q2" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q2" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>3</td>
                        <td>במפגש חברתי, הוא מצליח לעקוב בקלות אחר מספר שיחות עם אנשים שונים.</td>
                        <td><input type="radio" id="html" name="q3" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q3" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q3" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q3" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>4</td>
                        <td>הוא מצליח לעבור בין פעילויות שונות בקלות.</td>
                        <td><input type="radio" id="html" name="q4" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q4" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q4" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q4" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>5</td>
                        <td>הוא לא יודע איך להחזיק שיחה עם חבריו.</td>
                        <td><input type="radio" id="html" name="q5" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q5" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q5" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q5" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>6</td>
                        <td>הוא טוב בשיחת חולין.</td>
                        <td><input type="radio" id="html" name="q6" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q6" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q6" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q6" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>7</td>
                        <td>כאשר מספרים לו סיפור, קשה לו לגלות ולהבין מה הכוונות והתחושות של כל דמות בסיפור.</td>
                        <td><input type="radio" id="html" name="q7" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q7" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q7" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q7" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>8</td>
                        <td>כשהיה בגן, הוא אהב לשחק במשחקי העמדת פנים עם ילדים אחרים.</td>
                        <td><input type="radio" id="html" name="q8" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q8" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q8" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q8" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>9</td>
                        <td>הוא מצליח להבין בקלות מה אדם אחר חושב או מרגיש רק על ידי הבטה בפניו.</td>
                        <td><input type="radio" id="html" name="q9" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q9" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q9" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q9" value="JavaScript"/></td>
                    </tr>
                    <tr>{/*<label htmlFor="javascript">JavaScript</label>*/}
                        <td>10</td>
                        <td>הוא מתקשה להכיר וליצור חברים חדשים.</td>
                        <td><input type="radio" id="html" name="q10" value="HTML"/></td>
                        <td><input type="radio" id="css" name="q10" value="CSS"/></td>
                        <td><input type="radio" id="toko" name="q10" value="JavaScript"/></td>
                        <td><input type="radio" id="javascript" name="q10" value="JavaScript"/></td>
                    </tr>
                    <tr>
                        <td><input type="submit" value="אישור"/></td>
                    </tr>
                    <br/>
                    <tr>
                        <td>תוצאה:</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>


    )
}