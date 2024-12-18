// Importación de dependencias
const express = require('express'); // módulo que es un framework de Node.js para crear Webs y APIs
const router = express.Router(); // Creación de router de Express. Permite definir rutas de forma modular y organizada
const tareaController = require('../controllers/tareaController'); // Importar el controlador de tareas

// Definir las rutas para las operaciones CRUD de tareas
router.get('/tareas', tareaController.getTareas);  // Obtener todas las tareas
router.get('/tareas/:id_tarea', tareaController.getTareaById);  // Obtener una tarea específica
router.post('/tareas', tareaController.createTarea);  // Crear una nueva tarea
router.put('/tareas/:id_tarea', tareaController.updateTarea);  // Actualizar una tarea existente
router.delete('/tareas/:id_tarea', tareaController.deleteTarea);  // Eliminar una tarea

module.exports = router;
