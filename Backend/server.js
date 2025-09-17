// backend/server.js
require('dotenv').config(); // Carga las variables de entorno al inicio

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Puerto del servidor, por defecto 5000

// Middleware
app.use(cors()); // Permite que el frontend se conecte al backend
app.use(express.json()); // Habilita el parseo de JSON en las peticiones

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Definir el Schema y Modelo de Mongoose para las reseñas
const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 5 // Mínimo 5 caracteres para una reseña
  },
  // No necesitamos campos de usuario para la anonimidad
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

// --- CÓDIGO NUEVO PARA LAS CITAS ---
// Definir el Schema y Modelo de Mongoose para las citas
const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
// --- FIN DEL CÓDIGO NUEVO ---


// Rutas de la API

// GET todas las reseñas
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Ordenar por más reciente
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST una nueva reseña
app.post('/api/reviews', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'El campo de reseña es obligatorio.' });
  }

  const review = new Review({ text });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request por errores de validación (ej. minlength)
  }
});

// --- CÓDIGO NUEVO PARA LAS CITAS ---
// POST una nueva cita
app.post('/api/appointments', async (req, res) => {
  const { name, email, date, time } = req.body;

  // Validación básica
  if (!name || !email || !date || !time) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const newAppointment = new Appointment({ name, email, date, time });

  try {
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// --- FIN DEL CÓDIGO NUEVO ---

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});