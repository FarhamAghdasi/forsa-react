import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./assets/css/style.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap'
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'swiper/swiper-bundle.css'
import Splitting from "splitting";


window.addEventListener('load', () => {
  Splitting();


});





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

