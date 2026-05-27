module.exports = (sequelize, DataTypes) => {
  const Autor = sequelize.define("Autor", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nacionalidad: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true
  });

  return Autor;
};