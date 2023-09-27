import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/noto-sans/100.css"; // Specify weight
import "@fontsource/noto-sans/200.css"; // Specify weight
import "@fontsource/noto-sans/300.css"; // Specify weight
import "@fontsource/noto-sans/400.css"; // Specify weight
import "@fontsource/noto-sans/500.css"; // Specify weight
import "@fontsource/noto-sans/600.css"; // Specify weight
import "./index.css";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
