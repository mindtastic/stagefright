const baseUrl = "https://auth.api.dev.mindtastic.lol";

export default {

    baseUrl: baseUrl,

    initRegistration: async () => {
        const response = await _fetch('/self-service/registration/browser');
        const r = await response.json();
        return r.ui.action;
    },

    submitRegistration: async (actionUrl) => {
        const response = await fetch(actionUrl, { method: 'POST', appendBaseUrl: false });
        const r = await response.json();
        return r
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