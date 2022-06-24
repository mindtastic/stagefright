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
import requestProvider from './util/requestProvider';


export default function () {
    const [cluster, setCluster] = useState("live");
    const [flow, setFlow] = useState("browser");
    const [sessionActive, setSessionActive] = useState(false);

    const clusterChange = (event) => setCluster(event.target.value);
    const flowChange = (event) => setFlow(event.target.value);

    const requests = requestProvider(cluster, flow);

    const checkSession = async () => {
        const jsonRes = await API.makeRequest(requests.session());
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
                />
                <Routes>
                    <Route exact path="/" element={<Hub activeSession={sessionActive} />} />
                    <Route exact path="/registration" element={<RegPage requestProvider={requests} sessionChangeCallback={checkSession} />} />
                    <Route exact path="/login" element={<LoginPage flow={flow} cluster={cluster} checkForActiveSessionCallback={checkSession} />} />
                    <Route exact path="/logout" element={<LogoutPage flow={flow} cluster={cluster} checkForActiveSessionCallback={checkSession} />} />
                </Routes>
            </div>
        </Router>
    );
};
