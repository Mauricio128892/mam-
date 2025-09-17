// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa todos tus componentes y páginas
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import ServiciosPage from './pages/ServiciosPage';
import ReviewsPage from './pages/ReviewsPage';
import TiposDeTerapiasPage from './pages/TiposDeTerapiasPage';
import AppointmentsPage from './pages/AppointmentsPage'; // Importa la nueva página

function App() {
  return (
    <Router>
      <Routes>
        {/* Tus rutas actuales */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/tipos-de-terapias" element={<TiposDeTerapiasPage />} />
        
        {/* Agrega esta nueva ruta para la página de citas */}
        <Route path="/appointments" element={<AppointmentsPage />} />
        
        {/* Puedes agregar una ruta para el 404 */}
        <Route path="*" element={<h1>404: Page not found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;