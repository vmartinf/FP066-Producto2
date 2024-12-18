// Importar mongoose
const mongoose = require('mongoose');

// Esquema para el responsable
const responsableSchema = new mongoose.Schema({
  id_responsable: { type: String, required: true }, // Campo obligatorio
  nombre_responsable: { type: String, required: true } // Campo obligatorio
});

// Crear el modelo Responsable a partir del esquema
const Responsable = mongoose.model('Responsable', responsableSchema);

// Exportar el modelo Responsable
module.exports = Responsable;
