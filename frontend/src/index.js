import React from "react";
import ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";
import App from "./components/App";

const mountNode = document.getElementById("root");
const root = ReactDOMClient.createRoot(mountNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
