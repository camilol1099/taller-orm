module.exports = (sequelize, DataTypes) => {
  const Libro = sequelize.define("Libro", {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    anio_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    copias_disponibles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });

  return Libro;
};