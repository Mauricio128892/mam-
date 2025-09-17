// src/components/AppointmentModal.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO, isBefore } from 'date-fns';
import { es } from 'date-fns/locale'; 
import BackgroundHome from '../assets/images/FONDO.png';

// Importa el nuevo URL de la API de citas
const API_URL = 'https://mam-33cu.onrender.com/api/appointments'; 

function AppointmentModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [message, setMessage] = useState('');
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

    // Validaciones básicas: Campos obligatorios
    if (!name || !email || !phone || !selectedDateTime) {
      setFormError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const appointmentDate = parseDateTime(selectedDateTime);

    // Validar que la fecha/hora no sea en el pasado
    const now = new Date();
    if (isBefore(appointmentDate, now)) {
      setFormError('No puedes agendar citas en el pasado.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviar todos los datos necesarios para el backend
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone, 
          date: appointmentDate,
          time: format(appointmentDate, 'HH:mm'),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al agendar la cita.');
      }

      setFormSuccess('¡Cita agendada con éxito! La psicóloga revisará tu solicitud.');
      // Opcional: limpiar el formulario después del éxito
      setName('');
      setEmail('');
      setPhone('');
      setSelectedDateTime('');
      setMessage('');
    } catch (error) {
      console.error('Error al enviar la cita:', error);
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
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono (WhatsApp preferible):
            </label>
            <input
              type="tel"
              id="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
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
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Mensaje Adicional (Opcional):
            </label>
            <textarea
              id="message"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
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