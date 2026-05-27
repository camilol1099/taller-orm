module.exports = (sequelize, DataTypes) => {
  const LibroAutor = sequelize.define("LibroAutor", {
    // Las FK se definen automáticamente en la relación belongsToMany
  }, {
    tableName: "LibroAutor",
    timestamps: false
  });

  return LibroAutor;
};
