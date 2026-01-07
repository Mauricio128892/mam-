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

      {/* --- INICIO DEL NUEVO FOOTER --- */}
      <div className="w-full mt-auto py-6 px-4 md:px-12 border-t border-gray-100/30 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* 1. Derechos de Autor (Izquierda en PC / Abajo en Celular) */}
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left order-3 md:order-1">
            © 2026 Psicóloga Online. Todos los derechos reservados.
          </p>

          {/* 2. Información de Contacto (Derecha en PC / Arriba en Celular) */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-1 md:order-2">
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/529818194455" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 group transition-opacity hover:opacity-80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#25D366" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              <span className="text-gray-600 text-xs md:text-sm font-medium hover:text-green-600">
                +52 981 819 4455
              </span>
            </a>

            {/* Email */}
            <a 
              href="mailto:margaritapsicologa21@gmail.com"
              className="flex items-center gap-2 group transition-opacity hover:opacity-80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span className="text-gray-600 text-xs md:text-sm font-medium hover:text-blue-600">
                margaritapsicologa21@gmail.com
              </span>
            </a>

          </div>
        </div>
      </div>
      {/* --- FIN DEL FOOTER --- */}
    </div>
  );
}

export default HomePage;