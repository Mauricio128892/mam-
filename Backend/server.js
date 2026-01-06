require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Resend } = require('resend'); 
// 1. IMPORTAR EL LIMITADOR
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// 2. CONFIGURAR EL ANTI-SPAM
// Esto permite solo 5 intentos cada 15 minutos desde la misma IP
const appointmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite de 5 peticiones por IP
  message: { message: '⛔ Has intentado agendar demasiadas veces. Por favor espera 15 minutos.' },
  standardHeaders: true, 
  legacyHeaders: false, 
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB Atlas:', err));

// --- MÓDULO DE RESEÑAS ---
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, minlength: 5 },
  createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'El campo de reseña es obligatorio.' });
  const review = new Review({ text });
  try {
    const newReview = await review.save();
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
  reason: { type: String }, // <--- 3. NUEVO CAMPO: Motivo de la cita
  createdAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// POST una nueva cita (CON PROTECCIÓN ANTI-SPAM)
// 4. APLICAMOS EL "appointmentLimiter" AQUI
app.post('/api/appointments', appointmentLimiter, async (req, res) => {
  // 5. RECIBIMOS EL CAMPO "reason"
  const { name, email, phone, date, time, reason } = req.body;

  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  // Guardamos el motivo (si no escriben nada, guardamos "Sin especificar")
  const newAppointment = new Appointment({ 
    name, email, phone, date, time, 
    reason: reason || 'Sin especificar' 
  });

  try {
    const savedAppointment = await newAppointment.save();
    console.log('✅ Cita guardada en MongoDB');

    const fechaLegible = new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // 6. AGREGAMOS EL MOTIVO AL CORREO
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
            <hr>
        </div>
      `
    });

    console.log('✅ Correo enviado con éxito');
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