// src/pages/ServiciosPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundHome from '../assets/images/FONDO.png';
import LogoImage from '../assets/images/LOGO.png';

import AppointmentModal from '../components/AppointmentModal';

function ServiciosPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const openAppointmentModal = () => setIsAppointmentModalOpen(true);
  const closeAppointmentModal = () => setIsAppointmentModalOpen(false);

  const handleDirectWhatsAppClick = () => {
    const phoneNumber = '5219818194455';
    const message = encodeURIComponent('Hola, me gustaría agendar una cita o saber más sobre tus servicios.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    // CONTENEDOR PRINCIPAL
    // Quitamos p-8 aquí para que el footer pueda ser ancho completo
    <div
      className="min-h-screen flex flex-col bg-white text-gray-800 relative animate-fade-in-up-custom"
      style={{
        animationDelay: '0.1s',
        backgroundImage: `url(${BackgroundHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Capa blanca semitransparente */}
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

      {/* CONTENIDO PRINCIPAL (Este div crece y empuja el footer) */}
      <div className="relative z-10 flex flex-col flex-grow items-center justify-start py-8 px-4 md:px-8 w-full">
        
        {/* --- BOTÓN DE FLECHA (Regresar) --- */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none z-20"
          aria-label="Volver a la página principal"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5}
            stroke="currentColor" 
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>

        {/* --- LOGO Y TÍTULO --- */}
        <img
          src={LogoImage}
          alt="Logo de Psicología"
          className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-8 animate-float"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.2s' }}>Información</h1>

        {/* --- GRID DE TARJETAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          
          {/* Tarjeta 1: Tipos de Terapias */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 text-center flex flex-col items-center animate-fade-in-up-custom" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tipos de Terapias</h2>
            <p className="text-gray-700 text-lg mb-6 flex-grow">
              Explora todas las modalidades de terapia que ofrezco, cada una diseñada para un camino único hacia tu bienestar.
            </p>
            <Link
              to="/tipos-de-terapias"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300 hover:scale-105 mt-auto"
            >
              Ver más
            </Link>
          </div>

          {/* Tarjeta 2: Sobre Mí */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 text-center flex flex-col items-center animate-fade-in-up-custom" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sobre Mí</h2>
            <p className="text-gray-700 text-lg mb-6 flex-grow">
              Conoce mi formación, experiencia y las capacitaciones que respaldan mi práctica profesional.
            </p>
            <Link
              to="/about-me"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300 hover:scale-105 mt-auto"
            >
              Ver más
            </Link>
          </div>

          {/* Tarjeta 3: Reseñas */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 text-center flex flex-col items-center animate-fade-in-up-custom" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reseñas y Testimonios</h2>
            <p className="text-gray-700 text-lg mb-6 flex-grow">
              Lee las experiencias de otros pacientes y comparte la tuya de forma anónima.
            </p>
            <Link
              to="/reviews"
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition duration-300 hover:scale-105 mt-auto"
            >
              Ver Reseñas
            </Link>
          </div>
        </div>

        {/* --- SECCIÓN LLAMADA A LA ACCIÓN --- */}
        <div className="w-full max-w-2xl mt-12 mb-12 bg-white p-8 rounded-lg shadow-xl border border-gray-900 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para dar el primer paso?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Agenda una cita o contáctame directamente si tienes alguna pregunta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={openAppointmentModal}
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 12h-2V7h-2v5H9v2h2v5h2v-5h2v-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              Agendar Cita
            </button>
            <button
              onClick={handleDirectWhatsAppClick}
              className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.45 0-9.91 4.46-9.91 9.91 0 1.75.52 3.48 1.48 4.96l-1.52 5.57 5.72-1.5zM17.06 14.5c-.3-.15-.9-.44-1.25-.66s-.6-.33-.85-.36-.45-.03-.64.2-.72.88-.88 1.06-.3.2-.55.08-1.76-.66-2.22-1.95-.47-1.74-.33-2.02.32-.47.7-.63.3-.39.45-.63.2-.42.15-.7-.47-1.12-.66-1.53-.2-.35-.45-.3-.35-.03-.75-.03c-.4 0-.7.06-1.07.45s-1.4 1.35-1.4 3.3c0 1.95 1.43 3.8 1.63 4.05s2.8 4.3 6.75 5.25c.9.2 1.6.32 2.16.27.7-.05 2.05-.84 2.35-1.6.3-.75.3-1.4.2-1.6s-.1-.3-.2-.45c-.1-.15-.2-.22-.45-.3z" />
              </svg>
              Enviar Mensaje Directo
            </button>
          </div>
        </div>

      </div>

      {/* MODAL DE CITA */}
      {isAppointmentModalOpen && (
        <AppointmentModal isOpen={isAppointmentModalOpen} onClose={closeAppointmentModal} />
      )}

      {/* --- FOOTER MODIFICADO (Solo Texto Limpio) --- */}
      <div className="relative z-10 w-full mt-auto py-6 px-4 md:px-12 border-t border-gray-100/30 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Derechos de Autor */}
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left order-3 md:order-1">
            © {new Date().getFullYear()} Psicóloga Online. Todos los derechos reservados.
          </p>

          {/* Contacto (Texto Limpio) */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-1 md:order-2">
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/529818194455" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 group hover:text-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#25D366" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              <span className="text-gray-600 text-xs md:text-sm font-medium">
                +52 981 819 4455
              </span>
            </a>

            {/* Email (Solo texto, no clickeable o clickeable pero discreto) */}
            <div className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span className="text-xs md:text-sm font-medium">
                margaritapsicologa21@gmail.com
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiciosPage;