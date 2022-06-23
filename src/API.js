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
};

export default {

    endpoints: endpoints,
    baseUrl: baseUrl,

    makeRequest: async (request) => {
        let json = {};
        let response = {};

        try {
            response = await fetch(request.proxyUrl, request);
            json = await response.json();
        } catch (err) {
            console.log(err);
        }

        console.log(response);
        console.log(json);

        return {
            headers: response.headers,
            status: response.status,
            json,
        };
    },

    makeRequestNoJSON: async (request) => {
        const response = await fetch(request.proxyUrl, request);

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
    return url.replace(/%\w+%/g, (match) => replacements[match] || match);
}

export function getFormattedURL(replacements, endpoint, base = baseUrl) {
    if (!endpoints.hasOwnProperty(endpoint)) {
        return "";
    }
    return formatURL(base + endpoints[endpoint], replacements);
}
export function getFormattedProxyURL(replacements, endpoint) {
    return getFormattedURL(replacements, endpoint, proxyUrl);
}