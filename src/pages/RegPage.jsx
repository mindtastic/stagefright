import React, { useReducer, useState } from "react";
import DisplayRequest from "../views/DisplayRequest";
import FlowData from "../views/FlowData";
import { Container, Row, Col } from "react-bootstrap";
import Registration from "../views/Registration";
import axios from "axios";

const TestPage = (props) => {
    const reset = () => {
        setRequest({});
        setResponse({});
        setCSRF("");
        setFlowID("");
    }

    const [request, setRequest] = useState({});

    const [response, setResponse] = useState({});

    const [flowID, setFlowID] = useState("");
    const [csrf, setCSRF] = useState("");
    const [accountKey, setAccountKey] = useState("");

    const initRegistration = () => {
        reset();

        let url = "https://auth.api." + props.cluster + ".mindtastic.lol/self-service/registration/" + props.flow;
        let proxyURL = "/" + props.cluster + "/self-service/registration/" + props.flow;

        let requestParams = {
            url,
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }

        setRequest(requestParams);

        fetch(proxyURL, requestParams)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                status: res.status,
                json
            }))
                .then((json) => {
                    setResponse({ ...response, headers: json.headers, status: json.status, body: json.json });
                    setFlowID(json.json.id);
                    setCSRF(json.json.ui.nodes.filter(x => x.attributes.name == "csrf_token").map(x => x.attributes.value)[0]);
                }));
    }

    const submitRegistration = () => {
        let url = "https://auth.api." + props.cluster + ".mindtastic.lol/self-service/registration?flow=" + flowID;
        let proxyURL = "/" + props.cluster + "/self-service/registration?flow=" + flowID;

        let requestParams = {
            url,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: {
                method: "password"
            }
        }

        if (props.flow == "browser") requestParams.body.csrf_token = csrf;

        setRequest(requestParams);

        console.log(requestParams);

        fetch(proxyURL, { ...requestParams, body: JSON.stringify(requestParams.body) })
            .then(res => res.json().then(json => ({
                headers: res.headers,
                status: res.status,
                json
            }))
                .then((json) => {
                    setResponse({ ...response, headers: json.headers, status: json.status, body: json.json });
                    setAccountKey(json.json.identity.traits.accountKey);
                }));
    }

    const formatFlowData = () => {
        return [
            {
                name: "Flow ID",
                value: flowID
            },
            {
                name: "CSRF Token",
                value: csrf
            },
            {
                name: "AccountKey",
                value: accountKey
            }
        ]
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Registration submit={Boolean(flowID) && Boolean(csrf)} initHandler={() => initRegistration()} submitHandler={() => submitRegistration()}></Registration>
                    <FlowData data={formatFlowData()}></FlowData>
                </Col>
                <Col md={{ span: 8 }}>
                    <DisplayRequest title="Request" text={request}></DisplayRequest>
                    <DisplayRequest title="Reponse" text={response}></DisplayRequest>
                </Col>
            </Row>
        </Container>
    );
}

export default TestPage;