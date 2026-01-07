// src/pages/ReviewsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundHome from '../assets/images/FONDO.png';
import LogoImage from '../assets/images/LOGO.png';

import { format } from 'date-fns';
import { es } from 'date-fns/locale'; 

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null); 
  const [submitting, setSubmitting] = useState(false);
  
  // NUEVO ESTADO: Para mostrar el mensaje de "Gracias, estamos revisando"
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const API_URL = 'https://mam-33cu.onrender.com/api/reviews';

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('De momento no se pudieron cargar las reseñas. Por favor, pruebe más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setFormError(null); 
    
    if (newReviewText.trim() === '') {
      setFormError('La reseña no puede estar vacía.');
      return;
    }

    if (newReviewText.trim().length < 5) { 
      setFormError('Tu reseña debe tener al menos 5 caracteres.');
      return;
    }

    setSubmitting(true);

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

      // NO agregamos la reseña a la lista visualmente, porque está oculta en el backend.
      // En su lugar, mostramos el mensaje de éxito.
      setNewReviewText('');
      setShowSuccessMessage(true);
      
      // Ocultar mensaje de éxito después de 8 segundos
      setTimeout(() => setShowSuccessMessage(false), 8000);

    } catch (err) {
      console.error('Error submitting review:', err);
      setFormError('No se pudo enviar la reseña. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
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
          aria-label="Volver a Servicios"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>

        <img src={LogoImage} alt="Logo" className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto mb-8 animate-float" />

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in-up-custom" style={{ animationDelay: '0.2s' }}>
          Reseñas y Testimonios
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-full mb-8 animate-fade-in-up-custom" style={{ animationDelay: '0.4s' }}>
          
          {/* LÓGICA DEL MENSAJE DE ÉXITO */}
          {showSuccessMessage ? (
             <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Gracias por tu opinión!</h3>
                <p className="text-gray-600">
                  Tu reseña ha sido enviada a <strong>moderación</strong>. 
                  <br/>
                  Aparecerá en esta sección en cuanto sea aprobada por la administración.
                </p>
                <button 
                  onClick={() => setShowSuccessMessage(false)}
                  className="mt-4 text-sm text-green-700 font-semibold hover:underline"
                >
                  Escribir otra reseña
                </button>
             </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deja tu Reseña Anónima</h2>
              <form onSubmit={handleSubmitReview}>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-900 resize-none h-32"
                  placeholder="Escribe tu experiencia aquí..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  disabled={submitting}
                ></textarea>
                
                {formError && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{formError}</p>} 
                
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full font-bold py-3 px-4 rounded-full shadow-lg transition duration-300 transform hover:scale-105 ${
                    submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {submitting ? 'Enviando...' : 'Enviar Reseña'}
                </button>
              </form>
            </>
          )}

        </div>

        <div className="w-full space-y-6 animate-fade-in-up-custom" style={{ animationDelay: '0.6s' }}>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white/50 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-lg font-semibold text-gray-700">Cargando reseñas...</p>
              <p className="text-sm text-gray-500">Esto puede tomar unos minutos.</p>
            </div>

          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-lg text-red-600 font-medium mb-4">{error}</p>
              <button onClick={fetchReviews} className="text-sm bg-white border border-red-300 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition-colors">Reintentar</button>
            </div>

          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-white/50 rounded-lg border border-dashed border-gray-300">
              <p className="text-xl text-gray-600 font-medium">Aún no hay reseñas.</p>
              <p className="text-gray-500">¡Sé el primero en dejar una!</p>
            </div>

          ) : (
            reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <p className="text-gray-700 text-lg mb-4 italic leading-relaxed">"{review.text}"</p>
                <div className="flex justify-end items-center gap-2">
                  <div className="h-px bg-gray-200 w-12"></div>
                  <p className="text-gray-500 text-sm font-medium">
                    Paciente Anónimo • {format(new Date(review.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
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