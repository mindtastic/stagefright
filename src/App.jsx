import React, { useState, useEffect } from "react";
import API from "./API";
import Hub from "./pages/Hub";
import RegPage from "./pages/RegPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import SettingsHeader from "./views/SettingsHeader";
import LoginProvider from "./util/LoginProvider";

export default function () {
    const [cluster, setCluster] = useState("live");
    const [flow, setFlow] = useState("browser");
    const [sessionActive, setSessionActive] = useState(false);

    const clusterChange = (event) => {
        setCluster(event.target.value);
    }

    const flowChange = (event) => {
        setFlow(event.target.value);
    }

    const checkSession = async () => {
        let login = new LoginProvider(cluster, flow);
        var jsonRes = await API.makeRequest(login.getSessionRequest());

        const isSessionActive = !(jsonRes.status == 401);
        setSessionActive(isSessionActive);
    }

    useEffect(checkSession, [cluster, flow]);

    return (
        <Router>
            <div>
                <SettingsHeader
                    flowState={flow}
                    flowHandler={flowChange}
                    clusterState={cluster}
                    clusterHandler={clusterChange}
                    session={sessionActive}
                    checkForActiveSessionCallback={checkSession}></SettingsHeader>
                <Routes>
                    <Route exact path="/" element={<Hub checkForActiveSessionCallback={checkSession} activeSession={sessionActive} />}></Route>
                    <Route exact path="/registration" element={<RegPage flow={flow} cluster={cluster} checkForActiveSessionCallback={checkSession} />}></Route>
                    <Route exact path="/login" element={<LoginPage flow={flow} cluster={cluster} checkForActiveSessionCallback={checkSession} />}></Route>
                    <Route exact path="/logout" element={<LogoutPage flow={flow} cluster={cluster} checkForActiveSessionCallback={checkSession} />}></Route>
                </Routes>
            </div>
        </Router>
    );
};
