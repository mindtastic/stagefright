import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FlowData from "../views/FlowData";
import DisplayRequest from "../views/DisplayRequest";

import API from "../API";
import { capitalize, executeIfExists, hasKey, isFunction, splitOnCapitals } from "../util/helpers";
import { malformedResponse } from "../util/errors";
import stringifyBody from "../util/stringifyBody";

const baseInitialState = {
    flowID: "",
    csrf: "",
    accountKey: "",
    sessionID: "",
    request: {},
    response: {},
};

export const withApiPage = ({ flowDataKeys, initializer, submitter, submitCallback, subscribes = [] }) => (Component) => (props) => {
    const initialState = subscribes.reduce((initialState, prop) => ({ [prop]: '', ...initialState }), baseInitialState);

    const [state, setState] = useState(initialState);
    const updateState = (changes) => setState({ ...state, ...changes });
    
    const reset = () => updateState(initialState);
    const resetPrint = () => updateState({ request: {}, response: {} });
    
    const requestPerformer = (provider, reducer) => async () => {
        // Check if provider.args is an array and if so, apply fn arguments from state.
        const request = (Array.isArray(provider.args) && provider.args.length) ?
            provider.fn.apply(null, provider.args.map((arg) => state[arg] || null)) :
            provider.fn();
    
        updateState({ request });

        const response = await API.makeRequest(stringifyBody(request));
        updateState(reducer({ request, response }));
    };

    const performInitRequest = requestPerformer(
        initializer,
        isFunction(initializer.reducer) ? initializer.reducer : defaultInitReducer
    );

    const performSubmitRequest = requestPerformer(
        submitter,
        isFunction(submitter.reducer) ? submitter.reducer : defaultSubmitReducer
    );

    const initRequest = async () => {
        reset();
        performInitRequest();
    };
    
    const submitRequest = async () => {
        resetPrint();
        await performSubmitRequest();
        executeIfExists(submitCallback);
    };
    
    const flowData = Object.entries({...props, ...state})
        .filter(([key, _]) => flowDataKeys.includes(key))
        .map(([key, value]) => ({
            name: splitOnCapitals(key).map(capitalize).join(' '),
            value,
        }));

    const subscribedState = subscribes.reduce(
        (acc, stateVar) => ({ 
            ...acc,
            [`${stateVar}`]: hasKey(state, stateVar) ? state[stateVar] : null,
            [`set${capitalize(stateVar)}`]: (newVal) => updateState({ [`${stateVar}`]: newVal }),
        }), {});

    return (
        <Container>
            <Row>
                <Col md={{ span: 4 }}>
                    <Component 
                        {...props}
                        initHandler={initRequest} 
                        submitHandler={submitRequest} 
                        {...subscribedState}    
                    />
                    <FlowData data={flowData} />
                </Col>
                <Col md={{ span: 8 }}>
                    <DisplayRequest title="Request" text={state.request} />
                    <DisplayRequest title="Reponse" text={state.response} />
                </Col>
            </Row>
        </Container>
    );
};

export const defaultInitReducer = ({ request, response }) => {
    try {
        const flowID = response.json.id;
        const csrf = response.json.ui.nodes
            .filter(x => x.attributes.name == "csrf_token")
            .map(x => x.attributes.value)[0];
        
        return { request, response, flowID, csrf };
    } catch (e) {
        return { request, response: { error: malformedResponse(e), response }};
    }
};

export const defaultSubmitReducer = ({ request, response }) => {
    try {
        return { request, response, sessionID: response.json.session.id };
    } catch (e) {
        return { request, response: { error: malformedResponse(e), response }};
    }
};