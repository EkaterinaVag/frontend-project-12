import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import { store } from './store';
import App from './components/App';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
