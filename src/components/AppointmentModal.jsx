// src/components/AppointmentModal.jsx
import React, { useState, useEffect } from 'react'; // Importa useEffect
import { format, parseISO, isBefore } from 'date-fns';
import { es } from 'date-fns/locale'; // Importa el locale español para format
import BackgroundHome from '../assets/images/FONDO.png'; // Importa la imagen de fondo

function AppointmentModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Estado para controlar la animación
  const [animateIn, setAnimateIn] = useState(false);

  // useEffect para activar la animación cuando el modal se abre
  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
    } else {
      // Opcional: reiniciar el estado de animación cuando se cierra para futuras aperturas
      setAnimateIn(false);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handleSubmit = (e) => {
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

    // Construir el mensaje para WhatsApp con la fecha y hora preferida
    const whatsappMessage = encodeURIComponent(
      `Hola, me gustaría agendar una cita.\n` +
      `Nombre: ${name}\n` +
      `Email: ${email}\n` +
      `Teléfono: ${phone}\n` +
      `Fecha y Hora Preferida: ${format(appointmentDate, "dd/MM/yyyy HH:mm", { locale: es })} (hora en punto preferible)\n` +
      (message ? `Mensaje Adicional: ${message}` : '\n') +
      `\nPor favor, confírmame la disponibilidad para esta fecha/hora o proponme una alternativa.`
    );

    const phoneNumber = '5219818194455'; // Número de tu mamá con código de país (ej. 52 para México)

    // Abrir WhatsApp con el mensaje pre-rellenado
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');

    setFormSuccess('Su solicitud de cita ha sido enviada a WhatsApp. Por favor, espere la confirmación de la psicóloga.');
    // Opcional: Resetear el formulario o cerrar modal después de un breve éxito
    // setName('');
    // setEmail('');
    // setPhone('');
    // setSelectedDateTime('');
    // setMessage('');
    // onClose(); // Podrías cerrar el modal después de unos segundos
  };

  // Función auxiliar para parsear la fecha y hora de manera segura
  const parseDateTime = (dateTimeString) => {
    try {
      const date = parseISO(dateTimeString);
      if (isNaN(date.getTime())) { // Comprobar si la fecha es inválida
        throw new Error('Fecha y hora seleccionada no válida.');
      }
      return date;
    } catch (error) {
      setFormError('Formato de fecha y hora no válido. Por favor, selecciona una fecha y hora.');
      return new Date(0); // Epoch date, muy en el pasado
    }
  };

  // Función para obtener la fecha y hora mínima válida para el input datetime-local
  const getMinDateTime = () => {
    const now = new Date();
    const nextValidTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 5);
    return format(nextValidTime, "yyyy-MM-dd'T'HH:mm");
  };

  return (
    // Contenedor principal del modal con el fondo
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      style={{
        backgroundImage: `url(${BackgroundHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Capa de superposición para que el contenido sea legible */}
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

      {/* Contenido del modal con la animación */}
      <div
        className={`bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full relative z-10 transform transition-all duration-300 ${
          animateIn ? 'scale-100 opacity-100 animate-fade-in-up-custom' : 'scale-95 opacity-0'
        }`}
        style={{ animationDelay: '0.1s' }} // Pequeño retraso para la animación del modal
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
            {/* Aviso de horarios */}
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
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg w-full transition duration-300 hover:scale-105"
          >
            Enviar Solicitud por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;