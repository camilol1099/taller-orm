const express = require('express');
const db = require('./models/index.js');
const service = require('./services/bibliotecaService.js');

const app = express();

app.use(express.json());

// Sincronizar la base de datos
db.sequelize.sync({ force: false })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar BD:', err));

// LIBROS ENDPOINTS
// POST - Crear libro
app.post('/api/libros', async (req, res) => {
  try {
    const libro = await service.registrarLibro(req.body);
    res.status(201).json({
      success: true,
      message: 'Libro creado correctamente',
      data: libro
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Listar todos los libros
app.get('/api/libros', async (req, res) => {
  try {
    const libros = await service.listarLibros();
    res.status(200).json({
      success: true,
      count: libros.length,
      data: libros
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Obtener libro por ID
app.get('/api/libros/:id', async (req, res) => {
  try {
    const libro = await service.obtenerLibroPorId(req.params.id);
    if (!libro) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: libro
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT - Actualizar libro
app.put('/api/libros/:id', async (req, res) => {
  try {
    const libro = await service.actualizarLibro(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Libro actualizado correctamente',
      data: libro
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE - Eliminar libro (soft delete)
app.delete('/api/libros/:id', async (req, res) => {
  try {
    const libro = await service.eliminarLibro(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Libro eliminado correctamente',
      data: libro
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// USUARIOS ENDPOINTS
// POST - Crear usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await service.registrarUsuario(req.body);
    res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: usuario
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Listar usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await service.listarUsuarios();
    res.status(200).json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Obtener usuario por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await service.obtenerUsuarioPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// AUTORES ENDPOINTS
// POST - Crear autor
app.post('/api/autores', async (req, res) => {
  try {
    const autor = await service.registrarAutor(req.body);
    res.status(201).json({
      success: true,
      message: 'Autor creado correctamente',
      data: autor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Listar autores
app.get('/api/autores', async (req, res) => {
  try {
    const autores = await service.listarAutores();
    res.status(200).json({
      success: true,
      count: autores.length,
      data: autores
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PRESTAMOS ENDPOINTS
// POST - Registrar préstamo
app.post('/api/prestamos', async (req, res) => {
  try {
    const { libro_id, usuario_id } = req.body;

    if (!libro_id || !usuario_id) {
      return res.status(400).json({
        success: false,
        error: 'libro_id y usuario_id son requeridos'
      });
    }

    const result = await service.registrarPrestamo(libro_id, usuario_id);
    res.status(201).json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Listar préstamos activos
app.get('/api/prestamos', async (req, res) => {
  try {
    const prestamos = await service.prestamosActivos();
    res.status(200).json({
      success: true,
      count: prestamos.length,
      data: prestamos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT - Registrar devolución
app.put('/api/prestamos/:id/devolver', async (req, res) => {
  try {
    const result = await service.registrarDevolucion(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Servidor activo',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: err.message
  });
});

app.listen(3000, () => {
  console.log("✓ Servidor activo en http://localhost:3000");
  console.log("✓ Para ver salud del servidor: GET http://localhost:3000/health");
});
