//Este archivo maneja las operaciones CRUD para las tareas. Contiene la lógica para interacutar con la BBDD

const Tarea = require('../models/tarea');  // Importa el modelo Tarea
const Responsable = require('../models/responsable'); // Importa el modelo Responsable

// Obtener todas las tareas
exports.getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();  // Obtener todas las tareas de la base de datos
    res.json(tareas);
  } catch (err) {
    res.status(500).send('Error al obtener las tareas');
  }
};

// Obtener una tarea específica por id
exports.getTareaById = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({ id_tarea: req.params.id_tarea });  // Buscar tarea por id
    if (!tarea) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.json(tarea);
  } catch (err) {
    res.status(500).send('Error al obtener la tarea');
  }
};

// Crear una nueva tarea
exports.createTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();  // Guardar la nueva tarea en la base de datos
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(400).send('Error al crear la tarea');
  }
};

// Actualizar una tarea existente
exports.updateTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findOneAndUpdate({ id_tarea: req.params.id_tarea }, req.body, { new: true });
    if (!tareaActualizada) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.json(tareaActualizada);
  } catch (err) {
    res.status(400).send('Error al actualizar la tarea');
  }
};

// Eliminar una tarea
exports.deleteTarea = async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findOneAndDelete({ id_tarea: req.params.id_tarea });
    if (!tareaEliminada) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.json({ message: 'Tarea eliminada con éxito' });
  } catch (err) {
    res.status(400).send('Error al eliminar la tarea');
  }
};
