import React, { useReducer, useState } from "react";
import DisplayRequest from "../views/DisplayRequest";
import FlowData from "../views/FlowData";
import API, { getFormattedURL, getFormattedProxyURL } from "../API";
import LogoutProvider from "../util/LogoutProvider";
import { Container, Row, Col } from "react-bootstrap";
import Logout from "../views/Logout";

const LogoutPage = (props) => {
    const reset = () => {
        setRequest({});
        setResponse({});
        setLogoutToken("");
    }

    const resetPrint = () => {
        setRequest({});
        setResponse({});
    }

    const [request, setRequest] = useState({});
    const [response, setResponse] = useState({});

    const [logoutToken, setLogoutToken] = useState("");

    const initLogout = async () => {
        reset();

        let logout = new LogoutProvider(props.cluster, props.flow);
        let newRequest = logout.getInitRequest();

        setRequest(newRequest);

        var jsonRes = await API.makeRequest(newRequest);
        setResponse({ ...response, headers: jsonRes.headers, status: jsonRes.status, body: jsonRes.json });
        setLogoutToken(jsonRes.json.logout_token);
    }

    const submitLogout = async () => {
        resetPrint();

        let logout = new LogoutProvider(props.cluster, props.flow);
        let newRequest = logout.getSubmitRequest(logoutToken);

        setRequest(newRequest);

        var jsonRes = await API.makeRequestNoJSON(newRequest);
        setResponse(jsonRes);

        props.sessionHandler();
    }

    const formatFlowData = () => {
        return [
            {
                name: "Logout Token",
                value: logoutToken
            }
        ]
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Logout initHandler={initLogout} submitHandler={submitLogout} submit={Boolean(logoutToken)}></Logout>
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

export default LogoutPage;