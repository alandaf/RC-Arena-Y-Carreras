require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const reservasRoutes = require('./src/routes/reservas');
const contactoRoutes = require('./src/routes/contacto');
const membresiasRoutes = require('./src/routes/membresias');
const errorHandler = require('./src/middleware/errorHandler');
const { iniciarJobRecordatorios } = require('./src/jobs/recordatorios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Límite más estricto para formularios que envían email, evita spam/abuso.
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intenta nuevamente en una hora.' },
});

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', service: 'rc-arena-backend', timestamp: new Date().toISOString() });
});

app.use('/api/v1/reservas', reservasRoutes(formLimiter));
app.use('/api/v1/contacto', contactoRoutes(formLimiter));
app.use('/api/v1/membresias', membresiasRoutes(formLimiter));

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏁 RC Arena backend corriendo en http://localhost:${PORT}`);
  iniciarJobRecordatorios();
});
