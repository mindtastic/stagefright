import React from "react";
import API from "./API";
import Echo from "./Echo";
import Login from "./Login";
import Registration from "./Registration";
import Hub from "./pages/Hub";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsHeader from "./views/SettingsHeader";

export default function () {
    return (
        <Router>
            <div>
                <SettingsHeader></SettingsHeader>
                <Routes>
                    <Route exact path="/" element={<Hub />}></Route>
                </Routes>
            </div>
        </Router>
    );
};
