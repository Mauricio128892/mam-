import React, { useState, useEffect } from 'react';

// ¡IMPORTANTE! Cambia esta contraseña por una que solo tú conozcas
const ACCESS_PASSWORD = '161448'; 

const API_URL = 'https://mam-33cu.onrender.com/api/appointments';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function fetchAppointments() {
      if (!isAuthorized) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de citas');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAppointments();
  }, [isAuthorized]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      setIsAuthorized(true);
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <form onSubmit={handlePasswordSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Acceso Restringido</h2>
          <p className="mb-4 text-gray-300 text-center">Introduce la contraseña para ver las citas.</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white border-gray-600"
            required
          />
          <button 
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Acceder
          </button>
          {error && <p className="mt-4 text-red-400 text-sm italic text-center">{error}</p>}
        </form>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-8 text-white">Cargando citas...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Citas Agendadas</h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-400">Aún no hay citas agendadas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-gray-800 p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <h2 className="text-xl font-semibold mb-2">{appointment.name}</h2>
              <p className="text-gray-300">
                <span className="font-medium">Correo:</span> {appointment.email}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Teléfono:</span> {appointment.phone}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Fecha:</span> {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Hora:</span> {appointment.time}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;