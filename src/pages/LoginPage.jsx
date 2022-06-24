import React from "react";
import Login from "../views/Login";
import { withApiPage } from "./ApiPage";

const loginPage = (props) => (
    <Login
        initHandler={props.initHandler}
        submitHandler={props.submitHandler}
        accountKey={props.accountKey}
        accountKeyHandler={(ev) => props.setAccountKey(ev.target.value)}
        form={Boolean(props.flowID) && Boolean(props.csrf)}
        submit={Boolean(props.flowID) && Boolean(props.csrf) && Boolean(props.accountKey)}
    />
);

export default ({requestProvider, sessionChangeCallback}) => {
    const apiPageConfig = {
        flowDataKeys: ['flowID', 'csrf', 'sessionID'],
        initializer: { fn: requestProvider.initLogin },
        submitter: {
            fn: requestProvider.submitLogin,
            args: ['flowID', 'accountKey', 'csrf'],
        },
        subscribes: ['flowID', 'csrf', 'accountKey'],
        submitCallback: sessionChangeCallback,
    }

    return withApiPage(apiPageConfig)(loginPage)();
};