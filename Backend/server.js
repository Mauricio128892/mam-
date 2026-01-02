require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); 

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// --- CONFIGURACIÓN DEL CORREO (NODEMAILER) ---
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,                 // PUERTO CLAVE
  secure: false,             // TIENE QUE SER FALSE para puerto 587 (usa STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Asegúrate que sea la "Contraseña de Aplicación"
  },
  tls: {
    rejectUnauthorized: false // Ayuda a evitar errores de certificados en servidores cloud
  },
  // Mantén estos tiempos de espera para que no se cuelgue infinito
  connectionTimeout: 10000, 
  greetingTimeout: 10000 
});

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

// --- MÓDULO DE CITAS (CORREGIDO) ---
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // <--- CAMPO NUEVO AGREGADO
  date: { type: Date, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// POST una nueva cita (CON ENVÍO DE CORREO)
app.post('/api/appointments', async (req, res) => {
  // Leemos también el 'phone' del cuerpo de la petición
  const { name, email, phone, date, time } = req.body;

  // Validamos que venga el teléfono
  if (!name || !email || !phone || !date || !time) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios (nombre, email, teléfono, fecha y hora).' });
  }

  // Creamos la cita incluyendo el teléfono
  const newAppointment = new Appointment({ name, email, phone, date, time });

  try {
    // 1. Guardar en Base de Datos
    const savedAppointment = await newAppointment.save();

    // Formatear fecha para que se vea bonita en el correo (Opcional, pero recomendado)
    const fechaLegible = new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // 2. Configurar el correo de aviso
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Te llega a ti
      subject: `📅 Nueva Cita Solicitada: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2c3e50;">¡Tienes una nueva solicitud de cita!</h2>
            <hr>
            <p><strong>Cliente:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Teléfono/WhatsApp:</strong> ${phone}</p> <p><strong>Fecha solicitada:</strong> ${fechaLegible}</p>
            <p><strong>Hora:</strong> ${time}</p>
            <hr>
            <p style="font-size: 0.9em; color: #777;">Este correo fue generado automáticamente por tu sitio web.</p>
        </div>
      `
    };

    // 3. Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log('Correo de notificación enviado con éxito');

    res.status(201).json(savedAppointment); 
  } catch (err) {
    console.error('Error al guardar o enviar correo:', err);
    res.status(400).json({ message: err.message });
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

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend V2 (CORREOS) corriendo en http://localhost:${PORT}`);
});