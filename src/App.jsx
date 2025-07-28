// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServiciosPage from './pages/ServiciosPage';
import TiposDeTerapiasPage from './pages/TiposDeTerapiasPage';
import AboutMePage from './pages/AboutMePage';
import ReviewsPage from './pages/ReviewsPage'; // ¡Asegúrate de que esta importación sea correcta!
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/tipos-de-terapias" element={<TiposDeTerapiasPage />} />
        <Route path="/sobre-mi" element={<AboutMePage />} />
        <Route path="/reviews" element={<ReviewsPage />} /> {/* ¡Verifica esta línea! */}
      </Routes>
    </Router>
  );
}

export default App;