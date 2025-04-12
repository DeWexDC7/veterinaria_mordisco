const { Usuario } = require('../models');

const getAll = async () => await Usuario.findAll();

const getById = async (id) => await Usuario.findByPk(id);

const create = async (data) => await Usuario.create(data);

const update = async (id, data) => {
  const item = await Usuario.findByPk(id);
  if (!item) return null;
  await item.update(data);
  return item;
};

const deleteItem = async (id) => {
  const item = await Usuario.findByPk(id);
  if (!item) return null;
  await item.destroy();
  return item;
};

module.exports = { getAll, getById, create, update, deleteItem };
