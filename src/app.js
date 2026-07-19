require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');

const app = express();

connectDB();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Demasiadas peticiones, intente más tarde' }
});
app.use('/api/', limiter);

const allowedOrigins = [
  process.env.FRONTEND_ANGULAR_URL || 'http://localhost:4200',
  process.env.FRONTEND_REACT_URL || 'http://localhost:3000',
  process.env.FRONTEND_NEXTJS_URL || 'http://localhost:3001',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CourseHub API funcionando',
    version: '2.0.0',
    status: 'running'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Campo duplicado' });
  }

  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor CourseHub corriendo en modo ${process.env.NODE_ENV} en puerto ${PORT}`);
});

module.exports = app;