import {Form, Row, Col} from 'react-bootstrap'

function AboutUs() {
    return (
        <div id="aboutUs">
            <Col className="text-center">
            <Row>
                <Form.Label style={{fontSize:40 , fontWeight: "bold"}}>אודות</Form.Label>
            </Row>
            <Row>
                <Form.Label>האתר פורטפל פותח במסגרת פרויקט גמר במדעי המחשב באוניברסיטת בר אילן.</Form.Label>
            </Row>
                <br/>
            <Row>
                <Form.Label style={{fontWeight: "bold"}}>מפתחים:</Form.Label>
            </Row>
            <Row>
                <Form.Label>רונלי ויגננסקי</Form.Label></Row>
            <Row>
                <Form.Label>סתיו לידור</Form.Label>
            </Row>
            <Row>
                <Form.Label>לירון חיים</Form.Label>
            </Row>
            </Col>
        </div>
    )
}

export default AboutUs