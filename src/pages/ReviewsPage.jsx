// src/pages/ReviewsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundHome from '../assets/images/FONDO.png';
import LogoImage from '../assets/images/LOGO.png';
// Asegúrate de que date-fns esté instalado: npm install date-fns
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para el formato de fecha en español

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Asegúrate de que esta URL coincida con tu backend desplegado o localhost
  // Si estás en desarrollo local, déjalo como 'http://localhost:5000/api/reviews'
  // Si vas a desplegar, cámbialo a la URL de tu backend en Render/Railway/etc.
  const API_URL = 'https://mam-33cu.onrender.com/api/reviews';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('No se pudieron cargar las reseñas. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newReviewText.trim() === '') {
      alert('La reseña no puede estar vacía.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newReviewText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newReview = await response.json();
      setReviews((prevReviews) => [newReview, ...prevReviews]); // Añade la nueva reseña al principio
      setNewReviewText(''); // Limpia el campo de texto
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('No se pudo enviar la reseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-4 text-gray-800"
      style={{ backgroundImage: `url(${BackgroundHome})` }}
    >
      <div className="absolute inset-0 bg-white opacity-90 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen items-center justify-start py-8 w-full max-w-4xl px-4">
        <Link
          to="/servicios"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none z-20"
          aria-label="Volver a la página de Información"
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

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.2s' }}>
          Reseñas y Testimonios
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-900 w-full mb-8 animate-fade-in-up-custom" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deja tu Reseña Anónima</h2>
          <form onSubmit={handleSubmitReview}>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900"
              rows="4"
              placeholder="Escribe tu experiencia aquí..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              Enviar Reseña
            </button>
          </form>
        </div>

        <div className="w-full space-y-6 animate-fade-in-up-custom" style={{ animationDelay: '0.6s' }}>
          {loading ? (
            <p className="text-center text-xl text-gray-700">Cargando reseñas...</p>
          ) : error ? (
            <p className="text-center text-xl text-red-500">{error}</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-xl text-gray-700">Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <p className="text-gray-700 text-lg mb-2 italic">"{review.text}"</p>
                <p className="text-gray-600 text-sm text-right">
                  - Paciente Anónimo ({format(new Date(review.createdAt), 'dd/MM/yyyy', { locale: es })})
                </p>
              </div>
            ))
          )}
        </div>

        <footer className="w-full text-center py-6 text-gray-600 text-sm mt-auto animate-fade-in-up-custom" style={{ animationDelay: '0.8s' }}>
          <p>&copy; {new Date().getFullYear()} Psicóloga Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default ReviewsPage;