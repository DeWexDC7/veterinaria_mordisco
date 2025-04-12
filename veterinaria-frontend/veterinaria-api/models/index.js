const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Cliente = require('./cliente');
const Paciente = require('./paciente');
const Cita = require('./cita');

Cliente.hasMany(Paciente, { foreignKey: 'id_cliente' });
Paciente.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Usuario.hasMany(Cita, { foreignKey: 'id_veterinario' });
Paciente.hasMany(Cita, { foreignKey: 'id_paciente' });

Cita.belongsTo(Usuario, { foreignKey: 'id_veterinario' });
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente' });

module.exports = {
  sequelize,
  Usuario,
  Cliente,
  Paciente,
  Cita,
};
