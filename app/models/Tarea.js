// Importar mongoose
const mongoose = require('mongoose');

// Importar el modelo Responsable
const Responsable = require('./responsable');  

// Esquema para la tarea
const tareaSchema = new mongoose.Schema({
  id_tarea: { type: String, required: true, unique: true }, // Campo único y obligatorio
  nombre_tarea: { type: String, required: true },          // Campo obligatorio
  descripcion_tarea: { type: String, required: true },     // Campo obligatorio
  fecha_tarea: { type: Date, required: true },             // Campo obligatorio
  observaciones: { type: String },                         // Campo opcional
  estado_tarea: { type: String, required: true },          // Campo obligatorio
  
  // Referencia al modelo Responsable usando ObjectId
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'Responsable' }
});

// Crear el modelo Tarea a partir del esquema
const Tarea = mongoose.model('Tarea', tareaSchema);

// Exportar el modelo Tarea
module.exports = Tarea;
