import React, { useReducer, useState } from "react";
import DisplayRequest from "../views/DisplayRequest";
import FlowData from "../views/FlowData";
import API, { getFormattedURL, getFormattedProxyURL } from "../API";
import RegistrationProvider from "../util/RegistrationProvider";
import { Container, Row, Col } from "react-bootstrap";
import Registration from "../views/Registration";

const RegPage = (props) => {
    const reset = () => {
        setRequest({});
        setResponse({});
        setCSRF("");
        setFlowID("");
        setSessionID("");
    }

    const resetPrint = () => {
        setRequest({});
        setResponse({});
    }

    const [request, setRequest] = useState({});

    const [response, setResponse] = useState({});

    const [flowID, setFlowID] = useState("");
    const [csrf, setCSRF] = useState("");
    const [accountKey, setAccountKey] = useState("");
    const [sessionID, setSessionID] = useState("");

    const initRegistration = async () => {
        reset();

        let registration = new RegistrationProvider(props.cluster, props.flow);
        let newRequest = registration.getInitRequest();

        setRequest(newRequest);

        var jsonRes = await API.makeRequest(newRequest);
        setResponse({ ...response, headers: jsonRes.headers, status: jsonRes.status, body: jsonRes.json });
        setFlowID(jsonRes.json.id);
        setCSRF(jsonRes.json.ui.nodes.filter(x => x.attributes.name == "csrf_token").map(x => x.attributes.value)[0]);
    }

    const submitRegistration = async () => {
        resetPrint();

        let registration = new RegistrationProvider(props.cluster, props.flow);
        let newRequest = registration.getSubmitRequest(flowID, csrf);

        setRequest(newRequest);

        console.log(newRequest);

        var jsonRes = await API.makeRequest(registration.stringifyBody(newRequest));
        setResponse({ ...response, headers: jsonRes.headers, status: jsonRes.status, body: jsonRes.json });
        setAccountKey(jsonRes.json.identity.traits.accountKey);
        setSessionID(jsonRes.json.session.id);
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
            },
            {
                name: "Session ID",
                value: sessionID
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

export default RegPage;