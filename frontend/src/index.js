import ReactDOMClient from "react-dom/client";

import init from "./init";

const initApp = async () => {
  const mountNode = document.getElementById("root");
  const root = ReactDOMClient.createRoot(mountNode);
  root.render(await init()); 
};

initApp();
