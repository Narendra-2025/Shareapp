
import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google'; // ✅
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="578630037505-4oe008mutoqhrph1tndadqlgei507f6g.apps.googleusercontent.com"> {/* ✅ */}
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
