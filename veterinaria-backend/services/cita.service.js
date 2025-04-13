const { Cita } = require('../models');

const getAll = async () => await Cita.findAll();

const getById = async (id) => await Cita.findByPk(id);

const create = async (data) => await Cita.create(data);

const update = async (id, data) => {
  const item = await Cita.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

const deleteItem = async (id) => {
  const item = await Cita.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
};

module.exports = { getAll, getById, create, update, deleteItem };
