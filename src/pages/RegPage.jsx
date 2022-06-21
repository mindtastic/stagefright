import React, { useReducer } from "react";
import DisplayRequest from "../views/DisplayRequest";
import DisplayResponse from "../views/DisplayResponse";
import { Container, Row, Col } from "react-bootstrap";
import Registration from "../views/Registration";
import axios from "axios";

const TestPage = (props) => {
    const resetLineAction = () => ({ type: 'RESET' });
    const addLineAction = (line) => ({ type: 'ADD', newLine: line });
    const lineReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat([action.newLine])
            case 'RESET':
                return [];
            default:
                throw new Error("Invalid dispatch action for lines")
        }
    };
    const [req, dispatchReq] = useReducer(lineReducer, []);

    const initRegistration = () => {
        let url = "https://auth.api." + props.cluster + ".mindtastic.lol/self-service/registration/" + props.flow;
        console.log(url);
        console.log(req);
        dispatchReq(addLineAction("URL: " + url));
        console.log(req);

    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Registration initHandler={initRegistration}></Registration>
                </Col>
                <Col md={{ span: 8 }}>
                    <DisplayRequest text={req}></DisplayRequest>
                    <DisplayResponse></DisplayResponse>
                </Col>
            </Row>
        </Container>
    );
}

export default TestPage;