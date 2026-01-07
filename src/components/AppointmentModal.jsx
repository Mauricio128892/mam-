// src/components/AppointmentModal.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO, isBefore } from 'date-fns';
import BackgroundHome from '../assets/images/FONDO.png';
import {
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
} from 'react-phone-number-input';
import metadata from 'libphonenumber-js/metadata.min.json';

const API_URL = 'https://mam-33cu.onrender.com/api/appointments';

function AppointmentModal({ isOpen, onClose }) {
  // Estados del Formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('MX');
  const [number, setNumber] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [reason, setReason] = useState(''); 
  
  // Estados de Control Visual
  const [formError, setFormError] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  
  // NUEVOS ESTADOS PARA CARGA Y ÉXITO
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      // Resetear estados al abrir
      setIsSuccess(false);
      setIsLoading(false);
      setFormError('');
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const parseDateTime = (dateTimeString) => {
    try {
      const date = parseISO(dateTimeString);
      if (isNaN(date.getTime())) {
        throw new Error('Fecha y hora seleccionada no válida.');
      }
      return date;
    } catch (error) {
      setFormError('Formato de fecha y hora no válido.');
      return new Date(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // 1. Iniciamos la carga
    setIsLoading(true);

    const fullPhoneNumber = `+${getCountryCallingCode(country, metadata)}${number}`;

    // Validaciones
    if (!name || !email || !country || !number || !selectedDateTime) {
      setFormError('Por favor, completa todos los campos obligatorios.');
      setIsLoading(false);
      return;
    }

    if (!isPossiblePhoneNumber(fullPhoneNumber, { metadata })) {
      setFormError('El número de teléfono no es válido.');
      setIsLoading(false);
      return;
    }

    const appointmentDate = parseDateTime(selectedDateTime);
    const now = new Date();
    if (isBefore(appointmentDate, now)) {
      setFormError('No puedes agendar citas en el pasado.');
      setIsLoading(false);
      return;
    }

    const payload = {
        name: name,
        email: email,
        phone: fullPhoneNumber,
        date: format(appointmentDate, 'yyyy-MM-dd'), 
        time: format(appointmentDate, 'HH:mm'),
        reason: reason
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al agendar la cita.');
      }

      // 2. Si todo sale bien, activamos el estado de Éxito
      setIsSuccess(true);
      
      // Limpiar formulario
      setName('');
      setEmail('');
      setNumber('');
      setSelectedDateTime('');
      setReason('');
      
    } catch (error) {
      console.error('Error REAL:', error);
      setFormError(`Error: ${error.message}`);
    } finally {
      // 3. Terminamos la carga
      setIsLoading(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    const nextValidTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 5);
    return format(nextValidTime, "yyyy-MM-dd'T'HH:mm");
  };

  const countries = getCountries(metadata).map(countryCode => {
    const callingCode = getCountryCallingCode(countryCode, metadata);
    return {
      code: countryCode,
      name: new Intl.DisplayNames(['es'], { type: 'region' }).of(countryCode),
      callingCode: callingCode ? `+${callingCode}` : ''
    };
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      style={{
        backgroundImage: `url(${BackgroundHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

      <div
        className={`bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full relative z-10 transform transition-all duration-300 ${
          animateIn ? 'scale-100 opacity-100 animate-fade-in-up-custom' : 'scale-95 opacity-0'
        }`}
        style={{ animationDelay: '0.1s', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Botón de Cerrar (Visible siempre para poder salir si se traba) */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition-colors focus:outline-none z-20"
          aria-label="Regresar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* --- LÓGICA DE VISTAS (Carga vs Éxito vs Formulario) --- */}

        {isLoading ? (
          // VISTA DE CARGA (Spinner)
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in-up-custom">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Estamos registrando su cita</h3>
            <p className="text-gray-600">Esto podría demorar unos minutos. Agradecemos su paciencia, por favor no cierre la ventana.</p>
          </div>

        ) : isSuccess ? (
          // VISTA DE ÉXITO (Palomita + Tu mensaje)
          <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in-up-custom">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Solicitud enviada con éxito!</h2>
            <p className="text-gray-600 mb-6 px-4">
              La psicóloga se comunicará con usted mediante su correo o teléfono.
            </p>
            <button
              onClick={onClose}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
              Entendido
            </button>
          </div>

        ) : (
          // VISTA DEL FORMULARIO NORMAL
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Agendar Cita</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* CAMPO NOMBRE */}
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre Completo:
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* CAMPO EMAIL */}
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email (con el que se comunicara con usted):
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* CAMPO PAIS */}
              <div>
                <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                  País:
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {countries.map(({ code, name, callingCode }) => (
                    <option key={code} value={code}>
                      {name} ({callingCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* CAMPO TELEFONO */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Teléfono (WhatsApp preferible):
                </label>
                <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <span className="text-gray-500">{getCountryCallingCode(country, metadata) ? `+${getCountryCallingCode(country, metadata)}` : ''}</span>
                  <input
                    type="tel"
                    id="phone"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ingresa tu número"
                    className="ml-2 flex-1 outline-none border-none"
                    required
                  />
                </div>
              </div>

              {/* CAMPO FECHA (CON TUS AVISOS ORIGINALES) */}
              <div>
                <label htmlFor="datetime" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha y Hora Preferida:
                </label>
                
                {/* NOTA: Cambié el <p> exterior por <div> para evitar errores de validación de React, 
                    pero visualmente es IDÉNTICO a tu código. */}
                <div className="text-sm text-gray-600 mb-2">
                  <p className="text-sm text-yellow-800 font-bold">⚠️ Horarios de Atención:</p>
                  <p>Lunes a Sábado: 5:00 PM - 10:00 PM | Domingo: 10:00 AM - 2:00 PM</p>
                  
                  <p className="text-sm text-yellow-800 font-bold mt-2">⚠️ Aviso:</p>
                  <p>(La psicologa le confirmara la disponibilidad de la cita, si no esta disponible se le ofreceran otros horarios)</p>
                </div>

                <input
                  type="datetime-local"
                  id="datetime"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedDateTime}
                  onChange={(e) => setSelectedDateTime(e.target.value)}
                  min={getMinDateTime()}
                  required
                />
              </div>

              {/* CAMPO MOTIVO */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ¿Cuál es el motivo de tu consulta?
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ej: Ansiedad, terapia de pareja, dudas generales..."
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                />
              </div>

              {formError && <p className="text-red-500 text-sm italic">{formError}</p>}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg w-full transition duration-300 hover:scale-105"
              >
                Enviar Solicitud
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentModal;