import PiwikPro from "@piwikpro/react-piwik-pro";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./scss/main.scss";
import App from "./App";
import { store } from "./app/store";

PiwikPro.initialize("b4250e10-2834-405d-aea0-b031169a13a4", "https://pdelekta-ecommerce.piwik.pro");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>
);
