import React, { useState } from "react";
import DisplayRequest from "../views/DisplayRequest";
import FlowData from "../views/FlowData";
import API from "../API";
import LoginProvider from "../util/LoginProvider";
import { Container, Row, Col } from "react-bootstrap";
import Login from "../views/Login";
import LogoutProvider from "../util/LogoutProvider";

const LoginPage = (props) => {
    const initialState = {
        flowID: "",
        csrf: "",
        accountKey: "",
        sessionID: "",
        request: {},
        response: {},
    };

    const [state, setState] = useState(initialState);
    const updateState = (changes) => setState({ ...state, ...changes });

    const reset = () => updateState(initialState);
    const resetPrint = () => updateState({ request: {}, response: {} });

    const login = new LoginProvider(props.cluster, props.flow);

    const initLogin = async () => {
        reset();

        let request = login.getInitRequest();

        updateState({ request });

        let response = await API.makeRequest(request);
        let flowID = "";
        let csrf = "";

        try {
            flowID = response.json.id;
            csrf = response.json.ui.nodes.filter(x => x.attributes.name == "csrf_token").map(x => x.attributes.value)[0];
        } catch (err) {
            console.log(err);
        }

        updateState({ request, response, flowID, csrf });
    }

    const submitLogin = async () => {
        resetPrint();

        let request = login.getSubmitRequest(state.flowID, state.accountKey, state.csrf);

        updateState({ request });

        let response = await API.makeRequest(login.stringifyBody(request));
        let sessionID = "";

        try {
            sessionID = response.json.session.id;
        } catch (err) {
            console.log(err);
        }

        updateState({ request, response, sessionID });

        props.checkForActiveSessionCallback();
    }

    const changeAccountKey = (event) => {
        updateState({ accountKey: event.target.value });
    }

    const formatFlowData = () => {
        return [
            {
                name: "Flow ID",
                value: state.flowID
            },
            {
                name: "CSRF Token",
                value: state.csrf
            },
            {
                name: "Session ID",
                value: state.sessionID
            }
        ]
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Login
                        initHandler={initLogin}
                        submitHandler={submitLogin}
                        accountKey={state.accountKey}
                        accountKeyHandler={changeAccountKey}
                        form={Boolean(state.flowID) && Boolean(state.csrf)}
                        submit={Boolean(state.flowID) && Boolean(state.csrf) && Boolean(state.accountKey)} />
                    <FlowData data={formatFlowData()} />
                </Col>
                <Col md={{ span: 8 }}>
                    <DisplayRequest title="Request" text={state.request} />
                    <DisplayRequest title="Reponse" text={state.response} />
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;