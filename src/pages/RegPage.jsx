import React from "react";
import Registration from "../views/Registration";
import { withApiPage } from "./ApiPage";

const registrationPage = (props) => (
    <Registration 
        submit={Boolean(props.flowID) && Boolean(props.csrf)}
        initHandler={props.initHandler}
        submitHandler={props.submitHandler}
    />
);

export default ({requestProvider, sessionChangeCallback}) => {
    const apiPageConfig = {
        flowDataKeys: ['flowID', 'csrf', 'accountKey', 'sessionID'],
        initializer: { fn: requestProvider.initRegistration },
        submitter: {
            fn: requestProvider.submitRegistration,
            args: ['flowID', 'csrf'],
        },
        subscribes: ['flowID', 'csrf'],
        submitCallback: sessionChangeCallback,
    };

   return withApiPage(apiPageConfig)(registrationPage)();
};
