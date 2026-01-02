// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundHome from '../assets/images/FONDO.png';
import LogoImage from '../assets/images/LOGO.png';

function HomePage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 text-gray-800"
      style={{ backgroundImage: `url(${BackgroundHome})` }}
    >
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div> {/* Capa semitransparente */}

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <img
          src={LogoImage}
          alt="Logo de Psicología"
          className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto mb-8 animate-float"
        />

        {/* Título y subtítulo */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fade-in-up-custom">
          Psicóloga Margarita Velueta
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in-up-custom" style={{ animationDelay: '0.2s' }}>
          Tu bienestar emocional es mi prioridad.
        </p>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up-custom" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/servicios"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            Explora y Conéctate
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-gray-600 text-sm animate-fade-in-up-custom" style={{ animationDelay: '0.6s' }}>
        <p>&copy; {new Date().getFullYear()} Psicóloga Online. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;