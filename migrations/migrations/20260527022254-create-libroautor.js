'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Crear tabla LibroAutor (tabla intermedia para relación N:M)
    await queryInterface.createTable('LibroAutor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Libros',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      autor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Autors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Crear índice único para evitar duplicados
    await queryInterface.addConstraint('LibroAutor', {
      fields: ['libro_id', 'autor_id'],
      type: 'unique',
      name: 'unique_libro_autor'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LibroAutor');
  }
};
