require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// 1. CAMBIO: Quitamos nodemailer e importamos Resend
const { Resend } = require('resend'); 

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// 2. CAMBIO: Inicializamos Resend con la API Key
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
  createdAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// POST una nueva cita (CON ENVÍO POR RESEND)
app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, date, time } = req.body;

  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const newAppointment = new Appointment({ name, email, phone, date, time });

  try {
    // 1. Guardar en Base de Datos primero
    const savedAppointment = await newAppointment.save();
    console.log('✅ Cita guardada en MongoDB');

    // Formatear fecha
    const fechaLegible = new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // 2. CAMBIO: Enviar correo usando RESEND (HTTP en vez de SMTP)
    // NOTA IMPORTANTE: 'from' debe ser 'onboarding@resend.dev' si no tienes dominio propio.
    // 'to' debe ser tu correo verificado (el tuyo propio).
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'mnvalladares05@gmail.com', // <--- TU CORREO REAL AQUI
      subject: `📅 Nueva Cita Solicitada: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c3e50;">¡Tienes una nueva solicitud de cita!</h2>
            <hr>
            <p><strong>Cliente:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Fecha solicitada:</strong> ${fechaLegible}</p>
            <p><strong>Hora:</strong> ${time}</p>
            <hr>
        </div>
      `
    });

    console.log('✅ Correo enviado con éxito ID:', emailResponse.data?.id);
    
    // Respondemos éxito al Frontend
    res.status(201).json(savedAppointment); 

  } catch (err) {
    console.error('❌ Error en el proceso:', err);
    // Aunque falle el correo, si se guardó en Mongo, respondemos éxito pero con advertencia en logs
    // O puedes devolver error 500 si prefieres que el usuario lo sepa.
    res.status(500).json({ message: 'Cita guardada, pero hubo error al enviar notificación.' });
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