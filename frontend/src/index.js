import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalStyles from "components/GlobalStyles";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

require('moment-timezone');
ReactDOM.render(
  <BrowserRouter>
    <App />
    <GlobalStyles />
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById('root'),
);
