import API, { getFormattedProxyURL, getFormattedURL } from "../API";

class LogoutProvider {
    constructor(cluster, flowType) {
        this.cluster = cluster;
        this.flowType = flowType;
    }

    initRequest = {
        url: getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.logoutInit),
        proxyUrl: getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.logoutInit),
        method: "",
        headers: {
            Accept: "application/json"
        }
    }

    submitRequest = {
        url: API.baseUrl + API.endpoints.logoutSubmit,
        proxyUrl: API.proxyUrl + API.endpoints.logoutSubmit,
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }

    getInitRequest() {
        this.initRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.logoutInit);
        this.initRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.logoutInit);

        if (this.flowType == "browser") {
            this.initRequest.method = "GET"
        } else {
            this.initRequest.method = "DELETE"
        }

        return this.initRequest;
    }

    getSubmitRequest(logoutToken) {
        this.submitRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%LOGOUTTOKEN%": logoutToken }, API.endpoints.logoutSubmit);
        this.submitRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%LOGOUTTOKEN%": logoutToken }, API.endpoints.logoutSubmit);

        return this.submitRequest;
    }

    stringifyBody(request) {
        return { ...request, body: JSON.stringify(request.body) }
    }
}

export default LogoutProvider;