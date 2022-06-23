import API, { getFormattedProxyURL, getFormattedURL } from "../API";
import md5 from "md5";

class LoginProvider {
    constructor(cluster, flowType) {
        this.cluster = cluster;
        this.flowType = flowType;
    }

    initRequest = {
        url: getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.loginInit),
        proxyUrl: getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.loginInit),
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }

    submitRequest = {
        url: API.baseUrl + API.endpoints.loginSubmit,
        proxyUrl: API.proxyUrl + API.endpoints.loginSubmit,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: {
            method: "password"
        }
    }

    checkSessionRequest = {
        url: getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.whoami),
        proxyUrl: getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.whoami),
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }

    getInitRequest() {
        this.initRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.loginInit);
        this.initRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.loginInit);

        return this.initRequest;
    }

    getSubmitRequest(flowID, accountKey, csrf) {
        if (this.flowType == "browser") {
            this.submitRequest.body.csrf_token = csrf;
        }

        this.submitRequest.body.identifier = accountKey;
        this.submitRequest.body.password = md5(accountKey);

        this.submitRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOWID%": flowID }, API.endpoints.loginSubmit);
        this.submitRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOWID%": flowID }, API.endpoints.loginSubmit);

        return this.submitRequest;
    }

    getSessionRequest() {
        this.checkSessionRequest.url = getFormattedURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.whoami);
        this.checkSessionRequest.proxyUrl = getFormattedProxyURL({ "%CLUSTER%": this.cluster, "%FLOW%": this.flowType }, API.endpoints.whoami);

        return this.checkSessionRequest;
    }

    stringifyBody(request) {
        return { ...request, body: JSON.stringify(request.body) }
    }
}

export default LoginProvider;