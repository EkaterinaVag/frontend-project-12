import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
root.render(<App />);
