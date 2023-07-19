import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/index.jsx';
import { Provider } from 'react-redux';
import App from './App.jsx';
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
