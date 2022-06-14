import {Form} from "react-bootstrap";
import React from "react";

function AQ10ChildrenForm({setDetails, details}) {
        return (
            <tbody>
            <tr>
                <td className="text-center">1</td>
                <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא נוטה להבחין בצלילים
                    קטנים כאשר אחרים
                    לא מבחינים.
                </td>
                {/*מסכים בהחלט*/}
                <td className="text-center">
                    <Form.Check name="firstQuestion" type="radio"
                                onChange={e => setDetails({...details, A1: 1})}/>
                </td>
                {/*מסכים*/}
                <td className="text-center"><Form.Check name="firstQuestion" type="radio"
                                                        onChange={e => setDetails({...details, A1: 1})}/>
                </td>
                {/*לא מסכים*/}
                <td className="text-center"><Form.Check name="firstQuestion" type="radio"
                                                        onChange={e => setDetails({...details, A1: 0})}/>
                </td>
                {/*בהחלט לא מסכים*/}
                <td className="text-center"><Form.Check name="firstQuestion" type="radio"
                                                        onChange={e => setDetails({...details, A1: 0})}/>
                </td>
            </tr>
        <tr>
            <td className="text-center">2</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא בדרך כלל מתרכז יותר
                בתמונה הכללית
                מאשר בפרטים הקטנים.
            </td>
            <td>
                <Form.Check className="text-center" name="secondQuestion" type="radio" required
                            onChange={e => setDetails({...details, A2: 0})}/>
            </td>
            <td><Form.Check className="text-center" name="secondQuestion" type="radio"
                            onChange={e => setDetails({...details, A2: 0})}/></td>
            <td><Form.Check className="text-center" name="secondQuestion" type="radio"
                            onChange={e => setDetails({...details, A2: 1})}/></td>
            <td><Form.Check className="text-center" name="secondQuestion" type="radio"
                            onChange={e => setDetails({...details, A2: 1})}/></td>
        </tr>
        <tr>
            <td className="text-center">3</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>במפגש חברתי, הוא מצליח
                לעקוב בקלות אחר
                מספר שיחות עם אנשים שונים.
            </td>
            <td>
                <Form.Check className="text-center" name="thirdQuestion" type="radio"
                            onChange={e => setDetails({...details, A3: 0})}/>
            </td>
            <td><Form.Check className="text-center" name="thirdQuestion" type="radio"
                            onChange={e => setDetails({...details, A3: 0})}/></td>
            <td><Form.Check className="text-center" name="thirdQuestion" type="radio"
                            onChange={e => setDetails({...details, A3: 1})}/></td>
            <td><Form.Check className="text-center" name="thirdQuestion" type="radio"
                            onChange={e => setDetails({...details, A3: 1})}/></td>
        </tr>
        <tr>
            <td className="text-center">4</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא מצליח לעבור בין
                פעילויות שונות
                בקלות.
            </td>
            <td>
                <Form.Check className="text-center" name="fourthQuestion" type="radio"
                            onChange={e => setDetails({...details, A4: 0})}/>
            </td>
            <td><Form.Check className="text-center" name="fourthQuestion" type="radio"
                            onChange={e => setDetails({...details, A4: 0})}/></td>
            <td><Form.Check className="text-center" name="fourthQuestion" type="radio"
                            onChange={e => setDetails({...details, A4: 1})}/></td>
            <td><Form.Check className="text-center" name="fourthQuestion" type="radio"
                            onChange={e => setDetails({...details, A4: 1})}/></td>
        </tr>
        <tr>
            <td className="text-center">5</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא לא יודע איך להחזיק
                שיחה עם חבריו.
            </td>
            <td>
                <Form.Check className="text-center" name="fifthQuestion" type="radio"
                            onChange={e => setDetails({...details, A5: 1})}/>
            </td>
            <td><Form.Check className="text-center" name="fifthQuestion" type="radio"
                            onChange={e => setDetails({...details, A5: 1})}/></td>
            <td><Form.Check className="text-center" name="fifthQuestion" type="radio"
                            onChange={e => setDetails({...details, A5: 0})}/></td>
            <td><Form.Check className="text-center" name="fifthQuestion" type="radio"
                            onChange={e => setDetails({...details, A5: 0})}/></td>
        </tr>
        <tr>
            <td className="text-center">6</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא טוב בשיחת חולין.</td>
            <td>
                <Form.Check className="text-center" name="sixthQuestion" type="radio"
                            onChange={e => setDetails({...details, A6: 0})}/>
            </td>
            <td><Form.Check className="text-center" name="sixthQuestion" type="radio"
                            onChange={e => setDetails({...details, A6: 0})}/></td>
            <td><Form.Check className="text-center" name="sixthQuestion" type="radio"
                            onChange={e => setDetails({...details, A6: 1})}/></td>
            <td><Form.Check className="text-center" name="sixthQuestion" type="radio"
                            onChange={e => setDetails({...details, A6: 1})}/></td>
        </tr>
        <tr>
            <td className="text-center">7</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>כאשר מספרים לו סיפור, קשה
                לו לגלות
                ולהבין מה הכוונות והתחושות של כל דמות בסיפור.
            </td>
            <td>
                <Form.Check className="text-center" name="seventhQuestion" type="radio"
                            onChange={e => setDetails({...details, A7: 1})}/>
            </td>
            <td><Form.Check className="text-center" name="seventhQuestion" type="radio"
                            onChange={e => setDetails({...details, A7: 1})}/></td>
            <td><Form.Check className="text-center" name="seventhQuestion" type="radio"
                            onChange={e => setDetails({...details, A7: 0})}/></td>
            <td><Form.Check className="text-center" name="seventhQuestion" type="radio"
                            onChange={e => setDetails({...details, A7: 0})}/></td>
        </tr>
        <tr>
            <td className="text-center">8</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>כשהיה בגן, הוא אהב לשחק
                במשחקי העמדת
                פנים עם ילדים אחרים.
            </td>
            <td>
                <Form.Check className="text-center" name="eightQuestion" type="radio"
                            onChange={e => setDetails({...details, A8: 0})}/>
            </td>
            <td><Form.Check className="text-center" name="eightQuestion" type="radio"
                            onChange={e => setDetails({...details, A8: 0})}/></td>
            <td><Form.Check className="text-center" name="eightQuestion" type="radio"
                            onChange={e => setDetails({...details, A8: 1})}/></td>
            <td><Form.Check className="text-center" name="eightQuestion" type="radio"
                            onChange={e => setDetails({...details, A8: 1})}/></td>
        </tr>
        <tr>
            <td className="text-center">9</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא מצליח להבין בקלות מה
                אדם אחר חושב או
                מרגיש רק על ידי הבטה בפניו.
            </td>
            <td>
                <Form.Check className="text-center" name="ninthQuestion" type="radio"
                            onChange={e => setDetails({...details, A9: 0})}/>
            </td>
            <td><Form.Check className="text-center" name="ninthQuestion" type="radio"
                            onChange={e => setDetails({...details, A9: 0})}/></td>
            <td><Form.Check className="text-center" name="ninthQuestion" type="radio"
                            onChange={e => setDetails({...details, A9: 1})}/></td>
            <td><Form.Check className="text-center" name="ninthQuestion" type="radio"
                            onChange={e => setDetails({...details, A9: 1})}/></td>
        </tr>
        <tr>
            <td className="text-center">10</td>
            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 18}}>הוא מתקשה להכיר וליצור
                חברים חדשים.
            </td>
            <td>
                <Form.Check className="text-center" name="tenthQuestion" type="radio"
                            onChange={e => setDetails({...details, A10: 1})}/>
            </td>
            <td>
                <Form.Check className="text-center" name="tenthQuestion" type="radio"
                            onChange={e => setDetails({...details, A10: 1})}/>
            </td>
            <td>
                <Form.Check className="text-center" name="tenthQuestion" type="radio"
                            onChange={e => setDetails({...details, A10: 0})}/>
            </td>
            <td>
                <Form.Check className="text-center" name="tenthQuestion" type="radio"
                            onChange={e => setDetails({...details, A10: 0})}/>
            </td>
        </tr>
            </tbody>
    )
    }
    export default AQ10ChildrenForm