import API, { getFormattedProxyURL, getFormattedURL } from "../API";

class LogoutProvider {
    constructor(cluster, flowType) {
        this.cluster = cluster;
        this.flowType = flowType;
    }

    initRequest = {
        url: API.baseUrl + API.endpoints.logoutInit,
        proxyUrl: API.proxyUrl + API.endpoints.logoutInit,
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
        this.initRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, "logoutInit");
        this.initRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, "logoutInit");

        if (this.flowType == "browser") {
            this.initRequest.method = "GET"
        } else {
            this.initRequest.method = "DELETE"
        }

        return this.initRequest;
    }

    getSubmitRequest(logoutToken) {
        this.submitRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%LOGOUTTOKEN%": logoutToken }, "logoutSubmit");
        this.submitRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%LOGOUTTOKEN%": logoutToken }, "logoutSubmit");

        return this.submitRequest;
    }

    stringifyBody(request) {
        return { ...request, body: JSON.stringify(request.body) }
    }
}

export default LogoutProvider;