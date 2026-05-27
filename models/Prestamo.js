module.exports = (sequelize, DataTypes) => {
  const Prestamo = sequelize.define("Prestamo", {

    fecha_prestamo: {
      type: DataTypes.DATE,
      allowNull: false
    },

    fecha_devolucion_esp: {
      type: DataTypes.DATE,
      allowNull: false
    },

    fecha_devolucion_real: {
      type: DataTypes.DATE,
      allowNull: true
    }

  }, {
    timestamps: true
  });

  return Prestamo;
};