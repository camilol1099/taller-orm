'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Crear autores
    const autores = await queryInterface.bulkInsert('Autors', [
      {
        nombre: 'Robert',
        apellido: 'Martin',
        nacionalidad: 'Estadounidense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Eric',
        apellido: 'Evans',
        nacionalidad: 'Estadounidense',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Martin',
        apellido: 'Fowler',
        nacionalidad: 'Británico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Erich',
        apellido: 'Gamma',
        nacionalidad: 'Suizo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Crear usuarios
    const usuarios = await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María García',
        email: 'maria.garcia@example.com',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Carlos López',
        email: 'carlos.lopez@example.com',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana Martínez',
        email: 'ana.martinez@example.com',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Crear libros
    const libros = await queryInterface.bulkInsert('Libros', [
      {
        titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        isbn: '978-0132350884',
        anio_publicacion: 2008,
        copias_disponibles: 5,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Domain-Driven Design',
        isbn: '978-0321125675',
        anio_publicacion: 2003,
        copias_disponibles: 3,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Refactoring: Improving the Design of Existing Code',
        isbn: '978-0134757599',
        anio_publicacion: 2018,
        copias_disponibles: 4,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        titulo: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        isbn: '978-0201633610',
        anio_publicacion: 1994,
        copias_disponibles: 2,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Crear relaciones Libro-Autor (N:M)
    await queryInterface.bulkInsert('LibroAutor', [
      {
        libro_id: 1,
        autor_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libro_id: 2,
        autor_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libro_id: 3,
        autor_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libro_id: 4,
        autor_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Crear algunos préstamos de ejemplo
    await queryInterface.bulkInsert('Prestamos', [
      {
        libro_id: 1,
        usuario_id: 1,
        fecha_prestamo: new Date(),
        fecha_devolucion_esp: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días
        fecha_devolucion_real: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        libro_id: 2,
        usuario_id: 2,
        fecha_prestamo: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        fecha_devolucion_esp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        fecha_devolucion_real: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    // Eliminar en orden inverso de las dependencias
    await queryInterface.bulkDelete('Prestamos', null, {});
    await queryInterface.bulkDelete('LibroAutor', null, {});
    await queryInterface.bulkDelete('Libros', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
    await queryInterface.bulkDelete('Autors', null, {});
  }
};
