import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utils/motion'; // Register GSAP and ScrollTrigger early
import './styles/global.css';
import './styles/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
