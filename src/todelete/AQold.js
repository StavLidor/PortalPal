import React, {useEffect, useState, useCallback, useContext} from "react";
import {Button, Form, Row, Col, Container, ButtonGroup, Table, Grid} from 'react-bootstrap'
import {Dropdown} from "bootstrap";


function AQold() {
    var options = [];
    for (var op = 4; op <= 11; op++) {
        options.push(<option style={{fontSize: 18}} id={op} value={op}>{op}</option>);
    }
    return (
        <div>
            <Form className="col justify-content-center" >
                <Form.Group>
                    <Form.Label className="text-center" style={{fontWeight: "bold", width: "100%"}}>טופס לאבחון
                        אוטיזם</Form.Label>

                    <Row>
                        <Col style={{fontSize:17}}>
                            מי ממלא טופס זה:
                        </Col>
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <Form.Select id='type'
                                    // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                >
                                    <option style={{fontSize: 18}} id='title1' value="therapist">בן משפחה</option>
                                    <option style={{fontSize: 18}} id='title2' value="parent">מטפל</option>
                                    <option style={{fontSize: 18}} id='title3' value="admin">מילוי עצמאי</option>
                                    <option style={{fontSize: 18}} id='title4' value="admin">מורה</option>
                                    <option style={{fontSize: 18}} id='title5' value="admin">הורה</option>
                                    <option style={{fontSize: 18}} id='title6' value="admin">אחר</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:17}}>
                           אתניות:
                        </Col>
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <Form.Select id='type'
                                    // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                >
                                    <option style={{fontSize: 18}} id='middle eastern' value="therapist">middle
                                        eastern
                                    </option>
                                    <option style={{fontSize: 18}} id='south asian' value="parent">south asian</option>
                                    <option style={{fontSize: 18}} id='Hispanic' value="admin">Hispanic</option>
                                    <option style={{fontSize: 18}} id='asian' value="admin">asian</option>
                                    <option style={{fontSize: 18}} id='black' value="admin">black</option>
                                    <option style={{fontSize: 18}} id='Others' value="admin">Others</option>
                                    <option style={{fontSize: 18}} id='Israeli' value="admin">Israeli</option>
                                    <option style={{fontSize: 18}} id='mixed' value="admin">mixed</option>
                                    <option style={{fontSize: 18}} id='Pacifica' value="admin">Pacifica</option>
                                    <option style={{fontSize: 18}} id='Latino' value="admin">Latino</option>
                                    <option style={{fontSize: 18}} id='Native Indian' value="admin">Native Indian
                                    </option>
                                    <option style={{fontSize: 18}} id='White European' value="admin">White European
                                    </option>
                                    <option style={{fontSize: 18}} id='?' value="admin">?</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{fontSize:17}}>
                            גיל:
                        </Col>
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <Form.Select id='age'
                                    // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                >
                                    {options}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:17}}>
                            מין:
                        </Col>
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <Form.Select id='gender'
                                    // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                >
                                    <option style={{fontSize: 18}} id='male' value="זכר">זכר</option>
                                    <option style={{fontSize: 18}} id='female' value="נקבה">נקבה</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:17}}>
                         רקע עם מחלת צהבת
                        </Col>
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <ButtonGroup className="gap-3"><Form.Text style={{fontSize:18}}>כן</Form.Text>
                                    <Form.Check style={{fontSize:18}} type="radio" name='jaundice'
                                        // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                    /><Form.Text style={{fontSize:18}}>לא</Form.Text>
                                    <Form.Check style={{fontSize:18}} type="radio" name='jaundice'
                                        // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                    />
                                </ButtonGroup>

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:17}}>
                             קיים בן משפחה עם אוטיזם?
                        </Col>
                        <Col md="auto">
                            <Form.Group className="mb-3">
                                <ButtonGroup className="gap-3">
                                    <Form.Text style={{fontSize:18}}>כן</Form.Text>
                                    <Form.Check style={{fontSize:18}} type="radio" name='memberFamilyWithAsd'
                                        // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                    />
                                    <Form.Text style={{fontSize:18}}>לא</Form.Text>
                                    <Form.Check style={{fontSize:18}} type="radio" name='memberFamilyWithAsd'
                                        // onChange={e => setUserDetails({...userDetails, type: e.target.value})}
                                    />
                                </ButtonGroup>

                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <Form className="col justify-content-center" >
                <Form.Group>
                    <Table className="table-responsive" striped bordered hover size="md" variant="dark">
                        <thead>
                        <tr>
                            <th className="text-center align-baseline p-1 ">#</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 18}}>שאלה</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 18}}>מסכים בהחלט</th>
                            <th className="text-center align-baseline p-1 " style={{fontSize: 18}}>מסכים</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 18}}>לא מסכים</th>
                            <th className="text-center align-baseline p-1" style={{fontSize: 18}}>בהחלט לא מסכים</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="text-end">1</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא נוטה להבחין בצלילים קטנים כאשר אחרים
                                לא מבחינים.
                            </td>
                            <td className="text-center">
                                <Form.Check  name="firstQuestion" type="radio"/>
                            </td>
                            <td className="text-center"><Form.Check  name="firstQuestion" type="radio"/></td>
                            <td className="text-center"><Form.Check name="firstQuestion" type="radio"/></td>
                            <td className="text-center"><Form.Check  name="firstQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">2</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא בדרך כלל מתרכז יותר בתמונה הכללית
                                מאשר בפרטים הקטנים.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="secondQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="secondQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="secondQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="secondQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">3</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>במפגש חברתי, הוא מצליח לעקוב בקלות אחר
                                מספר שיחות עם אנשים שונים.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="thirdQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="thirdQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="thirdQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="thirdQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">4</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא מצליח לעבור בין פעילויות שונות
                                בקלות.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="fourthQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="fourthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="fourthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="fourthQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">5</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא לא יודע איך להחזיק שיחה עם חבריו.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="fifthQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="fifthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="fifthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="fifthQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">6</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא טוב בשיחת חולין.</td>
                            <td>
                                <Form.Check className="text-center" name="sixthQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="sixthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="sixthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="sixthQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">7</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>כאשר מספרים לו סיפור, קשה לו לגלות
                                ולהבין מה הכוונות והתחושות של כל דמות בסיפור.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="seventhQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="seventhQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="seventhQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="seventhQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">8</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>כשהיה בגן, הוא אהב לשחק במשחקי העמדת
                                פנים עם ילדים אחרים.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="eightQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="eightQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="eightQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="eightQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">9</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא מצליח להבין בקלות מה אדם אחר חושב או
                                מרגיש רק על ידי הבטה בפניו.
                            </td>
                            <td>
                                <Form.Check className="text-center" name="ninthQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="ninthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="ninthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="ninthQuestion" type="radio"/></td>
                        </tr>
                        <tr>
                            <td className="text-end">10</td>
                            <td className="text-end p-2" style={{lineHeight: 1 ,fontSize: 13}}>הוא מתקשה להכיר וליצור חברים חדשים.</td>
                            <td>
                                <Form.Check className="text-center" name="tenthQuestion" type="radio"/>
                            </td>
                            <td><Form.Check className="text-center" name="tenthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="tenthQuestion" type="radio"/></td>
                            <td><Form.Check className="text-center" name="tenthQuestion" type="radio"/></td>
                        </tr>

                        </tbody>
                    </Table>
                </Form.Group>
            </Form>
            <Row className="justify-content-center">
                <Button className=" rounded-3" style={{width: "10%"}} size="md" variant="outline-primary">אישור</Button>
            </Row>
            {/*<Form>*/}
            {/*    <Form.Group>*/}
            <Row className="justify-content-center text-center">
                <Form.Text>התוצאה:</Form.Text>
            </Row>
            {/*    </Form.Group>*/}
            {/*</Form>*/}
        </div>
    )
}

export default AQold