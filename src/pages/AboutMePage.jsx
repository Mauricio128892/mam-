// src/pages/AboutMePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundHome from '../assets/images/FONDO.png';
import LogoImage from '../assets/images/LOGO.png';

function AboutMePage() {
  const diplomados = [
    'Diplomado en Tanatología',
    'Diplomado en Intervención en Crisis y Atención al Suicidio',
    'Diplomado en Técnicas y estrategias para la enseñanza en la sexualidad',
    'Diplomado en Adicciones',
    'Diplomado en Técnicas no Verbales en Selección de personal',
    'Diplomado en Terapia de pareja',
    'Diplomado en Terapia Cognitivo Conductual',
    'Diplomado en TEA y TDAH',
  ];

  const cursos = [
    'Taller de Grafología',
    'Curso en Lengua de Señas Mexicanas Nivel Avanzado',
    'Curso Tratando la ansiedad',
    'Curso Mindfulness',
    'Curso Inteligencia Emocional en la gestión del Aula',
    'Seminario Herramientas y trabajo con niños',
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-white text-gray-800 p-8 relative"
      style={{
        backgroundImage: `url(${BackgroundHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-start py-8">
        {/* --- INICIO DEL NUEVO BOTÓN DE FLECHA --- */}
        <Link
          to="/servicios"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none z-20"
          aria-label="Volver a la página de Información"
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
        {/* --- FIN DEL NUEVO BOTÓN DE FLECHA --- */}

        <img
          src={LogoImage}
          alt="Logo de Psicología"
          className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-8 animate-float"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.2s' }}>
          Sobre Mí
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-900 w-full max-w-4xl text-gray-800 text-lg leading-relaxed animate-fade-in-up-custom" style={{ animationDelay: '0.4s' }}>
          <p className="mb-4">
            ¡Hola! Soy la Psicóloga Clinica Margarita Velueta Méndez. Mi pasión es acompañarte en tu viaje de autoconocimiento y bienestar emocional.
          </p>
          <p className="mb-4">
            A lo largo de mi carrera, he tenido el privilegio de formarme y especializarme en diversas áreas para ofrecerte un enfoque integral y personalizado, además de ser conferencista en múltiples áreas de la salud mental enfocado al público en general:
          </p>

          <h3 className="text-2xl font-bold mb-3 text-gray-900">Diplomados (Certificaciones):</h3>
          <ul className="list-disc pl-8 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {diplomados.map((item, index) => (
              <li key={index} className="text-gray-700 text-lg">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mb-3 text-gray-900">Cursos y Formación Adicional:</h3>
          <ul className="list-disc pl-8 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {cursos.map((item, index) => (
              <li key={index} className="text-gray-700 text-lg">
                {item}
              </li>
            ))}
          </ul>

          <p>
            Mi objetivo es crear un espacio de confianza y respeto donde te sientas escuchado/a y puedas desarrollar las herramientas necesarias para enfrentar los desafíos de la vida y vivir plenamente.
          </p>
        </div>

        <footer className="w-full text-center py-6 text-gray-600 text-sm mt-auto animate-fade-in-up-custom" style={{ animationDelay: '0.6s' }}>
          <p>&copy; {new Date().getFullYear()} Psicóloga Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default AboutMePage;