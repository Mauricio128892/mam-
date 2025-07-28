// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Asegúrate de que esta ruta sea correcta
import './index.css'; // O la ruta a tu archivo CSS principal

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Aquí NO debe haber un <BrowserRouter> o <Router> envolviendo a <App /> */}
  </React.StrictMode>,
);