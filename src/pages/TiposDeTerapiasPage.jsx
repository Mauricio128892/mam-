// src/pages/TiposDeTerapiasPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundHome from '../assets/images/FONDO.png';
import LogoImage from '../assets/images/LOGO.png';

function TiposDeTerapiasPage() {
  const [openTherapy, setOpenTherapy] = useState(null);

  const toggleTherapy = (id) => {
    setOpenTherapy(openTherapy === id ? null : id);
  };

  const therapies = [
    {
      id: 'individual',
      title: 'Terapia Individual',
      description: 'Un espacio seguro y confidencial para explorar tus pensamientos y emociones. "Disponible de forma presencial y en línea." Abordamos ansiedad, depresión, estrés, autoestima, duelo, y desarrollo personal. Mi enfoque es integrativo, adaptando las técnicas a tus necesidades únicas para fomentar tu crecimiento y bienestar emocional.',
    },
    {
      id: 'pareja',
      title: 'Terapia de Pareja',
      description: 'Mejora la comunicación, resuelve conflictos y fortalece el vínculo en la relación. "Ofrecida presencialmente y en línea." Trabajamos en el reconocimiento de patrones disfuncionales, la gestión de expectativas y el fomento de la empatía para construir una relación más sana y satisfactoria. Ideal para superar crisis, manejar celos o simplemente mejorar la convivencia diaria.',
    },
    {
      id: 'tanatologia',
      title: 'Tanatología',
      description: 'Acompañamiento profesional en procesos de duelo y pérdidas significativas. Te ayudo a transitar el dolor, procesar las emociones y encontrar nuevas formas de adaptación ante la ausencia, comprendiendo las etapas del duelo y brindando herramientas para su afrontamiento saludable.',
    },
    {
      id: 'tdah_autismo',
      title: 'TDAH y Autismo',
      description: 'Ofrezco apoyo y estrategias para personas con Trastorno por Déficit de Atención e Hiperactividad (TDAH) y condiciones del Espectro Autista. Nos enfocamos en el desarrollo de habilidades sociales, emocionales y cognitivas, así como en el manejo de desafíos conductuales y la mejora de la calidad de vida.',
    },
    {
      id: 'adicciones',
      title: 'Terapia en Adicciones',
      description: 'Programa de apoyo y recuperación para superar dependencias. Se trabaja en la identificación de disparadores, desarrollo de estrategias de afrontamiento, prevención de recaídas y reconstrucción de un estilo de vida saludable, brindando un espacio de comprensión y no juicio.',
    },
    {
      id: 'ansiedad',
      title: 'Terapia en Trastorno de Ansiedad',
      description: 'Herramientas y técnicas para gestionar y reducir la ansiedad. Aprenderás a identificar las causas de tu ansiedad, a manejar los ataques de pánico, la preocupación excesiva y los miedos irracionales, recuperando el control sobre tu vida y promoviendo la calma interior.',
    },
    {
      id: 'depresion',
      title: 'Terapia en Depresión',
      description: 'Acompañamiento para manejar los síntomas de la depresión, restaurar la energía y el interés en la vida. Exploramos las causas subyacentes, desarrollamos estrategias de afrontamiento y fomentamos el bienestar emocional, ayudándote a construir una perspectiva más positiva.',
    },
    {
      id: 'sexualidad',
      title: 'Terapia en Sexualidad',
      description: 'Espacio para abordar inquietudes, disfunciones o conflictos relacionados con la sexualidad. Se promueve una sexualidad plena y saludable, trabajando la comunicación, la autoaceptación y la resolución de problemas en un entorno respetuoso y libre de prejuicios.',
    },
    {
      id: 'crisis_suicidio',
      title: 'Terapia en Atención en Crisis y Prevención al Suicidio',
      description: 'Soporte inmediato y estrategias para manejar situaciones de crisis emocionales agudas y pensamientos suicidas. Este servicio es de alta prioridad, ofreciendo un espacio de contención, evaluación de riesgos y desarrollo de planes de seguridad para proteger la vida y promover la estabilidad emocional.',
    },
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
          Tipos de Terapias
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-2xl animate-fade-in-up-custom" style={{ animationDelay: '0.3s' }}>
          Ofrezco acompañamiento psicológico integral para "niños, adolescentes y adultos", adaptando cada terapia a las necesidades individuales para fomentar tu bienestar y crecimiento.
          "Todas las terapias están disponibles de forma presencial y en línea."
        </p>

        <div className="w-full max-w-4xl px-4 space-y-6">
          {therapies.map((therapy, index) => (
            <div
              key={therapy.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 animate-fade-in-up-custom"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleTherapy(therapy.id)}
              >
                <h2 className="text-2xl font-semibold text-gray-800">{therapy.title}</h2>
                <svg
                  className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${
                    openTherapy === therapy.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openTherapy === therapy.id ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-700 text-lg">{therapy.description}</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="w-full text-center py-6 text-gray-600 text-sm mt-auto animate-fade-in-up-custom" style={{ animationDelay: `${0.4 + therapies.length * 0.1 + 0.2}s` }}>
          <p>&copy; {new Date().getFullYear()} Psicóloga Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default TiposDeTerapiasPage;