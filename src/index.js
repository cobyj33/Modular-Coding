import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.hideElement = function(element) {
  element.style.width = 0;
  element.style.height = 0;
  element.style.padding = 0;
  element.style.overflow = 'hidden';
  element.style.border = 'none';
}

window.showElement = function(element) {
  element.style.display = ''
  element.style.width = '';
  element.style.height = '';
  element.style.padding = '';
  element.style.overflow = '';
  element.style.border = '';
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals