import React, { useState } from "react";
import DisplayRequest from "../views/DisplayRequest";
import FlowData from "../views/FlowData";
import API from "../API";
import { Container, Row, Col } from "react-bootstrap";
import Registration from "../views/Registration";
import { malformedResponse } from "../util/errors";
import { stringifyBody } from "../util/stringifyBody";

const RegPage = ({ requestProvider, sessionChangeCallback }) => {
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
    
    const initRegistration = async () => {
        reset();
        
        const request = requestProvider.initRegistration();
        updateState({ request });
        
        const response = await API.makeRequest(request);
        try {
            const flowID = response.json.id;
            const csrf = response.json.ui.nodes
            .filter(x => x.attributes.name == "csrf_token")
            .map(x => x.attributes.value)[0];
            
            updateState({ request, response, flowID, csrf });
        } catch (e) {
            updateState({ request, response: { error: malformedResponse(e), response } });
        }
    }
    
    const submitRegistration = async () => {
        resetPrint();
        
        const request = requestProvider.submitRegistration(state.flowID, state.csrf);
        updateState({ request });
        
        const response = await API.makeRequest(stringifyBody(request));
        try {
            updateState({
                request,
                response,
                accountKey: response.json.identity.traits.accountKey,
                sessionID: response.json.session.id,
            });
        } catch (e) {
            updateState({ request, response: { error: malformedResponse(e), response } });
        }
        
        sessionChangeCallback();
    }
    
    const formatFlowData = [
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
    ];
    
    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Registration submit={Boolean(state.flowID) && Boolean(state.csrf)} initHandler={initRegistration} submitHandler={submitRegistration} />
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