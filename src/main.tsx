import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import { fetchCsrfToken, clearCsrfToken } from "./services/csrf";

// Always clear stale token and fetch fresh on every app load
// This ensures the cookie and cached token are always in sync
clearCsrfToken();
fetchCsrfToken().catch((err) =>
  console.warn("CSRF pre-fetch failed:", err)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);