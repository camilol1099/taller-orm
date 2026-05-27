'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Crear tabla Libros
    await queryInterface.createTable('Libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      anio_publicacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      copias_disponibles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Libros');
  }
};
