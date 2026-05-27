module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });

  return Usuario;
};