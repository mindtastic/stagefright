import React, { useState } from "react";
import API from "./API";
import Echo from "./Echo";
import Login from "./Login";
import Registration from "./Registration";
import Hub from "./pages/Hub";
import RegPage from "./pages/RegPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsHeader from "./views/SettingsHeader";

export default function () {
    const [cluster, setCluster] = useState("live");
    const [flow, setFlow] = useState("browser");

    const clusterChange = (event) => {
        setCluster(event.target.value);
    }

    const flowChange = (event) => {
        setFlow(event.target.value);
    }

    return (
        <Router>
            <div>
                <SettingsHeader flowState={flow} flowHandler={flowChange} clusterState={cluster} clusterHandler={clusterChange}></SettingsHeader>
                <Routes>
                    <Route exact path="/" element={<Hub />}></Route>
                    <Route exact path="/registration" element={<RegPage flow={flow} cluster={cluster} />}></Route>
                </Routes>
            </div>
        </Router>
    );
};
