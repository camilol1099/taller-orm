const db = require('../models/index.js');
const { Libro, Usuario, Prestamo, Autor, sequelize } = db;

async function registrarLibro(data) {
  const libro = await Libro.create({
    titulo: data.titulo,
    isbn: data.isbn,
    anio_publicacion: data.anio_publicacion,
    copias_disponibles: data.copias_disponibles
  });

  if (data.autores && data.autores.length > 0) {
    await libro.setAutors(data.autores);
  }

  return libro;
}

async function listarLibros() {
  return await Libro.findAll({
    where: {
      activo: true
    },
    include: Autor
  });
}

async function obtenerLibroPorId(id) {
  return await Libro.findByPk(id, {
    include: Autor
  });
}

async function actualizarLibro(id, data) {
  const libro = await Libro.findByPk(id);
  if (!libro) throw new Error('Libro no encontrado');

  await libro.update(data);

  if (data.autores && data.autores.length > 0) {
    await libro.setAutors(data.autores);
  }

  return libro;
}

async function eliminarLibro(id) {
  const libro = await Libro.findByPk(id);
  if (!libro) throw new Error('Libro no encontrado');

  await libro.update({ activo: false });
  return libro;
}

async function registrarPrestamo(idLibro, idUsuario) {
  const t = await sequelize.transaction();

  try {
    const libro = await Libro.findByPk(idLibro);

    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    if (libro.copias_disponibles <= 0) {
      throw new Error('No hay copias disponibles');
    }

    await Prestamo.create({
      libro_id: idLibro,
      usuario_id: idUsuario,
      fecha_prestamo: new Date(),
      fecha_devolucion_esp: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }, { transaction: t });

    await libro.update({
      copias_disponibles: libro.copias_disponibles - 1
    }, { transaction: t });

    await t.commit();

    return { success: true, message: 'Préstamo registrado correctamente' };

  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function registrarDevolucion(idPrestamo) {
  const t = await sequelize.transaction();

  try {
    const prestamo = await Prestamo.findByPk(idPrestamo);

    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }

    prestamo.fecha_devolucion_real = new Date();

    await prestamo.save({ transaction: t });

    const libro = await Libro.findByPk(prestamo.libro_id);

    libro.copias_disponibles += 1;

    await libro.save({ transaction: t });

    await t.commit();

    return { success: true, message: 'Devolución registrada correctamente' };

  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function prestamosActivos() {
  return await Prestamo.findAll({
    where: {
      fecha_devolucion_real: null
    },
    include: [
      {
        model: Libro,
        include: Autor
      },
      Usuario
    ]
  });
}

async function registrarUsuario(data) {
  return await Usuario.create({
    nombre: data.nombre,
    email: data.email
  });
}

async function listarUsuarios() {
  return await Usuario.findAll({
    where: { activo: true }
  });
}

async function obtenerUsuarioPorId(id) {
  return await Usuario.findByPk(id);
}

async function registrarAutor(data) {
  return await Autor.create({
    nombre: data.nombre,
    apellido: data.apellido,
    nacionalidad: data.nacionalidad
  });
}

async function listarAutores() {
  return await Autor.findAll();
}

module.exports = {
  registrarLibro,
  listarLibros,
  obtenerLibroPorId,
  actualizarLibro,
  eliminarLibro,
  registrarPrestamo,
  registrarDevolucion,
  prestamosActivos,
  registrarUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  registrarAutor,
  listarAutores
};
