import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalStyles from "components/GlobalStyles";
ReactDOM.render(
  <BrowserRouter>
    <App />
    <GlobalStyles />
  </BrowserRouter>,
  document.getElementById('root'),
);
