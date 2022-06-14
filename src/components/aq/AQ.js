import React, {useState} from "react";
import {Button, Form, Row, Col, Container, ButtonGroup, Table} from 'react-bootstrap'
import AQ10AdultForm from "./AQ10Adult";
import AQ10ChildrenForm from "./AQ10Children";


function AQ({ref}) {
    const [modelType, setModelType] = useState('adult');
    const [modelResult, setModelResult] = useState('בבדיקה...');
    const [formResult, setFormResult] = useState('טרם נקבעה');
    const [modelResultMessage, setModelResultMessage] = useState('יש למלא את הטופס במלואו');
    const [isFormValid, setIsFormValid] = useState(null);
    const optionsAdult = [];
    const optionsChildren = [];
    const [details, setDetails] = useState({
        Who_completed_the_test: 'Parent',
        Family_mem_with_ASD: null,
        Jaundice: null,
        Ethnicity: 'Middle Eastern',
        Gender: null,
        result: 0,
        Age: null,
        A10: null,
        A9: null,
        A8: null,
        A7: null,
        A6: null,
        A5: null,
        A4: null,
        A3: null,
        A2: null,
        A1: null
    })

    for (let op = 4; op <= 11; op++) {
        optionsChildren.push(<option style={{fontSize: 18}} id={op} value={op}>{op}</option>);
    }
    for (let op = 18; op <= 99; op++) {
        optionsAdult.push(<option style={{fontSize: 18}} id={op} value={op}>{op}</option>);
    }

    const formValidation = () => {
        for (let key in details) {
            console.log(key, details[key])
            if (details[key] === null) {
                setIsFormValid(false)
                setModelResultMessage('יש למלא את הטופס במלואו')
                return false
            }
        }
        setIsFormValid(true)
        return true
    }

    const submitHandler = async e => {
        e.preventDefault()
        if (formValidation() === false) {
            return
        }
        details.result = details.A1 + details.A2 + details.A3 + details.A4 +
            details.A5 + details.A6 + details.A7 + details.A8 + details.A9 + details.A10

        setFormResult(details.result.toString())
        console.log(details)
        console.log('type', modelType)

        const finalToModel = details.A1 + ',' + details.A2 + ',' + details.A3 + ',' + details.A4 + ',' + details.A5 +
            ',' + details.A6 + ',' + details.A7 + ',' + details.A8 + ',' + details.A9 + ',' + details.A10 +
            ',' + details.Age + ',' + details.Gender + ',' + details.Ethnicity + ',' + details.Jaundice +
            ',' + details.Family_mem_with_ASD + ',' + 'unknown' + ',' + 'NO' + ',' + details.result + ',' + '18 and more' + ',' + details.Who_completed_the_test

        console.log(finalToModel)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'data': finalToModel, 'type': modelType})
        }
        fetch('https://lironhaim.pythonanywhere.com/predict', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data['prediction'][0] === 0) {
                    setModelResultMessage('בהתאם לנתונים שיש לנו, ובשילוב עם תוצאות הטופס שלך, התוצאה היא: שלילית. לדעתנו, אין צורך ללכת כרגע לבדיקות נוספות.')
                    setModelResult('שלילית')
                } else if (data['prediction'][0] === 1) {
                    setModelResultMessage('בהתאם לנתונים שיש לנו, ובשילוב עם תוצאות הטופס שלך, התוצאה היא: חיובית. מומלץ ללכת לבדיקות נוספות או למטפלים להמשך סיוע.')
                    setModelResult('חיובית')
                }
            });
    }

    return (
        <div>
            <div ref={ref}>
                <Form className="col justify-content-center p-4">
                    <Form.Group>

                        <Form.Label className="text-center fs-1" style={{fontWeight: "bold",width: "100%"}}>טופס לאבחון
                            אוטיזם</Form.Label>
                        {/*<Container className='align-self-center align-content-center p-4' style={{alignSelf: 'center'}}>*/}

                        <br/>
                        <br/>

                        <Row className='justify-content-center'>
                            <Form.Label style={{width: '70%'}}>מהו טופס AQ-10?</Form.Label>
                            <Row style={{fontSize: 20, width: '70%'}}>
                                טופס AQ-10 הוא שאלון המשמש לאבחון מוקדם של אוטיזם.
                                הוא מיועד עבור אנשים עם לקות למידה בינונית-קשה אשר עלולים להיות חשודים למאובחנים
                                באוטיזם.
                                השאלון עצמו מורכב מ-10 שאלות פשוטות כאשר לכל תשובה ישנן 4 אפשרויות: מסכים, מסכים בהחלט,
                                לא
                                מסכים, לא מסכים בהחלט.
                            </Row>
                        </Row>
                        <br/>


                        <Row className='justify-content-center'>
                            <Form.Label style={{width: '70%'}}>איך ממלאים?</Form.Label>
                            <Row style={{fontSize: 20, width: '70%'}}>
                                יש למנות את הניקוד לשאלון באופן הבא:
                                תשובות של מסכים/מסכים בהחלט עבור שאלות: 1,5,7,10 מזכות בנקודה, אחרת לא מקבלים נקודה.
                                תשובות של לא מסכים/בהחלט לא מסכים עבור שאלות: 2,3,4,6,8,9 מזכות בנקודה, אחרת לא מקבלים
                                נקודה.
                            </Row>
                        </Row>
                        <br/>
                        <Row className='justify-content-center'>
                            <Form.Label style={{width: '70%'}}>מה אומרת התוצאה?</Form.Label>
                            <Row style={{fontSize: 20, width: '70%'}}>
                                אם התקבל ניקוד של 6 ומעלה, אזי קיים חשד לאוטיזם וכדאי לפנות לגורם מקצועי לביצוע בדיקה
                                מעמיקה
                                ומקיפה יותר.
                            </Row>
                        </Row>
                        <br/>
                        <Row className='justify-content-center'>
                            <Form.Label style={{width: '70%'}}>הטופס שלנו...</Form.Label>
                            <Row style={{fontSize: 20, width: '70%'}}>
                                ניתן למלא את הטופס באופן נוח ומונגש. בנוסף, הנתונים יעובדו דרך מודל למידת מכונה למען
                                תוצאה
                                מדויקת יותר.
                            </Row>
                        </Row>
                        <br/>
                        <Row className='justify-content-center' style={{fontSize: 20}}>
                            הטופס מנוסח בלשון זכר אך במיוחד לכלל המינים.
                        </Row>
                        {/*</Container>*/}
                    </Form.Group>
                </Form>
                <Container className='border-4 border w-75'>
                    <Form className="col justify-content-center">
                        <Form.Group>
                            <Container className='m-3' style={{width: '700px'}}>

                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        סוג טופס:
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <Form.Select id='type'
                                                         style={{width:'200px'}}
                                                         onChange={e => {
                                                setModelType(e.target.value)
                                                setIsFormValid(null)
                                                setModelResult('בבדיקה...')
                                                setModelResultMessage('יש למלא את הטופס במלואו')
                                            }}
                                            >
                                                <option style={{fontSize: 18}} id='title3' value="adult">מבוגרים (18
                                                    ומעלה)
                                                </option>
                                                <option style={{fontSize: 18}} id='title4' value="children">ילדים
                                                    (4-11)
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        מי ממלא טופס זה:
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <Form.Select id='type'
                                                         style={{width:'200px'}}
                                                         onChange={e => setDetails({
                                                ...details,
                                                Who_completed_the_test: e.target.value
                                            })}
                                            >
                                                <option style={{fontSize: 18}} id='title5' value="Parent">הורה</option>
                                                <option style={{fontSize: 18}} id='title1' value="Relative">בן משפחה
                                                </option>
                                                <option style={{fontSize: 18}} id='title2'
                                                        value="Health care professional">מטפל
                                                </option>
                                                <option style={{fontSize: 18}} id='title3' value="Self">מילוי עצמאי
                                                </option>
                                                {/*<option style={{fontSize: 18}} id='title4' value="Others">מורה</option>*/}

                                                <option style={{fontSize: 18}} id='title6' value="Others">אחר</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        אתניות:
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <Form.Select id='type'
                                                         style={{width:'200px'}}
                                                         onChange={e => setDetails({
                                                             ...details,
                                                             Ethnicity: e.target.value
                                                         })}
                                            >
                                                <option style={{fontSize: 18}} id='middle eastern'
                                                        value="Middle Eastern">מזרח
                                                    התיכון
                                                </option>
                                                <option style={{fontSize: 18}} id='south asian' value="South Asian">דרום
                                                    אסיה
                                                </option>
                                                <option style={{fontSize: 18}} id='Hispanic' value="Hispanic">היספני
                                                </option>

                                                <option style={{fontSize: 18}} id='asian' value="Asian">אסיה</option>
                                                <option style={{fontSize: 18}} id='black' value="Black">אפרו-אמריקאים
                                                </option>
                                                <option style={{fontSize: 18}} id='Others' value="Others">אחר</option>
                                                {/*<option style={{fontSize: 18}} id='mixed' value="mixed">מעורבב</option>*/}
                                                <option style={{fontSize: 18}} id='Pacifica'
                                                        value="Pasifika">פסיפיקה,קליפורניה
                                                </option>
                                                <option style={{fontSize: 18}} id='Latino' value="Latino">לטינו</option>
                                                <option style={{fontSize: 18}} id='Native Indian'
                                                        value="Native Indian">אינדיאנים
                                                </option>
                                                <option style={{fontSize: 18}} id='White European'
                                                        value="White-European">אירופה
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        גיל (שנים):
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <Form.Select id='age'
                                                         style={{width:'200px'}}
                                                         onChange={e => setDetails({...details, Age: e.target.value})}
                                                // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                            >
                                                <option style={{fontSize: 18}} id='choose' value={null}>בחר</option>
                                                {modelType === 'children' && optionsChildren}
                                                {modelType === 'adult' && optionsAdult}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        מין:
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <Form.Select id='gender'
                                                         style={{width:'200px'}}
                                                         onChange={e => setDetails({
                                                             ...details,
                                                             Gender: e.target.value
                                                         })}
                                                // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                            >
                                                <option style={{fontSize: 18}} id='choose' value={null}>בחר</option>
                                                <option style={{fontSize: 18}} id='male' value='m'>זכר</option>
                                                <option style={{fontSize: 18}} id='female' value="f">נקבה</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        רקע עם מחלת צהבת
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <ButtonGroup className="gap-3"
                                                         style={{width:'200px'}}><Form.Text
                                                style={{fontSize: 20}}>כן</Form.Text>
                                                <Form.Check style={{fontSize: 20}} type="radio" name='jaundice'
                                                            onChange={e => setDetails({...details, Jaundice: 'yes'})}
                                                /><Form.Text style={{fontSize: 20}}>לא</Form.Text>
                                                <Form.Check style={{fontSize: 20}} type="radio" name='jaundice'
                                                            onChange={e => setDetails({...details, Jaundice: 'no'})}
                                                />
                                            </ButtonGroup>

                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{fontSize: 20}}>
                                        קיים בן משפחה עם אוטיזם?
                                    </Col>
                                    <Col md="auto">
                                        <Form.Group className="mb-3">
                                            <ButtonGroup className="gap-3" style={{width:'200px'}}>
                                                <Form.Text style={{fontSize: 20}}>כן</Form.Text>
                                                <Form.Check style={{fontSize: 20}} type="radio"
                                                            name='memberFamilyWithAsd' required
                                                            onChange={e => setDetails({
                                                                ...details,
                                                                Family_mem_with_ASD: 'yes'
                                                            })}
                                                />
                                                <Form.Text style={{fontSize: 20}}>לא</Form.Text>
                                                <Form.Check style={{fontSize: 20}} type="radio"
                                                            name='memberFamilyWithAsd'
                                                            onChange={e => setDetails({
                                                                ...details,
                                                                Family_mem_with_ASD: 'no'
                                                            })}
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
                            <Table className="table-responsive border-dark" striped bordered hover size="md">
                                <thead>
                                <tr>
                                    <th className="text-center align-baseline p-1 ">#</th>
                                    <th className="text-center align-baseline p-1" style={{fontSize: 16}}>שאלה</th>
                                    <th className="text-center align-baseline p-1"
                                        style={{fontSize: 16, minWidth: '80px'}}>מסכים בהחלט
                                    </th>
                                    <th className="text-center align-baseline p-1 "
                                        style={{fontSize: 16, minWidth: '80px'}}>מסכים
                                    </th>
                                    <th className="text-center align-baseline p-1"
                                        style={{fontSize: 16, minWidth: '80px'}}>לא מסכים
                                    </th>
                                    <th className="text-center align-baseline p-1"
                                        style={{fontSize: 16, minWidth: '80px'}}>בהחלט לא מסכים
                                    </th>
                                </tr>
                                </thead>
                                {modelType === 'adult' && <AQ10AdultForm details={details} setDetails={setDetails}/>}
                                {modelType === 'children' &&
                                <AQ10ChildrenForm details={details} setDetails={setDetails}/>}
                            </Table>
                        </Form.Group>
                    </Form>
                </Container>
                <br/>
            </div>
            <Row className="justify-content-center">
                <Button className=" rounded-3" style={{width: "20%"}} size="md" variant="outline-primary"
                        onClick={submitHandler}>שלח טופס לבדיקה</Button>
            </Row>
            <br/>

            {isFormValid === false && <Row className='w-100 align-self-center text-center'>
                <Form.Label
                    style={{fontWeight: 'normal', fontSize: 24,}}>{modelResultMessage}</Form.Label>
            </Row>}

            {isFormValid &&
            <Container className='align-self-center' style={{alignSelf: 'center'}}>
                <Row className='w-50 align-self-center'>
                    <ButtonGroup className='align-self-center'>
                        <Col className={1}><Form.Label
                            style={{fontWeight: 'normal', fontSize: 24,}}>{'התוצאה:  '}</Form.Label></Col>
                        <Col className={1}> <Form.Label
                            style={{fontWeight: 'bolder', fontSize: 24}}>{formResult}</Form.Label></Col>
                    </ButtonGroup>
                    <ButtonGroup className='align-self-center'>
                        <Col className={1}><Form.Label
                            style={{fontWeight: 'normal', fontSize: 24,}}>{'תוצאת המודל החכם:  '}</Form.Label></Col>
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