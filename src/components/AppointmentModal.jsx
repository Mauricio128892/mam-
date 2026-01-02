// src/components/AppointmentModal.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import BackgroundHome from '../assets/images/FONDO.png';
import {
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
import metadata from 'libphonenumber-js/metadata.min.json';

const API_URL = 'https://mam-33cu.onrender.com/api/appointments';

function AppointmentModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('MX');
  const [number, setNumber] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

 const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    // Agregamos un estado de "Cargando" (asegúrate de crear este estado si quieres: const [isLoading, setIsLoading] = useState(false);)
    // O simplemente usamos el botón para feedback visual
    console.log("1. Iniciando envío del formulario...");

    const fullPhoneNumber = `+${getCountryCallingCode(country, metadata)}${number}`;

    // Validaciones
    if (!name || !email || !country || !number || !selectedDateTime) {
      setFormError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!isPossiblePhoneNumber(fullPhoneNumber, { metadata })) {
      setFormError('El número de teléfono no es válido.');
      return;
    }

    const appointmentDate = parseDateTime(selectedDateTime);
    const now = new Date();
    if (isBefore(appointmentDate, now)) {
      setFormError('No puedes agendar citas en el pasado.');
      return;
    }

    // PREPARAR DATOS (Aquí está el cambio importante de la fecha)
    const payload = {
        name: name,
        email: email,
        phone: fullPhoneNumber,
        // Forzamos formato simple YYYY-MM-DD para evitar errores de ISO
        date: format(appointmentDate, 'yyyy-MM-dd'), 
        time: format(appointmentDate, 'HH:mm'),
    };

    console.log("2. Datos a enviar (Payload):", payload);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("3. Respuesta del servidor recibida. Status:", response.status);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al agendar la cita.');
      }

      setFormSuccess('¡Solicitud enviada con éxito! Revisa tu correo o espera contacto.');
      
      // Limpiar formulario
      setName('');
      setEmail('');
      setNumber('');
      setSelectedDateTime('');
      
    } catch (error) {
      console.error('Error REAL:', error);
      setFormError(`Error: ${error.message}`);
    }
};

  const parseDateTime = (dateTimeString) => {
    try {
      const date = parseISO(dateTimeString);
      if (isNaN(date.getTime())) {
        throw new Error('Fecha y hora seleccionada no válida.');
      }
      return date;
    } catch (error) {
      setFormError('Formato de fecha y hora no válido. Por favor, selecciona una fecha y hora.');
      return new Date(0);
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
        style={{ animationDelay: '0.1s' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Agendar Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
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
                placeholder="Ingresa tu número de teléfono"
                className="ml-2 flex-1 outline-none border-none"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="datetime" className="block text-gray-700 text-sm font-bold mb-2">
              Fecha y Hora Preferida:
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Horario de atención:
              <br/>
              Lunes a Sábado: 5:00 PM a 10:00 PM
              <br/>
              Domingos: 10:00 AM a 2:00 PM
              <br/>
              (Por favor, selecciona horas en punto.)
            </p>
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

          {formError && <p className="text-red-500 text-sm italic">{formError}</p>}
          {formSuccess && <p className="text-green-600 text-sm italic">{formSuccess}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg w-full transition duration-300 hover:scale-105"
          >
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;