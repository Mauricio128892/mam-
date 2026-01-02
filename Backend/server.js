// backend/server.js
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // <--- 1. IMPORTAR NODEMAILER

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// --- CONFIGURACIÓN DEL CORREO (TRANSPORTER) ---
// Esto prepara la conexión con Gmail
// --- CONFIGURACIÓN DEL CORREO (MODO SEGURO) ---
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor exacto de Gmail
  port: 465,              // Puerto seguro SSL (el que no bloquea Render)
  secure: true,           // "true" es obligatorio para el puerto 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- MÓDULO DE RESEÑAS (Igual que antes) ---
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
  date: { type: Date, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// POST una nueva cita (CON ENVÍO DE CORREO)
app.post('/api/appointments', async (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const newAppointment = new Appointment({ name, email, date, time });

  try {
    // 1. Guardar en Base de Datos
    const savedAppointment = await newAppointment.save();

    // 2. Configurar el correo de aviso para TI
    const mailOptions = {
      from: process.env.EMAIL_USER, // Quien lo envía (tu sistema)
      to: process.env.EMAIL_USER,   // A quien le llega (A TI MISMO)
      subject: `📅 Nueva Cita Solicitada: ${name}`,
      html: `
        <h3>¡Tienes una nueva solicitud de cita!</h3>
        <p><strong>Cliente:</strong> ${name}</p>
        <p><strong>Correo del cliente:</strong> ${email}</p>
        <p><strong>Fecha solicitada:</strong> ${date}</p>
        <p><strong>Hora:</strong> ${time}</p>
        <hr>
        <p>Revisa tu base de datos para más detalles.</p>
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

// Al final de tu server.js
app.listen(PORT, () => {
  console.log(`Servidor backend V2 (CORREOS) corriendo en http://localhost:${PORT}`);
});