const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/clientes', require('./routes/cliente.routes'));
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/citas', require('./routes/cita.routes'));

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log('✅ Servidor corriendo en http://localhost:3000'));
});
