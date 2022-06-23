const baseUrl = "https://auth.api.%CLUSTER%.mindtastic.lol";
const proxyUrl = "/%CLUSTER%";
const endpoints = {
    regInit: "/self-service/registration/%FLOW%",
    regSubmit: "/self-service/registration?flow=%FLOWID%",
    loginInit: "/self-service/login/%FLOW%",
    loginSubmit: "/self-service/login?flow=%FLOWID%",
    logoutInit: "/self-service/logout/%FLOW%",
    logoutSubmit: "/self-service/logout?token=%LOGOUTTOKEN%",
    whoami: "/sessions/whoami"
}

export default {

    endpoints: endpoints,
    baseUrl: baseUrl,

    makeRequest: async (request) => {
        var response = await fetch(request.proxyUrl, request);

        response = await response.json()
            .then(json => ({
                headers: response.headers,
                status: response.status,
                json
            }))
            .catch((err) => console.log(err));

        return response;
    },

    makeRequestNoJSON: async (request) => {
        var response = await fetch(request.proxyUrl, request);

        return {
            status: response.status,
            statusText: response.statusText
        };
    },

    initLogin: async () => {
        const response = await _fetch("/self-service/login/api");
        const r = await response.json();
        return r.ui.action;
    },

    submitLogin: async (actionUrl) => {
        debugger;
        const response = await fetch(actionUrl, {
            method: 'POST',
            appendBaseUrl: false
        });
        const r = await response.json()
        return r;
    },

    queryEcho: async (sessionToken) => {
        const response = await _fetch("https://echo.api.dev.mindtastic.lol/", {
            appendBaseUrl: false,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
            body: `Hello`,
        })

        return response.text();
    }

};

async function _fetch(path, options = {}) {
    const appendUrl = options.appendBaseUrl ?? true;
    if (appendUrl) {
        path = baseUrl + path;
    }

    const response = await fetch(path, {
        method: 'GET',
        ...options
    })

    if (!response.ok) {
        const error = (data && data.message) || response.status;
        throw new Error(error);
    }

    return response;
};

function formatURL(url, replacements) {
    let str = url.replace(/%\w+%/g, function (all) {
        return replacements[all] || all;
    });

    return str;
}

function getFormattedURL(replacements, endpoint) {
    switch (endpoint) {
        case endpoints.regInit:
            return formatURL(baseUrl + endpoints.regInit, replacements);
        case endpoints.regSubmit:
            return formatURL(baseUrl + endpoints.regSubmit, replacements);
        case endpoints.loginInit:
            return formatURL(baseUrl + endpoints.loginInit, replacements);
        case endpoints.loginSubmit:
            return formatURL(baseUrl + endpoints.loginSubmit, replacements);
        case endpoints.logoutInit:
            return formatURL(baseUrl + endpoints.logoutInit, replacements);
        case endpoints.logoutSubmit:
            return formatURL(baseUrl + endpoints.logoutSubmit, replacements);
        case endpoints.whoami:
            return formatURL(baseUrl + endpoints.whoami, replacements);
        default:
            return "";
    }
}

function getFormattedProxyURL(replacements, endpoint) {
    switch (endpoint) {
        case endpoints.regInit:
            return formatURL(proxyUrl + endpoints.regInit, replacements);
        case endpoints.regSubmit:
            return formatURL(proxyUrl + endpoints.regSubmit, replacements);
        case endpoints.loginInit:
            return formatURL(proxyUrl + endpoints.loginInit, replacements);
        case endpoints.loginSubmit:
            return formatURL(proxyUrl + endpoints.loginSubmit, replacements);
        case endpoints.logoutInit:
            return formatURL(proxyUrl + endpoints.logoutInit, replacements);
        case endpoints.logoutSubmit:
            return formatURL(proxyUrl + endpoints.logoutSubmit, replacements);
        case endpoints.whoami:
            return formatURL(proxyUrl + endpoints.whoami, replacements);
        default:
            return "";
    }
}

export { getFormattedURL, getFormattedProxyURL };