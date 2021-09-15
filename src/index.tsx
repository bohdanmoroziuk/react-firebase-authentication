import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'App';
import reportWebVitals from 'reportWebVitals';

import 'index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FirebaseProvider } from 'contexts/firebase';

import config from 'config';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseProvider config={config.firebase}>
        <App />
      </FirebaseProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
