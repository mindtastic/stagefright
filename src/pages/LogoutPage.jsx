import React from "react";
import { malformedResponse } from "../util/errors";
import Logout from "../views/Logout";
import { withApiPage } from "./ApiPage";

const logoutPage = ({ initHandler, submitHandler, logoutToken }) =>
    <Logout initHandler={initHandler} submitHandler={submitHandler} submit={Boolean(logoutToken)} />;

export default ({requestProvider, sessionChangeCallback}) => {
    const apiPageConfig = {
        flowDataKeys: ['logoutToken'],
        initializer: {
            fn: requestProvider.initLogout,
            reducer: ({ request, response }) => {
                try { 
                    const logoutToken = response.json.logout_token;
                    return { request, response, logoutToken };
                } catch (e) {
                    return { request, response: { error: malformedResponse(e), response }};
                }
            },
        },
        submitter: {
            fn: requestProvider.submitLogout,
            args: ['logoutToken'],
        },
        subscribes: ['logoutToken'],
        submitCallback: sessionChangeCallback,
    };

    return withApiPage(apiPageConfig)(logoutPage)();
};