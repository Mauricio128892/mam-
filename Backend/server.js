require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend'); 
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Configurar Anti-Spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { message: '⛔ Demasiadas solicitudes. Intenta más tarde.' },
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use(limiter);

const resend = new Resend(process.env.RESEND_API_KEY);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB Atlas:', err));

// --- MÓDULO DE RESEÑAS (MODIFICADO) ---
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, minlength: 5 },
  // 1. CAMBIO: Agregamos isVisible en FALSE por defecto (Oculta al nacer)
  isVisible: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);

// GET: Solo devolvemos las reseñas APROBADAS (isVisible: true)
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ isVisible: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Guardamos la reseña oculta y enviamos correo de aviso
app.post('/api/reviews', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'El campo de reseña es obligatorio.' });
  
  // Se guarda con isVisible: false automáticamente
  const review = new Review({ text });
  
  try {
    const newReview = await review.save();
    
    // 2. CAMBIO: Enviar correo de aviso al administrador
    await resend.emails.send({
        from: 'onboarding@resend.dev', 
        to: 'mnvalladares05@gmail.com', // <--- TU CORREO
        subject: `📝 Nueva Reseña (Pendiente de Aprobación)`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #d97706;">¡Llegó una nueva reseña!</h2>
              <p>Un paciente ha dejado el siguiente comentario:</p>
              <blockquote style="background: #f9f9f9; border-left: 5px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
                  "${text}"
              </blockquote>
              <p><strong>Estado:</strong> Oculta (Pendiente de moderación).</p>
              <hr>
              <p>Para publicarla, entra a MongoDB Atlas, busca la colección 'reviews' y cambia el campo <code>isVisible</code> a <strong>true</strong>.</p>
          </div>
        `
      });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- MÓDULO DE CITAS ---
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, date, time, reason } = req.body;

  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  const newAppointment = new Appointment({ 
    name, email, phone, date, time, 
    reason: reason || 'Sin especificar' 
  });

  try {
    const savedAppointment = await newAppointment.save();
    const fechaLegible = new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'mnvalladares05@gmail.com', 
      subject: `📅 Nueva Cita: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c3e50;">¡Tienes una nueva solicitud de cita!</h2>
            <hr>
            <p><strong>Cliente:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Fecha:</strong> ${fechaLegible}</p>
            <p><strong>Hora:</strong> ${time}</p>
            <div style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #2c3e50; margin-top: 10px;">
                <p style="margin: 0;"><strong>📝 Motivo de la consulta:</strong></p>
                <p style="margin-top: 5px;">${reason || 'El cliente no especificó un motivo.'}</p>
            </div>
        </div>
      `
    });

    res.status(201).json(savedAppointment); 
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ message: 'Error interno al procesar la cita.' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});