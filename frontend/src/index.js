import React from "react";
import ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store";
import App from "./components/App";

const mountNode = document.getElementById("root");
const root = ReactDOMClient.createRoot(mountNode);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
