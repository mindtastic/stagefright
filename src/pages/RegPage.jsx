import React, { useState } from "react";
import DisplayRequest from "../views/DisplayRequest";
import FlowData from "../views/FlowData";
import API from "../API";
import RegistrationProvider from "../util/RegistrationProvider";
import { Container, Row, Col } from "react-bootstrap";
import Registration from "../views/Registration";

const RegPage = (props) => {
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

    const registration = new RegistrationProvider(props.cluster, props.flow);

    const initRegistration = async () => {
        reset();

        let request = registration.getInitRequest();

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

    const submitRegistration = async () => {
        resetPrint();

        let request = registration.getSubmitRequest(state.flowID, state.csrf);

        updateState({ request });

        let response = await API.makeRequest(registration.stringifyBody(request));
        let accountKey = "";
        let sessionID = "";

        try {
            accountKey = response.json.identity.traits.accountKey;
            sessionID = response.json.session.id
        } catch (err) {
            console.log(err);
        }

        updateState({ request, response, accountKey, sessionID });

        props.checkForActiveSessionCallback();
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
                name: "AccountKey",
                value: state.accountKey
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
                    <Registration submit={Boolean(state.flowID) && Boolean(state.csrf)} initHandler={() => initRegistration()} submitHandler={() => submitRegistration()} />
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

export default RegPage;