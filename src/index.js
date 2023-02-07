import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Removing console.log and console.warn statements on production build
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.warn = () => {};
}

console.warn = () => {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


