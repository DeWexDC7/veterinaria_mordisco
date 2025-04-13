const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// Configuración CORS más específica
const corsOptions = {
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// Imprimir detalles de las solicitudes para depuración
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Cuerpo:`, req.body);
  next();
});

// Importar rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/clientes', require('./routes/cliente.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/citas', require('./routes/cita.routes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Veterinaria Mordisco funcionando correctamente' });
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log('✅ Servidor corriendo en http://localhost:3000'));
});
