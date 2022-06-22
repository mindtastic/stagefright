import API, { getFormattedProxyURL, getFormattedURL } from "../API";

class RegistrationProvider {
    constructor(cluster, flowType) {
        this.cluster = cluster;
        this.flowType = flowType;
    }

    initRequest = {
        url: getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.regInit),
        proxyUrl: getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.regInit),
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }

    submitRequest = {
        url: API.baseUrl + API.endpoints.regSubmit,
        proxyUrl: API.proxyUrl + API.endpoints.regSubmit,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: {
            method: "password"
        }
    }

    getInitRequest() {
        this.initRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.regInit);
        this.initRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.regInit);

        return this.initRequest;
    }

    getSubmitRequest(flowID, csrf) {
        if (this.flowType == "browser") {
            this.submitRequest.body.csrf_token = csrf;
        }

        this.submitRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOWID%": flowID }, API.endpoints.regSubmit);
        this.submitRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOWID%": flowID }, API.endpoints.regSubmit);

        return this.submitRequest;
    }

    stringifyBody(request) {
        return { ...request, body: JSON.stringify(request.body) }
    }
}

export default RegistrationProvider;