import React, {useEffect, useState, useCallback, useContext} from "react";
import {Button, Form, Row, Col, Container, ButtonGroup, Table, Grid} from 'react-bootstrap'
import {Dropdown} from "bootstrap";
// import APiGraphs from "./Bubble";
import MultiType from "./components/MultiTypeGraph";


function AQ() {
    const [modelResult, setModelResult] = useState('טרם נקבעה');
    const [modelResultMessage, setModelResultMessage] = useState('יש למלא את הטופס במלואו');
    const [APIResult, setAPIResult] = useState('');
    const options = [];
    const [details, setDetails] = useState({
        ['Who completed the test']: 'family member',
        ['Family_mem_with_ASD']: 'yes',
        Jaundice: 'yes',
        Ethnicity: 'middle eastern',
        Sex: 'm',
        ['Qchat-10-Score']: 0,
        Age_Mons: 4 * 12,
        A10: 0,
        A9: 0,
        A8: 0,
        A7: 0,
        A6: 0,
        A5: 0,
        A4: 0,
        A3: 0,
        A2: 0,
        A1: 0
    })
    for (let op = 4; op <= 11; op++) {
        options.push(<option style={{fontSize: 18}} id={op} value={op}>{op}</option>);
    }
    const submitHandler = async e => {
        e.preventDefault()
        details['Qchat-10-Score'] = details.A1 + details.A2 + details.A3 + details.A4 +
            details.A5 + details.A6 + details.A7 + details.A8 + details.A9 + details.A10

        console.log(details)

        const finalToModel = '1,'
            + details.A1 + ',' + details.A2 + ',' + details.A3 + ',' + details.A4 + ',' + details.A5 +
            ',' + details.A6 + ',' + details.A7 + ',' + details.A8 + ',' + details.A9 + ',' + details.A10 +
            ',' + details.Age_Mons + ',' + details['Qchat-10-Score'] + ',' + details.Sex + ',' + details.Ethnicity + ',' + details.Jaundice +
            ',' + details['Family_mem_with_ASD'] + ',' + details['Who completed the test']

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'data': finalToModel})
        };
        fetch('https://lironhaim.pythonanywhere.com/predict', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data['prediction'][0] === 0) {
                    setModelResultMessage('בהתאם לנתונים שיש לנו, ובשילוב עם תוצאות הטופס שלך, התוצאה היא: שלילית. לדעתנו, איו צורך ללכת כרגע לבדיקות נוספות.')
                    setModelResult('שלילית')
                } else if (data['prediction'][0] === 1) {
                    setModelResultMessage('בהתאם לנתונים שיש לנו, ובשילוב עם תוצאות הטופס שלך, התוצאה היא: חיובית. מומלץ ללכת לבדיקות נוספות או למטפלים להמשך סיוע.')
                    setModelResult('חיובית')
                }
            });


        const APIrequest = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // 'id': "gOCpJKs43uRr8Y7QHkHL"
                'auth_code': "tokolocopoco"
            })
        };
        fetch('https://lironhaim15.pythonanywhere.com/get', APIrequest)
            .then(response => response.json())
            .then(data => {
                console.log("dataaaaa")

                console.log("dataaaaa", data)
                setAPIResult(data)
            });

    }

    return (
        <div>
            <Form className="col justify-content-center" >
                <Form.Group>
                    <Form.Label className="text-center" style={{fontWeight: "bold", width: "100%"}}>טופס לאבחון
                        אוטיזם</Form.Label>

                    <Container className='align-self-center p-4' style={{alignSelf: 'center'}}>

                        <Form.Label>מהו טופס AQ-10?</Form.Label>
                        <Row className='justify-content-center' style={{fontSize: 20}}>
                            טופס AQ-10 הוא שאלון המשמש לאבחון מוקדם של אוטיזם.
                            הוא מיועד עבור אנשים עם לקות למידה בינונית-קשה אשר עלולים להיות חשודים למאובחנים באוטיזם.
                            השאלון עצמו מורכב מ-10 שאלות פשוטות כאשר לכל תשובה ישנן 4 אפשרויות: מסכים, מסכים בהחלט, לא
                            מסכים, לא מסכים בהחלט.
                        </Row>
                        <br/>
                        <Form.Label>איך ממלאים?</Form.Label>
                        <Row className='justify-content-center' style={{fontSize: 20}}>
                            יש למנות את הניקוד לשאלון באופן הבא:
                            תשובות של מסכים/מסכים בהחלט עבור שאלות: 1,5,7,10 מזכות בנקודה, אחרת לא מקבלים נקודה.
                            תשובות של לא מסכים/בהחלט לא מסכים עבור שאלות: 2,3,4,6,8,9 מזכות בנקודה, אחרת לא מקבלים
                            נקודה.
                        </Row>
                        <br/>
                        <Form.Label>מה אומרת התוצאה?</Form.Label>
                        <Row className='justify-content-center' style={{fontSize: 20}}>
                            אם התקבל ניקוד של 6 ומעלה, אזי קיים חשד לאוטיזם וכדאי לפנות לגורם מקצועי לביצוע בדיקה מעמיקה
                            ומקיפה יותר.
                        </Row>
                        <br/>
                        <Form.Label>הטופס שלנו...</Form.Label>
                        <Row className='justify-content-center' style={{fontSize: 20}}>
                            ניתן למלא את הטופס באופן נוח ומונגש. בנוסף, הנתונים יעובדו דרך מודל למידת מכונה למען תוצאה
                            מדויקת יותר.
                        </Row>
                    </Container>
                </Form.Group>
            </Form>
            <Container className='border-4 border'  >
            <Form className="col justify-content-center" >
            <Form.Group>
                    <Container className='m-3'  >

                        <Row>
                            <Col style={{fontSize: 17}}>
                                מי ממלא טופס זה:
                            </Col>
                            <Col md="auto">
                                <Form.Group className="mb-3">
                                    <Form.Select id='type' onChange={e => setDetails({
                                        ...details,
                                        ['Who completed the test']: e.target.value
                                    })}
                                    >
                                        <option style={{fontSize: 18}} id='title1' value="family member">בן משפחה
                                        </option>
                                        <option style={{fontSize: 18}} id='title2' value="Health care professional">מטפל
                                        </option>
                                        <option style={{fontSize: 18}} id='title3' value="Self">מילוי עצמאי</option>
                                        <option style={{fontSize: 18}} id='title4' value="Others">מורה</option>
                                        <option style={{fontSize: 18}} id='title5' value="family member">הורה</option>
                                        <option style={{fontSize: 18}} id='title6' value="Others">אחר</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontSize: 17}}>
                                אתניות:
                            </Col>
                            <Col md="auto">
                                <Form.Group className="mb-3">
                                    <Form.Select id='type'
                                                 onChange={e => setDetails({...details, Ethnicity: e.target.value})}
                                    >
                                        <option style={{fontSize: 18}} id='middle eastern' value="middle eastern">מזרח
                                            התיכון
                                        </option>
                                        <option style={{fontSize: 18}} id='south asian' value="south asian">דרום אסיה
                                        </option>
                                        <option style={{fontSize: 18}} id='Hispanic' value="Hispanic">היספני</option>

                                        <option style={{fontSize: 18}} id='asian' value="asian">אסיה</option>
                                        <option style={{fontSize: 18}} id='black' value="black">אפרו-אמריקאים</option>
                                        <option style={{fontSize: 18}} id='Others' value="Others">אחר</option>
                                        <option style={{fontSize: 18}} id='mixed' value="mixed">מעורבב</option>
                                        <option style={{fontSize: 18}} id='Pacifica' value="Pacifica">פסיפיקה,קליפורניה
                                        </option>
                                        <option style={{fontSize: 18}} id='Latino' value="Latino">לטינו</option>
                                        <option style={{fontSize: 18}} id='Native Indian'
                                                value="Native Indian">אינדיאנים
                                        </option>
                                        <option style={{fontSize: 18}} id='White European' value="White European">אירופה
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{fontSize: 17}}>
                                גיל:
                            </Col>
                            <Col md="auto">
                                <Form.Group className="mb-3">
                                    <Form.Select id='age'
                                                 onChange={e => setDetails({...details, Age_Mons: e.target.value * 12})}
                                        // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                    >
                                        {options}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontSize: 17}}>
                                מין:
                            </Col>
                            <Col md="auto">
                                <Form.Group className="mb-3">
                                    <Form.Select id='gender'
                                                 onChange={e => setDetails({...details, Sex: e.target.value})}
                                        // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                    >
                                        <option style={{fontSize: 18}} id='male' value='m'>זכר</option>
                                        <option style={{fontSize: 18}} id='female' value="f">נקבה</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{fontSize: 17}}>
                                רקע עם מחלת צהבת
                            </Col>
                            <Col md="auto">
                                <Form.Group className="mb-3">
                                    <ButtonGroup className="gap-3"><Form.Text style={{fontSize: 18}}>כן</Form.Text>
                                        <Form.Check style={{fontSize: 18}} type="radio" name='jaundice'
                                                    onChange={e => setDetails({...details, Jaundice: 'yes'})}
                                        /><Form.Text style={{fontSize: 18}}>לא</Form.Text>
                                        <Form.Check style={{fontSize: 18}} type="radio" name='jaundice'
                                                    onChange={e => setDetails({...details, Jaundice: 'no'})}
                                        />
                                    </ButtonGroup>

                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{fontSize: 17}}>
                                קיים בן משפחה עם אוטיזם?
                            </Col>
                            <Col md="auto">
                                <Form.Group className="mb-3">
                                    <ButtonGroup className="gap-3">
                                        <Form.Text style={{fontSize: 18}}>כן</Form.Text>
                                        <Form.Check style={{fontSize: 18}} type="radio" name='memberFamilyWithAsd'
                                                    onChange={e => setDetails({...details, Family_mem_with_ASD: 'yes'})}
                                        />
                                        <Form.Text style={{fontSize: 18}}>לא</Form.Text>
                                        <Form.Check style={{fontSize: 18}} type="radio" name='memberFamilyWithAsd'
                                                    onChange={e => setDetails({...details, Family_mem_with_ASD: 'no'})}
                                        />
                                    </ButtonGroup>

                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>
            </Form>

            <Form className="col justify-content-center">
                <Form.Group>
                    <Table className="table-responsive" striped bordered hover size="md" variant="dark">
                        <thead>
                        <tr>
                            <th className="text-center align-baseline p-1 ">#</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 16}}>שאלה</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 16,minWidth:'80px'}}>מסכים בהחלט</th>
                            <th className="text-center align-baseline p-1 " style={{fontSize: 16,minWidth:'80px'}}>מסכים</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 16,minWidth:'80px'}}>לא מסכים</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 16,minWidth:'80px'}}>בהחלט לא מסכים</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="text-end">1</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא נוטה להבחין בצלילים
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
                            <td className="text-end">2</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא בדרך כלל מתרכז יותר
                                בתמונה הכללית
                                מאשר בפרטים הקטנים.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="secondQuestion" type="radio"
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
                            <td className="text-end">3</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>במפגש חברתי, הוא מצליח
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
                            <td className="text-end">4</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא מצליח לעבור בין
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
                            <td className="text-end">5</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא לא יודע איך להחזיק
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
                            <td className="text-end">6</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא טוב בשיחת חולין.</td>
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
                            <td className="text-end">7</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>כאשר מספרים לו סיפור, קשה
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
                            <td className="text-end">8</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>כשהיה בגן, הוא אהב לשחק
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
                            <td className="text-end">9</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא מצליח להבין בקלות מה
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
                            <td className="text-end">10</td>
                            <td className="text-end p-2" style={{lineHeight: 1, fontSize: 20}}>הוא מתקשה להכיר וליצור
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
                    </Table>
                </Form.Group>
            </Form>
        </Container>
            <br/>
            <Row className="justify-content-center">
                <Button className=" rounded-3" style={{width: "20%"}} size="md" variant="outline-primary"
                        onClick={submitHandler}>שלח טופס לבדיקה</Button>
            </Row>
            <br/>


            {modelResult !== null &&
            <Container className='align-self-center' style={{alignSelf: 'center'}}>
                <Row className='w-25 align-self-center'>
                    <ButtonGroup className='align-self-center'>
                        <Col className={1}><Form.Label
                            style={{fontWeight: 'normal', fontSize: 24,}}>{'התוצאה:  '}</Form.Label></Col>
                        {/*<Form.Label  style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;</Form.Label>*/}
                        <Col className={1}> <Form.Label
                            style={{fontWeight: 'bolder', fontSize: 24}}>{modelResult}</Form.Label></Col>
                    </ButtonGroup>
                </Row>
                <Row className='justify-content-center' style={{fontSize: 20}}>
                    {modelResultMessage}
                </Row>
            </Container>
            }
        </div>
    )
}

export default AQ