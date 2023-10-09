const Sequelize = require('sequelize');
const database = require('../db/db');

const Musica = database.define('musica', {
  id_musica: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  autor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estrofe1: {
    type: Sequelize.TEXT,
  },
  estrofe2: {
    type: Sequelize.TEXT,
  },
  estrofe3: {
    type: Sequelize.TEXT,
  },
  estrofe4: {
    type: Sequelize.TEXT,
  },
  estrofe4: {
    type: Sequelize.TEXT,
  },
  estrofe5: {
    type: Sequelize.TEXT,
  },
  refrao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  momento: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { database, modelName: 'musica', tableName: 'musicas' });

module.exports = Musica;