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
    <div
      className="min-h-screen flex flex-col bg-white text-gray-800 p-8 relative animate-fade-in-up-custom"
      style={{
        animationDelay: '0.1s',
        backgroundImage: `url(${BackgroundHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-start py-8">
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none z-20"
          aria-label="Volver a la página principal"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <img
          src={LogoImage}
          alt="Logo de Psicología"
          className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-8 animate-float"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.2s' }}>Información</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
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

        <div className="w-full max-w-2xl px-4 mt-12 bg-white p-8 rounded-lg shadow-xl border border-gray-900 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.6s' }}>
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

        {isAppointmentModalOpen && (
          <AppointmentModal isOpen={isAppointmentModalOpen} onClose={closeAppointmentModal} />
        )}

        <footer className="w-full text-center py-6 text-gray-600 text-sm mt-auto animate-fade-in-up-custom" style={{ animationDelay: '0.7s' }}>
          <p>&copy; {new Date().getFullYear()} Psicóloga Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default ServiciosPage;