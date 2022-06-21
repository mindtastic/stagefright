import React, { useReducer, useState } from "react";
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

    const [request, setRequest] = useState({
        url: "",
        method: "",
        headers: {}
    });

    const initRegistration = () => {
        let url = "https://auth.api." + props.cluster + ".mindtastic.lol/self-service/registration/" + props.flow;
        let proxyURL = "/" + props.cluster + "/self-service/registration/" + props.flow;

        let method = "GET";
        let headers = {
            Accept: "application/json"
        }

        /*
        dispatchReq(addLineAction("URL: " + proxyURL));
        dispatchReq(addLineAction("Method: GET"));
        dispatchReq(addLineAction("Headers:"));
        dispatchReq(addLineAction("Accept: application/json"));
        */

        setRequest({ url, method, headers });

        fetch(proxyURL, {
            headers
        })
            .then((res) => res.json())
            .then((res) => {

            });

    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Registration initHandler={() => initRegistration()}></Registration>
                </Col>
                <Col md={{ span: 8 }}>
                    <DisplayRequest request={request}></DisplayRequest>
                    <DisplayResponse></DisplayResponse>
                </Col>
            </Row>
        </Container>
    );
}

export default TestPage;