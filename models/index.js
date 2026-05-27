const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require(__dirname + '/../config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  }
);

const db = {};

// Cargar todos los modelos
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Ejecutar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Relaciones Libro - Autor (N:M)
db.Libro.belongsToMany(db.Autor, {
  through: "LibroAutor",
  foreignKey: "libro_id",
  otherKey: "autor_id"
});

db.Autor.belongsToMany(db.Libro, {
  through: "LibroAutor",
  foreignKey: "autor_id",
  otherKey: "libro_id"
});

// Relaciones Prestamo - Libro (N:1)
db.Prestamo.belongsTo(db.Libro, {
  foreignKey: "libro_id"
});

// Relaciones Prestamo - Usuario (N:1)
db.Prestamo.belongsTo(db.Usuario, {
  foreignKey: "usuario_id"
});

// Relaciones Libro - Prestamo (1:N)
db.Libro.hasMany(db.Prestamo, {
  foreignKey: "libro_id"
});

// Relaciones Usuario - Prestamo (1:N)
db.Usuario.hasMany(db.Prestamo, {
  foreignKey: "usuario_id"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
