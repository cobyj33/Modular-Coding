import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const hash = function(obj) {
  let hash = 0;
    if (obj instanceof Object) {
      const elements = [...Object.keys(obj), ...Object.values(obj)];

      if (elements.length == 0) return hash;
      for (let i = 0 ;i<elements.length ; i++) {
        const characters = [...String(elements[i])];
        if (characters.length == 0) { continue; }
        const ch = characters.reduce((acc, val) => acc += val.charCodeAt(0), 0)
        console.log(ch);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
      }
    } else {
      const string = String(obj)
      if (string.length == 0) return hash;
      for (let i = 0 ;i<string.length ; i++) {
        const ch = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
      }
    }

    return hash;
}

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

window.clickInsideElement = function(event, className) {
  var el = event.srcElement || event.target;
  
  if ( el.classList.contains(className) ) {
      return el;
  } else {
      while ( el = el.parentNode ) {
          if ( el.classList && el.classList.contains(className) ) {
              return el;
          }
      }
  }
  
  return false;
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