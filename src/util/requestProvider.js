import { getFormattedProxyURL, getFormattedURL } from "../API";
import md5 from "md5";

const initReq = {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
}

const submitReq = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json', 
    }
}

const requestProvider = (cluster, flowType) => {
    const urls = (endpoint, pattern) => ({
        url: getFormattedURL(pattern, endpoint), 
        proxyUrl: getFormattedProxyURL(pattern, endpoint)
    });

    const initPattern = { '%CLUSTER%': cluster, '%FLOW%': flowType };
    const initURLs = (endpoint) => urls(endpoint, initPattern);

    const submitPattern = (flowID) => ({ '%CLUSTER%': cluster, '%FLOWID%': flowID });
    const submitURLs = (endpoint, flowID) => urls(endpoint, submitPattern(flowID));

    const logoutPattern = (token) => ({ '%CLUSTER%': cluster, '%LOGOUTTOKEN%': token });

    const init = (endpoint) => ({...initReq, ...initURLs(endpoint)});
    const submit = (endpoint, flowID) => ({...submitReq, ...submitURLs(endpoint, flowID)});

    return {
        initRegistration: () => init('regInit'),
        initLogin: () => init('loginInit'),
        initLogout: () => ({...init('logoutInit'), method: (flowType == 'browser') ? 'GET' : 'DELETE' }),
        
        submitRegistration: (flowID, csrf = '') => ({ 
            ...submit("regSubmit", flowID),
             body: { method: 'password', csrf_token: csrf },
        }),
        submitLogin: (flowID, accountKey, csrf = '') => ({
            ...submit("loginSubmit", flowID),
            body: { method: 'password', identifier: accountKey, password: md5(accountKey), csrf_token: csrf },
        }),
        submitLogout: (logoutToken) => ({
            ...submitReq,
            ...urls('logoutSubmit', logoutPattern(logoutToken)),
            method: 'GET',
        }),

        session: () => initURLs('whoami'),
    };
};

export default requestProvider;
